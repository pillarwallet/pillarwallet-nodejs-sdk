import { Register } from '../../lib/register';
import nock = require('nock');
import { v4 as uuidV4 } from 'uuid';
import { PillarSdk } from '../../index';
import { Configuration } from '../../lib/configuration';

const keys = require('../utils/generateKeyPair');

describe('Register Class', () => {
  const publicKey = keys.publicKey;
  const privateKey = keys.privateKey;
  let uuid;

  beforeAll(() => {
    new PillarSdk({
      apiUrl: 'http://localhost:8080',
      privateKey: keys.privateKey,
    });
  });

  beforeEach(() => {
    uuid = uuidV4();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('registerKeys method', () => {
    const regKeysResponse = {
      expiresAt: '2011-06-14T04:12:36Z',
      nonce: '4321',
    };

    it('should return 400 due missing params', async () => {
      expect.assertions(2);
      const errMsg = 'Missing UUID or publicKey';
      nock('http://localhost:8080')
        .post('/register/keys', (body: { publicKey: string; uuid: string }) => {
          return body.publicKey === '' || body.uuid === '';
        })
        .reply(400, errMsg);
      try {
        await Register.registerKeys('', uuid); // empty publicKey
      } catch (error) {
        expect(error.response.status).toEqual(400);
        expect(error.response.data).toEqual(errMsg);
      }
      nock.isDone();
    });

    it('should return 500 due internal server error', async () => {
      expect.assertions(2);
      const errMsg = 'Internal Server Error';
      nock('http://localhost:8080')
        .post('/register/keys')
        .reply(500, errMsg);
      try {
        await Register.registerKeys(publicKey, uuid);
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data).toEqual(errMsg);
      }
      nock.isDone();
    });

    it('expects response to resolve with data and status code 200', async () => {
      nock('http://localhost:8080')
        .post('/register/keys', { publicKey, uuid })
        .reply(200, regKeysResponse);
      const response = await Register.registerKeys(publicKey, uuid);
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(regKeysResponse);
      nock.isDone();
    });
  });

  describe('registerAuth method', () => {
    const regAuthResponse = {
      authorizationCode: 'Authorisation code',
      expiresAt: '2011-06-14T04:12:36Z',
    };
    let data;

    beforeEach(() => {
      data = {
        uuid,
        nonce: '4344132',
        codeChallenge: '323423423443423432432432',
        ethAddress: 'OneEthAddress',
        fcmToken: 'OneFcmToken',
        username: 'OneUserName',
      };
    });

    it('should return 400 due missing params', async () => {
      expect.assertions(2);
      const errMsg = 'Missing one or more params!';
      const regAuthData = { ...data };
      regAuthData.username = '';
      nock('http://localhost:8080')
        .post(
          '/register/auth',
          (body: {
            codeChallenge: string;
            ethAddress: string;
            fcmToken: string;
            username: string;
            uuid: string;
          }) => {
            return (
              body.uuid === '' ||
              body.codeChallenge === '' ||
              body.ethAddress === '' ||
              body.fcmToken === '' ||
              body.username === ''
            );
          },
        )
        .reply(400, errMsg);
      try {
        await Register.registerAuth(regAuthData, privateKey); // empty username
      } catch (error) {
        expect(error.response.status).toEqual(400);
        expect(error.response.data).toEqual(errMsg);
      }
      nock.isDone();
    });

    it('should return 500 internal server error', async () => {
      expect.assertions(2);
      const errMsg = 'Internal Server Error';
      const regAuthData = { ...data };
      regAuthData.username = '';
      nock('http://localhost:8080')
        .post('/register/auth')
        .reply(500, errMsg);
      try {
        await Register.registerAuth(regAuthData, privateKey);
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data).toEqual(errMsg);
      }
      nock.isDone();
    });

    it('expects to return unauthorised due to invalid signature', async () => {
      expect.assertions(2);
      const errMsg = 'Unauthorised';
      const regAuthData = { ...data };
      delete regAuthData.nonce;
      nock('http://localhost:8080', {
        reqheaders: {
          'X-API-Signature': headerValue => {
            if (headerValue) {
              return true;
            }
            return false;
          },
        },
      })
        .post('/register/auth', { ...regAuthData })
        .reply(401, errMsg);
      try {
        await Register.registerAuth(data, privateKey);
      } catch (error) {
        expect(error.response.status).toEqual(401);
        expect(error.response.data).toEqual(errMsg);
      }
      nock.isDone();
    });

    it('expects response to resolve with data and status code 200', async () => {
      const regAuthData = { ...data };
      delete regAuthData.nonce;
      nock('http://localhost:8080', {
        reqheaders: {
          'X-API-Signature': headerValue => {
            if (headerValue) {
              return true;
            }
            return false;
          },
        },
      })
        .post('/register/auth', { ...regAuthData })
        .reply(200, regAuthResponse);
      const response = await Register.registerAuth(data, privateKey);
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(regAuthResponse);
      nock.isDone();
    });
  });

  describe('registerAccess', () => {
    const regAccessResponse = {
      accessToken: 'myAccessToken',
      accessTokenExpiresAt: 'YYYY-mm-ddTHH:MM:ssZ',
      fcmToken: 'myFcmToken',
      refreshToken: 'myRefreshToken',
      refreshTokenExpiresAt: 'YYYY-mm-ddTHH:MM:ssZ',
      userId: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
    };
    let data;

    beforeEach(() => {
      data = {
        uuid,
        authorizationCode: 'myauthorizationCode',
        codeVerifier: 'oneCodeVerifier',
      };
    });

    it('should return 400 error due to missing params', async () => {
      expect.assertions(2);
      const errMsg = 'Missing one or more params!';
      nock('http://localhost:8080')
        .post(
          '/register/access',
          (body: { codeVerifier: string; uuid: string }) => {
            return body.codeVerifier === '' || body.uuid === '';
          },
        )
        .reply(400, errMsg);
      const regAccessData = { ...data };
      regAccessData.codeVerifier = '';
      try {
        await Register.registerAccess(regAccessData, privateKey);
      } catch (error) {
        expect(error.response.status).toEqual(400);
        expect(error.response.data).toEqual(errMsg);
      }
      nock.isDone();
    });

    it('should return 500 due internal server error', async () => {
      expect.assertions(2);
      const regAccessData = { ...data };
      delete regAccessData.authorizationCode;
      const errMsg = 'Internal Server Error';
      nock('http://localhost:8080')
        .post('/register/access')
        .reply(500, errMsg);
      try {
        await Register.registerAccess(regAccessData, privateKey);
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data).toEqual(errMsg);
      }
      nock.isDone();
    });

    it('expects to return unauthorised due to invalid signature', async () => {
      expect.assertions(2);
      const errMsg = 'Unauthorised';
      const regAccessData = { ...data };
      delete regAccessData.authorizationCode;
      nock('http://localhost:8080', {
        reqheaders: {
          'X-API-Signature': headerValue => {
            if (headerValue) {
              return true;
            }
            return false;
          },
        },
      })
        .post('/register/access', { ...regAccessData })
        .reply(401, errMsg);
      try {
        await Register.registerAccess(data, privateKey);
      } catch (error) {
        expect(error.response.status).toEqual(401);
        expect(error.response.data).toEqual(errMsg);
      }
      nock.isDone();
    });

    it('expects response to resolve with data and status code 200', async () => {
      const regAccessData = { ...data };
      delete regAccessData.authorizationCode;
      nock('http://localhost:8080', {
        reqheaders: {
          'X-API-Signature': headerValue => {
            if (headerValue) {
              return true;
            }
            return false;
          },
        },
      })
        .post('/register/access', { ...regAccessData })
        .reply(200, regAccessResponse);
      const response = await Register.registerAccess(regAccessData, privateKey);
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(regAccessResponse);
      nock.isDone();
    });
  });

  describe('refreshAuthToken method', () => {
    let data;

    beforeEach(() => {
      Configuration.refreshToken = 'oneRefreshToken';
      Configuration.accessToken = 'oneAccessToken';
      data = {
        refreshToken: Configuration.refreshToken,
      };
    });

    const refreshTokenResponse = {
      accessToken: 'myAccessToken',
      accessTokenExpiresAt: '2016-07-12T23:34:21Z',
      refreshToken: 'myRefreshToken',
      refreshTokenExpiresAt: '2016-07-12T23:34:21Z',
    };

    it('should return 400 error due to missing params', async () => {
      Configuration.refreshToken = '';
      expect.assertions(2);
      const errMsg = 'Missing one or more params!';
      nock('http://localhost:8080')
        .post('/register/refresh', (body: { refreshToken: string }) => {
          return body.refreshToken === '';
        })
        .reply(400, errMsg);
      try {
        await Register.refreshAuthToken();
      } catch (error) {
        expect(error.response.status).toEqual(400);
        expect(error.response.data).toEqual(errMsg);
      }
      nock.isDone();
    });

    it('should return 500 due internal server error', async () => {
      expect.assertions(2);
      const errMsg = 'Internal Server Error';
      nock('http://localhost:8080')
        .post('/register/refresh')
        .reply(500, errMsg);
      try {
        await Register.refreshAuthToken();
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data).toEqual(errMsg);
      }
      nock.isDone();
    });

    it('expects response to resolve with data and status code 200', async () => {
      const refreshTokenData = { ...data };
      nock('http://localhost:8080')
        .post('/register/refresh', {
          ...refreshTokenData,
        })
        .reply(200, {
          ...refreshTokenResponse,
        });
      const response = await Register.refreshAuthToken();
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(refreshTokenResponse);
      nock.isDone();
    });
  });
});
