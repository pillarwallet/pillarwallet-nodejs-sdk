/*
Copyright (C) 2019 Stiftung Pillar Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
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
  jest.setTimeout(18000);
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
      tokensFailedCallbackFn: cb => {
        console.log('Callback called');
        cb(privateKey);
      },
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

      const mockApi = nock('https://localhost:8080');
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
      }, 7000); // wait 7 seconds, to ensure accessToken expires
    } else {
      const response = await pSdk.user.info(inputParams);
      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        id: expect.any(String),
        username,
      });
    }
  });

  it('with an invalid accessToken and expired refreshToken', async () => {
    if (env !== 'test') {
      await new Promise(
        res =>
          setTimeout(async () => {
            const inputParams = {
              walletId,
            };
            try {
              await pSdk.user.info(inputParams);
            } catch (error) {
              if (
                error.response &&
                error.response.data &&
                error.response.data.message ===
                  'Invalid grant: refresh token has expired'
              ) {
                // tokensFailedCallbackFn should be called, chekcs for 'Callback called' message in console
              }
            }
            res();
          }, 15000), // wait 15 seconds, to ensure accessToken and refreshToken expires
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
