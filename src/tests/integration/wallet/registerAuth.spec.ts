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
const env = process.env.NODE_ENV;
import nock = require('nock');
import { PillarSdk } from '../../..';

const keys = require('../../utils/generateKeyPair');

describe('POST RegisterAuthServer', () => {
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

  const pSdk = new PillarSdk({
    apiUrl: 'https://localhost:8080',
    privateKey: keys.privateKey,
  });
  let walletRegister = {};

  beforeAll(async () => {
    // If env is test use HTTP server mocking library, else use localhost
    if (env === 'test') {
      const mockApi = nock('https://localhost:8080');
      mockApi
        .post('/register/keys')
        .reply(200, responseRegisterKey)
        .post('/register/auth')
        .reply(200, responseRegisterAuth)
        .post('/register/access')
        .reply(200, responseRegisterAccess)
        .post('/register/keys')
        .reply(500, 'Internal server error')
        .post('/register/keys')
        .reply(200, responseRegisterKey)
        .post('/register/auth')
        .reply(401, 'Payload verification failed')
        .post('/register/auth')
        .reply(500, 'Internal server error')
        .post('/register/keys')
        .reply(200, responseRegisterKey)
        .post('/register/auth')
        .reply(200, responseRegisterAuth)
        .post('/register/access')
        .reply(401, 'Payload verification failed')
        .post('/register/access')
        .reply(500, 'Internal server error')
        .post('/register/keys')
        .reply(200, responseRegisterKey)
        .post('/register/auth')
        .reply(200, responseRegisterAuth)
        .post('/register/keys')
        .reply(200, responseRegisterKey)
        .post('/register/auth')
        .reply(200, responseRegisterAuth);
    }
  });

  afterAll(() => {
    jest.restoreAllMocks();
    if (env === 'test') {
      nock.cleanAll();
    }
  });

  beforeEach(() => {
    const username = `User${Math.random()
      .toString(36)
      .substring(7)}`;
    walletRegister = {
      username,
      privateKey: keys.privateKey,
      fcmToken: '987qwe',
    };
  });

  it('responds with access payload', async () => {
    const response = await pSdk.wallet.registerAuthServer(walletRegister);
    expect(response.data).toEqual({
      accessToken: expect.any(String),
      accessTokenExpiresAt: expect.any(String),
      fcmToken: expect.any(String),
      refreshToken: expect.any(String),
      refreshTokenExpiresAt: expect.any(String),
      userId: expect.any(String),
      walletId: expect.any(String),
    });
    expect(response.status).toEqual(200);
  });

  if (env === 'test') {
    describe('/register/keys error responses', () => {
      it('throws a 500 when an internal server error occurs', async () => {
        try {
          await pSdk.wallet.registerAuthServer(walletRegister);
        } catch (error) {
          expect(error.message).toEqual('Request failed with status code 500');
          expect(error.response.status).toEqual(500);
        }
      });
    });

    describe('/register/auth error responses', () => {
      it('throws a 401 when payload authentication fails', async () => {
        try {
          await pSdk.wallet.registerAuthServer(walletRegister);
        } catch (error) {
          expect(error.message).toEqual('Request failed with status code 401');
          expect(error.response.status).toEqual(401);
        }
      });

      it('throws a 500 when an internal server error occurs', async () => {
        try {
          await pSdk.wallet.registerAuthServer(walletRegister);
        } catch (error) {
          expect(error.message).toEqual('Request failed with status code 500');
          expect(error.response.status).toEqual(500);
        }
      });
    });

    describe('/register/access error responses', () => {
      it('throws a 401 when payload authentication fails', async () => {
        try {
          await pSdk.wallet.registerAuthServer(walletRegister);
        } catch (error) {
          expect(error.message).toEqual('Request failed with status code 401');
          expect(error.response.status).toEqual(401);
        }
      });

      it('throws a 500 when an internal server error occurs', async () => {
        try {
          await pSdk.wallet.registerAuthServer(walletRegister);
        } catch (error) {
          expect(error.message).toEqual('Request failed with status code 500');
          expect(error.response.status).toEqual(500);
        }
      });
    });
  }
});
