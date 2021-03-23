/*
Copyright (C) 2021 Stiftung Pillar Project

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
import { Configuration } from '../../../lib/configuration';
import * as nock from 'nock';
const { generatePrivateKey } = require('../../utils/generateKeyPair');

describe('Get Badges', () => {
  // Key pairs
  const privateKey = generatePrivateKey();

  // Generate random username
  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;

  let walletId: string;
  let userId: string;
  let pSdk: PillarSdk;

  // Responses
  const responseData = [
    {
      name: 'First connection established',
      imageUrl:
        'http://localhost:3900/images/badges/first%20connection%20established.png',
      subtitle: 'First connection established',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
      id: 2,
      createdAt: 1547479198,
      updatedAt: 1547479198,
      receivedAt: 1547572329,
    },
  ];

  const errInvalidWalletId = {
    message: 'Could not find a Wallet ID to search by.',
  };

  const errInvalidUserId = {
    message: 'Could not find Wallet for user.',
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
          userId: 'userId',
        })
        .get('/badge?walletId=walletId&userId=userId')
        .reply(200, responseData)
        .get('/badge?walletId=&userId=userId')
        .reply(400, errInvalidWalletId)
        .get('/badge?walletId=walletId&userId=')
        .reply(404, errInvalidUserId)
        .get('/badge?walletId=walletId&userId=userId')
        .reply(500, errInternal)
        .get('/badge/my?walletId=walletId&userId=userId')
        .reply(401, errUnauthorized)
        .post('/register/refresh')
        .reply(200, {
          accessToken: 'accessToken',
          refreshToken: 'refreshToken',
        })
        .get('/badge?walletId=walletId&userId=userId')
        .reply(200, responseData);
    }

    try {
      const response = await pSdk.wallet.registerAuthServer(walletRegister);
      walletId = response.data.walletId;
      userId = response.data.userId;
    } catch (e) {
      throw e;
    }
  });

  afterAll(() => {
    jest.restoreAllMocks();
    nock.cleanAll();
  });

  it('expects to return array containing badges and status 200', async () => {
    const inputParams = {
      walletId,
      userId,
    };

    const responseDefaults = await pSdk.badge.get(inputParams);
    expect(responseDefaults.status).toBe(200);
    expect(responseDefaults.data).toEqual(expect.any(Array));
  });

  it('should return 400 due invalid params, walletId', async () => {
    const inputParams = {
      walletId: '',
      userId,
    };

    try {
      await pSdk.badge.get(inputParams);
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual(errInvalidWalletId.message);
    }
  });

  it('should return 400 due invalid params, userId', async () => {
    const inputParams = {
      walletId,
      userId: '',
    };

    try {
      await pSdk.badge.get(inputParams);
    } catch (error) {
      expect(error.response.status).toEqual(404);
      expect(error.response.data.message).toEqual(errInvalidUserId.message);
    }
  });

  if (env === 'test') {
    it('should return 500 due internal server error', async () => {
      const inputParams = {
        walletId,
        userId,
      };

      try {
        await pSdk.badge.get(inputParams);
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data.message).toEqual(errInternal.message);
      }
    });
  }

  it('expects to return 401 (unauthorized) due to invalid accessToken', async () => {
    const inputParams = {
      walletId,
      userId,
    };

    Configuration.accessKeys.oAuthTokens.accessToken = 'invalid';

    try {
      await pSdk.badge.get(inputParams);
    } catch (error) {
      expect(error.response.status).toEqual(401);
      expect(error.response.data.message).toEqual(errUnauthorized.message);
    }
  });
});
