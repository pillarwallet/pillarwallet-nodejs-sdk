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
import { Configuration } from '../../../lib/configuration';
const nock = require('nock');
const { generatePrivateKey } = require('../../utils/generateKeyPair');

describe('update method', () => {
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
    message: 'User was successfully updated',
    user: {
      id: 'c2058d7b-cf63-4b2e-905c-55a02e30812a',
      username: `${secondUsername}`,
      firstName: 'Luke',
      lastName: 'Skywalker',
      email: `${secondUsername}@pillar.com`,
      phone: '+44 77 1111 2222',
      country: 'UK',
      state: 'CA',
      city: 'London',
      tagline: 'Social media consultant',
      taglineStatus: false,
      userSearchable: true,
      secretId: '0f165e37-5b50-405a-8ef5-df4532cbcfbb',
      betaProgramParticipant: true,
    },
  };

  const errInvalidWalletId = {
    message: 'Could not find a Wallet ID to search by.',
  };

  const errEmailDuplicated = {
    message: 'Email already exists!',
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
        .reply(200, responseData)
        .post('/user/update')
        .reply(409, errEmailDuplicated)
        .post('/user/update')
        .reply(200, responseData)
        .post('/user/update')
        .reply(200, {
          result: 'success',
          message: 'User was successfully updated',
          user: {
            id: 'c2058d7b-cf63-4b2e-905c-55a02e30812a',
            email: `${secondUsername}@pillar.com`,
            secretId: 'c2058d7b-cf63-4b2e-905c-55a02e30812a',
            username: firstUsername,
          },
        })
        .post('/user/update')
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
  });

  afterAll(() => {
    jest.restoreAllMocks();
    if (env === 'test') {
      nock.cleanAll();
    }
  });

  it('expects to return a success message and status 200', async () => {
    const inputParams = {
      walletId: secondWalletId,
      firstName: 'Luke',
      lastName: 'Skywalker',
      email: `${secondUsername}@pillar.com`,
      phone: '+44 77 1111 2222',
      country: 'UK',
      state: 'CA',
      city: 'London',
      tagline: 'Social media consultant',
      taglineStatus: false,
      userSearchable: true,
      betaProgramParticipant: true,
    };

    Configuration.accessKeys.oAuthTokens.accessToken = secondUserAccessToken;

    const response = await pSdk.user.update(inputParams);
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      result: 'success',
      message: 'User was successfully updated',
      user: {
        id: expect.any(String),
        username: `${secondUsername}`,
        firstName: 'Luke',
        lastName: 'Skywalker',
        email: `${secondUsername}@pillar.com`,
        phone: '+44 77 1111 2222',
        country: 'UK',
        state: 'CA',
        city: 'London',
        tagline: 'Social media consultant',
        taglineStatus: false,
        userSearchable: true,
        secretId: expect.any(String),
        betaProgramParticipant: true,
      },
    });
  });

  it('expects to return a conflict error due duplicated email', async () => {
    const inputParams = {
      walletId: firstWalletId,
      firstName: 'Darth',
      lastName: 'Vader',
      email: `${secondUsername}@pillar.com`,
      phone: '+44 77 1111 2222',
      country: 'UK',
      state: 'CA',
      city: 'London',
      tagline: 'Social media consultant',
      taglineStatus: false,
      userSearchable: true,
      betaProgramParticipant: true,
    };

    Configuration.accessKeys.oAuthTokens.accessToken = firstUserAccessToken;

    try {
      await pSdk.user.update(inputParams);
    } catch (error) {
      expect(error.response.status).toEqual(409);
      expect(error.response.data.message).toEqual(errEmailDuplicated.message);
    }
  });

  it('first user deletes email and now second user can use his email', async () => {
    let inputParams = {
      walletId: secondWalletId,
      email: '',
    };

    Configuration.accessKeys.oAuthTokens.accessToken = secondUserAccessToken;
    await pSdk.user.update(inputParams);

    Configuration.accessKeys.oAuthTokens.accessToken = firstUserAccessToken;

    inputParams = {
      walletId: firstWalletId,
      email: `${secondUsername}@pillar.com`,
    };

    const response = await pSdk.user.update(inputParams);
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      result: 'success',
      message: 'User was successfully updated',
      user: {
        id: expect.any(String),
        email: `${secondUsername}@pillar.com`,
        secretId: expect.any(String),
        username: firstUsername,
      },
    });
  });

  if (env === 'test') {
    it('should return 500 due internal server error', async () => {
      const inputParams = {
        walletId: secondWalletId,
        firstName: 'Luke',
        lastName: 'Skywalker',
        email: `${secondUsername}@pillar.com`,
        phone: '+44 77 1111 2222',
        country: 'UK',
        state: 'CA',
        city: 'London',
        tagline: 'Social media consultant',
        taglineStatus: false,
        userSearchable: true,
        betaProgramParticipant: true,
      };

      try {
        await pSdk.user.update(inputParams);
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data.message).toEqual(errInternal.message);
      }
    });
  }
});
