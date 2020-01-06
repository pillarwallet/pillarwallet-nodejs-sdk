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

const keys = require('../../utils/generateKeyPair');
import { PillarSdk } from '../../..';
import * as nock from 'nock';

describe('Connection Map Identity Keys', () => {
  // Key pairs
  const privateKey = keys.privateKey.toString();

  // Generate random username
  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;

  let walletId: string;
  let pSdk: PillarSdk;

  const responseData = [
    {
      userId: null,
      targetUserId: null,
      targetUserInfo: null,
      sourceUserAccessKey: null,
      targetUserAccessKey: null,
      sourceIdentityKey: 'abc',
      targetIdentityKey: 'xyz',
      createdAt: null,
      updatedAt: null,
      status: null,
    },
  ];

  const errInvalidWalletId = {
    message: 'Could not find a Wallet ID to search by.',
  };

  const errInternal = {
    message: 'Internal Server Error',
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
        .post('/connection/map-identity-keys')
        .reply(200, responseData)
        .post('/connection/map-identity-keys')
        .reply(400, errInvalidWalletId)
        .post('/connection/map-identity-keys')
        .reply(500, errInternal)
        .post('/connection/map-identity-keys');
    }
    const response = await pSdk.wallet.registerAuthServer(walletRegister);
    walletId = response.data.walletId;
  });

  afterAll(() => {
    jest.restoreAllMocks();
    if (env === 'test') {
      nock.cleanAll();
    }
  });

  it('expects to return a list of connection objects and status 200', async () => {
    const inputParams = {
      walletId,
      identityKeys: [
        {
          sourceIdentityKey: 'abc',
          targetIdentityKey: 'xyz',
        },
      ],
    };

    const response = await pSdk.connection.mapIdentityKeys(inputParams);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(responseData);
  });

  it('should return 400 due invalid params', async () => {
    const inputParams = {
      walletId: '',
      identityKeys: [],
    };

    try {
      await pSdk.connection.mapIdentityKeys(inputParams);
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual(errInvalidWalletId.message);
    }
  });

  if (env === 'test') {
    it('should return 500 due internal server error', async () => {
      const inputParams = {
        walletId,
        identityKeys: [],
      };

      try {
        await pSdk.connection.mapIdentityKeys(inputParams);
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data.message).toEqual(errInternal.message);
      }
    });
  }
});
