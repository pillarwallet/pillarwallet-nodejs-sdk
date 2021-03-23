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
import { Configuration } from '../../../lib/configuration';
const nock = require('nock');
const { generatePrivateKey } = require('../../utils/generateKeyPair');

describe('userValidateEmail method', () => {
  let pSdk: PillarSdk;
  let firstWalletId: string;
  let firstUserAccessToken: string;
  let secondWalletId: string;
  let secondUserAccessToken: string;

  // Key pairs
  const firstPrivateKey = generatePrivateKey();
  const secondPrivateKey = generatePrivateKey();

  const firstUsername = `User${Math.random()
    .toString(36)
    .substring(7)}`;

  const secondUsername = `User${Math.random()
    .toString(36)
    .substring(7)}`;

  const responseData = {
    result: 'success',
    message: 'Email validated.',
    userId: 'secondUserId',
  };

  const errUserWhitoutEmail = {
    message: 'No email provided for validation.',
  };

  const errInvalidOTP = {
    message: 'One-time password is not valid.',
  };

  const errExpiredOTP = {
    message: 'One-time password expired.',
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
          walletId: 'firstWalletId',
          userId: 'firstUserId',
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
          accessToken: 'accessToken',
          refreshToken: 'refreshToken',
          walletId: 'secondWalletId',
          userId: 'secondUserId',
        })
        .post('/user/update')
        .reply(200)
        .post('/user/validate-email')
        .reply(404, errUserWhitoutEmail)
        .post('/user/validate-email')
        .reply(404, errInvalidOTP)
        .post('/user/validate-email')
        .reply(400, errInvalidWalletId)
        .post('/user/validate-email')
        .reply(422, errExpiredOTP)
        .post('/user/validate-email')
        .reply(200, responseData)
        .post('/user/validate-email')
        .reply(500, errInternal);
    }

    let walletRegister = {
      privateKey: firstPrivateKey,
      fcmToken: '987qwe1',
      username: firstUsername,
    };

    let response = await pSdk.wallet.registerAuthServer(walletRegister);
    firstWalletId = response.data.walletId;
    firstUserAccessToken = Configuration.accessKeys.oAuthTokens.accessToken;

    walletRegister = {
      privateKey: secondPrivateKey,
      fcmToken: '987qwe2',
      username: secondUsername,
    };

    response = await pSdk.wallet.registerAuthServer(walletRegister);
    secondWalletId = response.data.walletId;
    secondUserAccessToken = Configuration.accessKeys.oAuthTokens.accessToken;

    const userUpdateParams = {
      email: 'damian.salaverry@tarmac.io',
      walletId: secondWalletId,
    };

    await pSdk.user.update(userUpdateParams);
  });

  afterAll(() => {
    jest.restoreAllMocks();
    if (env === 'test') {
      nock.cleanAll();
    }
  });

  it('should return 404 response due user without email defined', async () => {
    const inputParams = {
      walletId: firstWalletId,
      oneTimePassword: 'test',
    };

    Configuration.accessKeys.oAuthTokens.accessToken = firstUserAccessToken;

    try {
      await pSdk.user.validateEmail(inputParams);
    } catch (error) {
      expect(error.response.status).toEqual(404);
      expect(error.response.data.message).toEqual(errUserWhitoutEmail.message);
    }
  });

  it('should return 404 response due to invalid OTP', async () => {
    const inputParams = {
      walletId: secondWalletId,
      oneTimePassword: 'invalid',
    };

    Configuration.accessKeys.oAuthTokens.accessToken = secondUserAccessToken;

    try {
      await pSdk.user.validateEmail(inputParams);
    } catch (error) {
      expect(error.response.status).toEqual(404);
      expect(error.response.data.message).toEqual(errInvalidOTP.message);
    }
  });

  it('should return 400 due invalid params', async () => {
    const inputParams = {
      walletId: '',
      oneTimePassword: '',
    };

    try {
      await pSdk.user.validateEmail(inputParams);
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual(errInvalidWalletId.message);
    }
  });

  if (env === 'test') {
    it('should return 422 response due to expired OTP', async () => {
      const inputParams = {
        walletId: secondWalletId,
        oneTimePassword: 'expired',
      };

      Configuration.accessKeys.oAuthTokens.accessToken = secondUserAccessToken;

      try {
        await pSdk.user.validateEmail(inputParams);
      } catch (error) {
        expect(error.response.status).toEqual(422);
        expect(error.response.data.message).toEqual(errExpiredOTP.message);
      }
    });

    it('expects to return a success message and status 200', async () => {
      const inputParams = {
        walletId: secondWalletId,
        oneTimePassword: 'test',
      };

      Configuration.accessKeys.oAuthTokens.accessToken = secondUserAccessToken;

      const response = await pSdk.user.validateEmail(inputParams);
      expect(response.status).toBe(200);
      expect(response.data).toEqual(responseData);
    });

    it('should return 500 due internal server error', async () => {
      const inputParams = {
        walletId: secondWalletId,
        oneTimePassword: 'test',
      };

      try {
        await pSdk.user.validateEmail(inputParams);
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data.message).toEqual(errInternal.message);
      }
    });
  }
});
