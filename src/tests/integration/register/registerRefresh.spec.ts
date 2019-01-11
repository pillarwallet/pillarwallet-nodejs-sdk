// tslint:disable: object-shorthand-properties-first
// check node environment
const env = process.env.NODE_ENV;

const keys = require('../../utils/generateKeyPair');
import { PillarSdk } from '../../..';
import { Configuration } from '../../../lib/configuration';
import { Register } from '../../../lib/register';
import nock = require('nock');

describe('registerRefresh method', () => {
  // Key pairs
  const privateKey = keys.privateKey.toString();

  // Generate random username
  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;

  // Expected responses
  const errInternal = {
    message: 'Internal Server Error',
  };

  const errMissingParams = {
    message: 'Refresh Token is not assigned!',
  };

  const responseRegisterRefresh = {
    accessToken: expect.any(String),
    accessTokenExpiresAt: expect.any(String),
    refreshToken: expect.any(String),
    refreshTokenExpiresAt: expect.any(String),
  };

  let pSdk: PillarSdk;

  beforeAll(async () => {
    pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
      privateKey,
    });

    if (env === 'test') {
      const mockApi = nock('http://localhost:8080');
      mockApi
        .post('/register/keys')
        .reply(200, {
          expiresAt: '2015-03-21T05:41:32Z',
          nonce: 'AxCDF23232',
        })
        .post('/register/auth')
        .reply(200, {
          authorizationCode: 'Authorization code',
          expiresAt: '2011-06-14T04:12:36Z',
        })
        .post('/register/access')
        .reply(200, {
          accessToken: 'accessToken',
          refreshToken: 'refreshToken',
          walletId: 'walletId',
        })
        .post('/register/refresh')
        .reply(200, {
          accessToken: 'myAccessToken',
          accessTokenExpiresAt: '2016-07-12T23:34:21Z',
          refreshToken: 'myRefreshToken',
          refreshTokenExpiresAt: '2016-07-12T23:34:21Z',
        })
        .post('/register/refresh')
        .reply(500, errInternal);
    }

    const walletRegister = {
      privateKey,
      fcmToken: '987qwe',
      username,
    };

    await pSdk.wallet.registerAuthServer(walletRegister);
  });

  afterAll(() => {
    jest.restoreAllMocks();
    if (env === 'test') {
      nock.cleanAll();
    }
  });

  it('expects response to resolve with data and status code 200', async () => {
    const response = await Register.refreshAuthToken();
    expect(response.status).toEqual(200);
    expect(response.data).toEqual(responseRegisterRefresh);
  });

  if (env === 'test') {
    it('should return 500 due internal server error', async () => {
      try {
        await Register.refreshAuthToken();
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data.message).toEqual(errInternal.message);
      }
    });
  }

  it('should return 400 error due to missing params', async () => {
    Configuration.setAuthTokens('', '');
    try {
      await Register.refreshAuthToken();
    } catch (error) {
      expect(error.message).toEqual(errMissingParams.message);
    }
  });
});
