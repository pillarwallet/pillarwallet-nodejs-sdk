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

import { PillarSdk } from '../../..';
import nock = require('nock');

const keys = require('../../utils/generateKeyPair');
const username = `User${Math.random()
  .toString(36)
  .substring(7)}`;
let responseValidate: any;
const walletRegister = {
  username,
  fcmToken: '987qwe',
};

if (env === 'test') {
  const responseRegister = {
    userId: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
  };

  const responseUserValidate = {
    id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    username: 'oneUsername',
    walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
  };

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

  const responseUserInfo = {
    nonce: '3yy1uy3u13yu1y3uy3',
    expiresAt: '2011-06-14T04:12:36Z',
    id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    username: 'oneUsername',
    profileImage: 'oneImage',
    config: {
      headers: {
        Authorization: 'Bearer d290f1eed701748f0851',
      },
    },
  };

  nock('https://localhost:8080')
    .post('/wallet/register')
    .reply(200, responseRegister);

  nock('https://localhost:8080')
    .post('/user/validate')
    .reply(200, responseUserValidate);

  nock('https://localhost:8080')
    .post('/register/keys')
    .reply(200, responseRegisterKey);

  nock('https://localhost:8080')
    .post('/register/auth')
    .reply(200, responseRegisterAuth);

  nock('https://localhost:8080')
    .post('/register/access')
    .reply(200, responseRegisterAccess);

  nock('https://localhost:8080')
    .get('/user/info?walletId=' + responseRegisterAccess.walletId)
    .reply(200, responseUserInfo);
}

describe('First Step - register wallet', () => {
  it('responds with access payload', async () => {
    const pSdk = new PillarSdk({
      apiUrl: 'https://localhost:8080',
      notificationsUrl: 'http://localhost:8081',
      investmentsUrl: 'http://localhost:8082',
      privateKey: keys.privateKey,
    });
    const response = await pSdk.wallet.register(walletRegister);
    expect(response.status).toEqual(200);
  });
});

describe('Reproducing wallet import flow', () => {
  let pSdk2: any;
  beforeAll(() => {
    pSdk2 = new PillarSdk({
      apiUrl: 'https://localhost:8080',
      notificationsUrl: 'http://localhost:8081',
      investmentsUrl: 'http://localhost:8082',
      privateKey: keys.privateKey,
      updateOAuthFn: () => {
        return 'oneCallbackFunction';
      },
    });
  });

  it('should be able to call user.validate', async () => {
    responseValidate = await pSdk2.user.validate({
      blockchainAddress: keys.ethAddress,
    });

    expect(responseValidate.data).toEqual({
      id: expect.any(String),
      username: expect.any(String),
      walletId: expect.any(String),
    });
  });

  it('should register wallet and generate new Oauth Tokens', async () => {
    const registerAuthPayload = {
      username,
      privateKey: keys.privateKey,
      fcmToken: 'anotherFcm',
    };

    const responseAuthServer = await pSdk2.wallet.registerAuthServer(
      registerAuthPayload,
    );
    expect(responseAuthServer.status).toEqual(200);
  });

  it('should call user.info, after registerAuthServer, with Authorization header', async () => {
    const responseUserInfo = await pSdk2.user.info({
      walletId: responseValidate.data.walletId,
    });
    expect(responseUserInfo.status).toEqual(200);
    expect(responseUserInfo.config.headers.Authorization).toEqual(
      expect.any(String),
    );
  });
});
