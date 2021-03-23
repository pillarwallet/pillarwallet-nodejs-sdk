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
/* tslint:disable object-shorthand-properties-first */
const env = process.env.NODE_ENV;

import { PillarSdk } from '../../../index';
import { PrivateKeyDerivatives } from '../../../utils/private-key-derivatives';
const nock = require('nock');
const { generatePrivateKey } = require('../../utils/generateKeyPair');

describe('User v2 Validate', () => {
  let pSdk: PillarSdk;
  let walletId: string;

  // Key pairs
  const privateKey = generatePrivateKey();

  // Generate public key and address from private key.
  const publicKey = PrivateKeyDerivatives.getPublicKey(privateKey);
  const address = PrivateKeyDerivatives.getEthAddress(privateKey);

  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;

  const responseData = {
    username,
    walletId: 'walletId',
  };

  const invalidData = {
    message: 'data.publicKey should match pattern "[a-fA-F0-9]{128}$"',
  };

  const errWalletNotFound = {
    message: 'Could not find wallet',
  };

  const errUserNotFound = {
    message: 'Could not find user',
  };

  const errInternal = {
    message: 'Internal Server Error',
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
        .post('/register/keys')
        .reply(200, {
          expiresAt: '2015-03-21T05:41:32Z',
          nonce: 'AxCDF23232',
        })
        .post('/user/v2/validate')
        .reply(200, responseData)
        .post('/user/v2/validate')
        .reply(400, invalidData)
        .post('/user/v2/validate')
        .reply(404, errWalletNotFound)
        .post('/user/v2/validate')
        .reply(404, errUserNotFound)
        .post('/user/v2/validate')
        .reply(500, errInternal);
    }

    const walletRegister = {
      privateKey,
      fcmToken: '987qwe1',
      username,
    };

    const response = await pSdk.wallet.registerAuthServer(walletRegister);
    walletId = response.data.walletId;
    responseData.walletId = walletId;
  });

  afterAll(() => {
    jest.restoreAllMocks();
    if (env === 'test') {
      nock.cleanAll();
    }
  });

  it('expects to return a success message and status 200', async () => {
    const inputParams = {
      blockchainAddress: address,
      publicKey,
    };

    const response = await pSdk.userV2.validate(inputParams, privateKey);
    expect(response.data).toEqual(responseData);
  });

  it('should return 400 due invalid params', async () => {
    const inputParams = {
      blockchainAddress: '',
      publicKey: '',
    };

    try {
      await pSdk.userV2.validate(inputParams, privateKey);
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual(invalidData.message);
    }
  });

  it('should return 404 due no wallet found', async () => {
    const inputParams = {
      blockchainAddress: 'not-exists',
      publicKey,
    };

    try {
      await pSdk.userV2.validate(inputParams, privateKey);
    } catch (error) {
      expect(error.response.status).toEqual(404);
      expect(error.response.data.message).toEqual(errWalletNotFound.message);
    }
  });

  if (env === 'test') {
    it('should return 404 due no user found', async () => {
      const inputParams = {
        blockchainAddress: address,
        publicKey,
      };

      try {
        await pSdk.userV2.validate(inputParams, privateKey);
      } catch (error) {
        expect(error.response.status).toEqual(404);
        expect(error.response.data.message).toEqual(errUserNotFound.message);
      }
    });

    it('should return 500 due internal server error', async () => {
      const inputParams = {
        blockchainAddress: address,
        publicKey,
      };

      try {
        await pSdk.userV2.validate(inputParams, privateKey);
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data.message).toEqual(errInternal.message);
      }
    });
  }
});
