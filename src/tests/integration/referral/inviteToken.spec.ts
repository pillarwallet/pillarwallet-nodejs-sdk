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
import * as nock from 'nock';
import { Configuration } from '../../../lib/configuration';
const { generatePrivateKey } = require('../../utils/generateKeyPair');

describe('Referral List', () => {
  let pSdk: PillarSdk;
  let firstUserWalletId: string;
  let secondUserWalletId: string;
  let firstUserAccessToken: string;
  let secondUserAccessToken: string;

  // Key pairs
  const privateKeyFirstUser = generatePrivateKey();
  const privateKeySecondUser = generatePrivateKey();

  const firstUsername = `User${Math.random()
    .toString(36)
    .substring(7)}`;

  const secondUsername = `User${Math.random()
    .toString(36)
    .substring(7)}`;

  const responseData = {
    result: 'success',
    token: 'testToken',
  };

  const responseDataSameToken = {
    result: 'success',
    token: 'sameTestToken',
  };

  const errInvalidWalletId = {
    message: 'Could not find a Wallet ID to search by.',
  };

  const errInternal = {
    message: 'Internal Server Error',
  };

  beforeAll(async () => {
    pSdk = new PillarSdk({});
    pSdk.configuration.setUsername(firstUsername);

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
          accessToken: 'accessTokenSecondUser',
          refreshToken: 'refreshTokenSecondUser',
          walletId: 'walletIdSecondUser',
        })
        .post('/referral/invite-token')
        .reply(200, responseData)
        .post('/referral/invite-token')
        .reply(200, responseDataSameToken)
        .post('/referral/invite-token')
        .reply(200, responseDataSameToken)
        .post('/referral/invite-token')
        .reply(400, errInvalidWalletId)
        .post('/referral/invite-token')
        .reply(500, errInternal);
    }

    let walletRegister = {
      privateKey: privateKeyFirstUser,
      fcmToken: 'fcmToken1',
      username: firstUsername,
    };

    let response = await pSdk.wallet.registerAuthServer(walletRegister);
    firstUserWalletId = response.data.walletId;
    firstUserAccessToken = Configuration.accessKeys.oAuthTokens.accessToken;

    walletRegister = {
      privateKey: privateKeySecondUser,
      fcmToken: 'fcmToken2',
      username: secondUsername,
    };

    response = await pSdk.wallet.registerAuthServer(walletRegister);
    secondUserWalletId = response.data.walletId;
    secondUserAccessToken = Configuration.accessKeys.oAuthTokens.accessToken;
  });

  afterAll(() => {
    jest.restoreAllMocks();
    if (env === 'test') {
      nock.cleanAll();
    }
  });

  it('expects to return a success message and status 200', async () => {
    const inputParams = {
      walletId: firstUserWalletId,
    };

    Configuration.accessKeys.oAuthTokens.accessToken = firstUserAccessToken;

    const response = await pSdk.referral.inviteToken(inputParams);
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      result: 'success',
      token: expect.any(String),
    });
  });

  it('expects same result if same users calls the method two times and does not use the token', async () => {
    let token: string;
    const inputParams = {
      walletId: secondUserWalletId,
    };

    Configuration.accessKeys.oAuthTokens.accessToken = secondUserWalletId;

    let response = await pSdk.referral.inviteToken(inputParams);
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      result: 'success',
      token: expect.any(String),
    });

    token = response.data.token;

    response = await pSdk.referral.inviteToken(inputParams);
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      result: 'success',
      token,
    });
  });

  it('should return 400 due invalid params', async () => {
    const inputParams = {
      walletId: '',
    };

    try {
      await pSdk.referral.inviteToken(inputParams);
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual(errInvalidWalletId.message);
    }
  });

  if (env === 'test') {
    it('should return 500 due internal server error', async () => {
      const inputParams = {
        walletId: firstUserWalletId,
      };

      try {
        await pSdk.referral.inviteToken(inputParams);
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data.message).toEqual(errInternal.message);
      }
    });
  }
});
