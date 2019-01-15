// tslint:disable: object-shorthand-properties-first
// check node environment
const env = process.env.NODE_ENV;

const keys = require('../utils/generateKeyPair');
import { PillarSdk } from '../..';
import nock = require('nock');

/**
 * To test it locally. Change the configuration in platform-authentication.
 * set authentication.accessTokenLifetime to 5 seconds and
 * set authentication.refreshTokenLifetime to 10 seconds
 */
if (env !== 'test') {
  jest.useRealTimers();
  jest.setTimeout(17000);
}

describe('Authentication scenarios', () => {
  const privateKey = keys.privateKey.toString();

  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;

  let walletId: string;
  let pSdk: PillarSdk;

  const walletRegister = {
    privateKey,
    fcmToken: '987qwe',
    username,
  };

  beforeAll(async () => {
    pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
      privateKey,
    });

    pSdk.configuration.setUsername(username);

    if (env === 'test') {
      const data = {
        refreshToken: 'refreshToken',
        username,
      };

      const refreshTokenData = { ...data };

      const refreshTokenResponse = {
        accessToken: 'myAccessToken',
        accessTokenExpiresAt: '2016-07-12T23:34:21Z',
        refreshToken: 'myRefreshToken',
        refreshTokenExpiresAt: '2016-07-12T23:34:21Z',
      };

      const refreshTokenErrorResponse = {
        status: 400,
        message: 'Invalid grant: refresh token has expired',
      };

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
        .get('/user/info?walletId=walletId')
        .reply(200, {
          id: 'id',
          username,
        })
        .get('/user/info?walletId=walletId')
        .reply(401, {
          response: {
            status: 401,
            config: {},
          },
        })
        .post('/register/refresh', {
          ...refreshTokenData,
        })
        .reply(200, {
          ...refreshTokenResponse,
        })
        .persist()
        .get('/user/info?walletId=walletId')
        .reply(200, {
          id: 'id',
          username,
        })
        .get('/user/info?walletId=walletId')
        .reply(401, {
          response: {
            status: 401,
            config: {},
          },
        })
        .post('/register/refresh', {
          ...refreshTokenData,
          refreshToken: 'myRefreshToken',
        })
        .reply(400, {
          ...refreshTokenErrorResponse,
        })
        .post('/register/tokens')
        .reply(200, {
          ...refreshTokenResponse,
        })
        .get('/user/info?walletId=walletId')
        .reply(200, {
          id: 'id',
          username,
        });
    }

    try {
      const response = await pSdk.wallet.registerAuthServer(walletRegister);
      walletId = response.data.walletId;
    } catch (e) {
      throw e;
    }
  });

  it('with a valid accessToken', async () => {
    const inputParams = {
      walletId,
    };

    const response = await pSdk.user.info(inputParams);

    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      id: expect.any(String),
      username,
    });
  });

  it('with an invalid accessToken and valid refreshToken', async () => {
    const inputParams = {
      walletId,
    };

    if (env !== 'test') {
      setTimeout(async () => {
        const response = await pSdk.user.info(inputParams);
        expect(response.status).toBe(200);
        expect(response.data).toEqual({
          id: expect.any(String),
          username,
        });
      }, 7000);
    } else {
      const response = await pSdk.user.info(inputParams);
      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        id: expect.any(String),
        username,
      });
    }
  });

  it('with an invalid accessToken and refreshToken', async () => {
    if (env !== 'test') {
      await new Promise(res =>
        setTimeout(async () => {
          const inputParams = {
            walletId,
          };
          const response = await pSdk.user.info(inputParams);
          expect(response.status).toBe(200);
          expect(response.data).toEqual({
            id: expect.any(String),
            username,
          });
          res();
        }, 11000),
      );
    } else {
      const inputParams = {
        walletId,
      };
      const response = await pSdk.user.info(inputParams);
      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        id: expect.any(String),
        username,
      });
    }
  });
});
