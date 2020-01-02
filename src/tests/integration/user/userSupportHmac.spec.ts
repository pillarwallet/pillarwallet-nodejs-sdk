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
/* tslint:disable object-shorthand-properties-first */
const env = process.env.NODE_ENV;

import { PillarSdk } from '../../../index';
const nock = require('nock');

describe('supportHmac method', () => {
  let pSdk: PillarSdk;

  const EC = require('elliptic').ec;
  const ecSecp256k1 = new EC('secp256k1');

  // Key pairs

  let privateKey;
  do {
    privateKey = ecSecp256k1
      .genKeyPair()
      .getPrivate()
      .toString('hex');
  } while (privateKey.length !== 64);

  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;

  const responseData = {
    status: 'success',
    hmac: 'qwerty',
  };

  const errInternal = {
    message: 'Internal Server Error',
  };

  const errInvalidProject = {
    message: 'data.project should be equal to one of the allowed values',
  };

  beforeAll(async () => {
    pSdk = new PillarSdk({});
    pSdk.configuration.setUsername(username);

    if (env === 'test') {
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
          userId: 'userId',
        })
        .post('/user/support-hmac')
        .reply(200, responseData)
        .post('/user/support-hmac')
        .reply(400, errInvalidProject)
        .post('/user/support-hmac')
        .reply(500, errInternal);
    }

    const walletRegister = {
      privateKey,
      fcmToken: '987qwe1',
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

  it('expects to return a success message and status 200', async () => {
    const inputParams = {
      project: 'ios',
    };

    const response = await pSdk.user.supportHmac(inputParams);

    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      status: 'success',
      hmac: expect.any(String),
    });
  });

  it('expects to return a error message due invalid project', async () => {
    try {
      const inputParams = {
        project: 'invalid',
      };

      await pSdk.user.supportHmac(inputParams);
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual(errInvalidProject.message);
    }
  });

  if (env === 'test') {
    it('should return 500 due internal server error', async () => {
      try {
        const inputParams = {
          project: 'ios',
        };

        await pSdk.user.supportHmac(inputParams);
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data.message).toEqual(errInternal.message);
      }
    });
  }
});
