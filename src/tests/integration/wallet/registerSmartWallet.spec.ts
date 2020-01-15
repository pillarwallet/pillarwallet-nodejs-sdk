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

import { PillarSdk } from '../../..';
import * as nock from 'nock';
const generateKeyPair = require('../../utils/generateKeyPair');

describe('Wallet register-smart-wallet', () => {
  // Key pairs
  const privateKey = generateKeyPair.privateKey;
  const ethAddress = generateKeyPair.ethAddress.toString();

  // Generate random username
  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;

  let userWalletId: string;
  let userId: string;
  let pSdk: PillarSdk;

  const responseData = {
    result: 'success',
    message: 'Wallet registered successfully.',
    fcmToken: '987qwe1',
    userId: 'userId',
    walletId: 'walletId',
  };

  const errWalletWithSameethAddress = {
    message: 'Wallet with same ethAddress already exists',
  };

  const errInvalidWalletId = {
    message: 'Could not find a Wallet ID to search by.',
  };

  const errInternal = {
    message: 'Internal Server Error',
  };

  beforeAll(async () => {
    pSdk = new PillarSdk({});
    pSdk.configuration.setUsername('username');

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

        .post('/wallet/register-smart-wallet')
        .reply(200, responseData)
        .post('/wallet/register-smart-wallet')
        .reply(409, errWalletWithSameethAddress)
        .post('/wallet/register-smart-wallet')
        .reply(400, errInvalidWalletId)
        .post('/wallet/register-smart-wallet')
        .reply(500, errInternal);
    }

    const walletRegister = {
      privateKey,
      fcmToken: '987qwe1',
      username,
    };

    const response = await pSdk.wallet.registerAuthServer(walletRegister);
    userId = response.data.userId;
    userWalletId = response.data.walletId;
  });

  afterAll(() => {
    jest.restoreAllMocks();
    if (env === 'test') {
      nock.cleanAll();
    }
  });

  it('expects to return a success message and status 200', async () => {
    const inputParams = {
      walletId: userWalletId,
      privateKey,
      ethAddress,
      fcmToken: '987qwe1',
    };

    const response = await pSdk.wallet.registerSmartWallet(inputParams);
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      result: 'success',
      message: 'Wallet registered successfully.',
      fcmToken: '987qwe1',
      userId,
      walletId: expect.any(String),
    });
  });

  it('expects to return a conflict message and status 409', async () => {
    const inputParams = {
      walletId: userWalletId,
      privateKey,
      ethAddress,
      fcmToken: '987qwe1',
    };

    try {
      await pSdk.wallet.registerSmartWallet(inputParams);
    } catch (error) {
      expect(error.message).toEqual('Request failed with status code 409');
      expect(error.response.data.message).toEqual(
        'Wallet with same ethAddress already exists',
      );
      expect(error.response.status).toEqual(409);
    }
  });

  it('should return 400 due invalid params', async () => {
    const inputParams = {
      walletId: '',
      privateKey,
      ethAddress,
      fcmToken: '987qwe1',
    };

    try {
      await pSdk.wallet.registerSmartWallet(inputParams);
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual(errInvalidWalletId.message);
    }
  });

  if (env === 'test') {
    it('should return 500 due internal server error', async () => {
      const inputParams = {
        walletId: userWalletId,
        privateKey,
        ethAddress,
        fcmToken: '987qwe1',
      };

      try {
        await pSdk.wallet.registerSmartWallet(inputParams);
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data.message).toEqual(errInternal.message);
      }
    });
  }
});
