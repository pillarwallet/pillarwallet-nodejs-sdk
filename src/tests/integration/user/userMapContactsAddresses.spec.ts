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
import { Configuration } from '../../../lib/configuration';
import * as nock from 'nock';

describe('User Map Contracts Addresses', () => {
  // Key pairs
  const EC = require('elliptic').ec;
  const ecSecp256k1 = new EC('secp256k1');

  let privateKey = ecSecp256k1
    .genKeyPair()
    .getPrivate()
    .toString('hex');

  if (privateKey.length !== 64) {
    privateKey =
      '5731d22487631cb89968933dc23fd53d047cfbc01f6f2078b8879bb220f73caa';
  }

  // Generate random username
  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;

  let walletId: string;
  let pSdk: PillarSdk;

  const responseData = {
    result: 'success',
    message: 'Contact smart addresses successfully mapped',
    smartWallets: [],
  };

  const errInvalidWalletId = {
    message: 'Could not find a Wallet ID to search by.',
  };

  const errInternal = {
    message: 'Internal Server Error',
  };

  const errUnauthorized = {
    message: 'Unauthorized',
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
        .post('/user/map-contacts-addresses')
        .reply(200, responseData)
        .post('/user/map-contacts-addresses')
        .reply(400, errInvalidWalletId)
        .post('/user/map-contacts-addresses')
        .reply(500, errInternal)
        .post('/user/map-contacts-addresses')
        .reply(401, errUnauthorized)
        .post('/register/refresh')
        .reply(200, {
          accessToken: 'accessToken',
          refreshToken: 'refreshToken',
        })
        .post('/user/map-contacts-addresses')
        .reply(200, responseData);
    }

    const walletRegister = {
      privateKey,
      fcmToken: '987qwe2',
      username,
    };

    const response = await pSdk.wallet.registerAuthServer(walletRegister);
    walletId = response.data.walletId;
  });

  afterAll(() => {
    jest.restoreAllMocks();
    if (env === 'test') {
      nock.cleanAll();
    }
  });

  it('expects response to resolve with data and status code 200', async () => {
    const inputParams = {
      walletId,
      contacts: [],
    };
    const response = await pSdk.user.mapContactsAddresses(inputParams);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(responseData);
  });

  it('should return 400 due invalid params', async () => {
    const inputParams = {
      walletId: '',
      contacts: [],
    };

    try {
      await pSdk.user.mapContactsAddresses(inputParams);
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual(errInvalidWalletId.message);
    }
  });

  if (env === 'test') {
    it('should return 500 due internal server error', async () => {
      const inputParams = {
        walletId,
        contacts: [],
      };

      try {
        await pSdk.user.mapContactsAddresses(inputParams);
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data.message).toEqual(errInternal.message);
      }
    });
  }

  it('expects to return 401 (unauthorized) due to invalid accessToken', async () => {
    const inputParams = {
      walletId,
      contacts: [],
    };

    Configuration.accessKeys.oAuthTokens.accessToken = 'invalid';

    try {
      await pSdk.user.mapContactsAddresses(inputParams);
    } catch (error) {
      expect(error.response.status).toEqual(401);
      expect(error.response.data.message).toEqual(errUnauthorized.message);
    }
  });
});
