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

import { PillarSdk } from '../../..';
import * as nock from 'nock';
const { generatePrivateKey } = require('../../utils/generateKeyPair');

describe('approveExternalLogin method', () => {
  // Key pairs
  const privateKey = generatePrivateKey();

  // Generate random username
  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;

  let pSdk: PillarSdk;

  // Responses
  const responseData = {
    status: 'success',
    data: {
      loginApproved: true,
    },
  };

  const errInternal = {
    message: 'Internal Server Error',
  };

  const errUnauthorized = {
    message: 'Signature not verified',
  };

  beforeAll(async () => {
    pSdk = new PillarSdk({});
    pSdk.configuration.setUsername('username');

    const walletRegister = {
      privateKey,
      fcmToken: '987qwe',
      username,
    };

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
        })
        .get('/register/approve-external-login?loginToken=test')
        .reply(200, responseData)
        .get('/register/approve-external-login?loginToken=test')
        .reply(500, errInternal)
        .get('/register/approve-external-login?loginToken=test')
        .reply(401, errUnauthorized)
        .post('/register/refresh')
        .reply(200, {
          accessToken: 'accessToken',
          refreshToken: 'refreshToken',
        })
        .get('/register/approve-external-login?loginToken=test')
        .reply(200, responseData);
    }

    try {
      await pSdk.wallet.registerAuthServer(walletRegister);
    } catch (e) {
      throw e;
    }
  });

  afterAll(() => {
    jest.restoreAllMocks();
    if (env === 'test') {
      nock.cleanAll();
    }
  });

  if (env === 'test') {
    it('expects to return a 200 response and success status', async () => {
      const inputParams = {
        loginToken: 'test',
      };

      const response = await pSdk.register.approveExternalLogin(inputParams);
      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        status: 'success',
        data: {
          loginApproved: true,
        },
      });
    });
  }

  it('should return 500 due invalid login attempt', async () => {
    const inputParams = {
      loginToken: 'test',
    };

    try {
      await pSdk.register.approveExternalLogin(inputParams);
    } catch (error) {
      expect(error.response.status).toEqual(500);
      expect(error.response.data.message).toEqual(errInternal.message);
    }
  });
});
