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
const env = process.env.NODE_ENV;

import { PillarSdk } from '../../../index';
const nock = require('nock');
const keys = require('../../utils/generateKeyPair');

describe('userMapContactsAddresses method', () => {
  let pSdk: PillarSdk;

  // Generate random username
  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;

  // Expected responses
  const inappropriateUsernameErr = {
    message: 'Inappropriate username',
  };

  const ethAddress = keys.ethAddress.toString();
  const publicKey = keys.publicKey.toString();

  const walletParams = {
    username,
    publicKey,
    ethAddress,
    fcmToken: 'abc123',
  };

  let wallet;

  beforeAll(async () => {
    pSdk = new PillarSdk({});

    if (env === 'test') {
      const mockApi = nock('https://localhost:8080');
      mockApi
        .post('/wallet/register')
        .reply(200)
        .post(`/user/map-contacts-addresses`)
        .reply(200, {
          result: 'success',
          message: 'Contact smart addresses successfully mapped',
          smartWallets: [],
        })
        .post('/user/map-contacts-addresses')
        .reply(404, {
          statusCode: 404,
          message: 'Could not find User.',
        });
    }

    wallet = await pSdk.wallet.register(walletParams);
  });

  afterAll(() => {
    jest.restoreAllMocks();
    if (env === 'test') {
      nock.cleanAll();
    }
  });

  it('expects response to resolve with data and status code 200', async () => {
    const response = await pSdk.user.mapContactsAddresses({
      walletId: 'wallet-id',
      contacts: [],
    });
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({
      result: 'success',
      message: 'Contact smart addresses successfully mapped',
      smartWallets: [],
    });
  });

  it('should return 400 error due to invalid wallet user', async () => {
    try {
      await pSdk.user.mapContactsAddresses({
        walletId: 'invalid-wallet-id',
        contacts: [],
      });
    } catch (error) {
      expect(error.response.status).toEqual(404);
      expect(error.response.data.message).toEqual('Could not find User.');
    }
  });
});
