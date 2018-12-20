import nock = require('nock');
import { PillarSdk } from '../../..';

const keys = require('../../utils/generateKeyPair');

const responseRegisterKey = {
  nonce: '3yy1uy3u13yu1y3uy3',
  expiresAt: '2011-06-14T04:12:36Z',
};

const responseRegisterAuth = {
  authorizationCode: 'Authorisation code',
  expiresAt: '2011-06-14T04:12:36Z',
};

const responseRegisterAccess = {
  accessToken: 'oneAccessToken',
  accessTokenExpiresAt: '2011-06-14T04:12:36Z',
  fcmToken: 'oneFcmToken',
  refreshToken: 'oneRefreshoken',
  refreshTokenExpiresAt: '2011-06-14T04:12:36Z',
  userId: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
};

nock('http://localhost:8080')
  .post('/register/keys')
  .reply(200, responseRegisterKey);

nock('http://localhost:8080')
  .post('/register/auth')
  .reply(200, responseRegisterAuth);

nock('http://localhost:8080')
  .post('/register/access')
  .reply(200, responseRegisterAccess);

describe('POST RegisterAuthServer', () => {
  const pSdk = new PillarSdk({
    apiUrl: 'http://localhost:8080',
    notificationsUrl: 'http://localhost:8081',
    investmentsUrl: 'http://localhost:8082',
  });
  let walletRegister = {};
  beforeEach(() => {
    walletRegister = {
      privateKey: keys.privateKey,
      fcmToken: '987qwe',
      username: 'sdfsdfs',
    };
  });

  it('responds with access payload', async () => {
    expect.assertions(2);
    const response = await pSdk.wallet.registerAuthServer(walletRegister);
    expect(response.data).toEqual(responseRegisterAccess);
    expect(response.status).toEqual(200);
  });

  describe('/register/keys error responses', () => {
    nock('http://localhost:8080')
      .post('/register/keys')
      .reply(500, 'Internal server error');

    it('throws a 500 when an internal server error occurs', async () => {
      expect.assertions(2);
      try {
        await pSdk.wallet.registerAuthServer(walletRegister);
      } catch (error) {
        expect(error.message).toEqual('Request failed with status code 500');
        expect(error.response.status).toEqual(500);
      }
    });
  });

  describe('/register/auth error responses', () => {
    beforeEach(() => {
      nock('http://localhost:8080')
        .post('/register/keys')
        .reply(200, responseRegisterKey);
    });

    it('throws a 401 when payload authentication fails', async () => {
      expect.assertions(2);
      nock('http://localhost:8080')
        .post('/register/auth')
        .reply(401, 'Payload verification failed');
      try {
        await pSdk.wallet.registerAuthServer(walletRegister);
      } catch (error) {
        expect(error.message).toEqual('Request failed with status code 401');
        expect(error.response.status).toEqual(401);
      }
    });

    it('throws a 500 when an internal server error occurs', async () => {
      expect.assertions(2);
      nock('http://localhost:8080')
        .post('/register/auth')
        .reply(500, 'Internal server error');
      try {
        await pSdk.wallet.registerAuthServer(walletRegister);
      } catch (error) {
        expect(error.message).toEqual('Request failed with status code 500');
        expect(error.response.status).toEqual(500);
      }
    });
  });

  describe('/register/access error responses', () => {
    beforeEach(() => {
      nock('http://localhost:8080')
        .post('/register/keys')
        .reply(200, responseRegisterKey);

      nock('http://localhost:8080')
        .post('/register/auth')
        .reply(200, responseRegisterAuth);
    });

    it('throws a 401 when payload authentication fails', async () => {
      expect.assertions(2);
      nock('http://localhost:8080')
        .post('/register/access')
        .reply(401, 'Payload verification failed');
      try {
        await pSdk.wallet.registerAuthServer(walletRegister);
      } catch (error) {
        expect(error.message).toEqual('Request failed with status code 401');
        expect(error.response.status).toEqual(401);
      }
    });

    it('throws a 500 when an internal server error occurs', async () => {
      expect.assertions(2);
      nock('http://localhost:8080')
        .post('/register/access')
        .reply(500, 'Internal server error');
      try {
        await pSdk.wallet.registerAuthServer(walletRegister);
      } catch (error) {
        expect(error.message).toEqual('Request failed with status code 500');
        expect(error.response.status).toEqual(500);
      }
    });
  });
});
