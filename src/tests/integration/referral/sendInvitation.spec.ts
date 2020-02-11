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
const { generatePrivateKey } = require('../../utils/generateKeyPair');

describe('Referral Send Invitation', () => {
  let pSdk: PillarSdk;
  let walletId: string;

  // Key pairs
  const privateKey = generatePrivateKey();

  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;

  const responseData = {
    result: 'success',
    message: 'Invitation sent',
  };

  const responseDataGenerateToken = {
    result: 'success',
    token: 'testToken',
  };

  const errUserWhitoutEmailValidated = {
    message: 'Email not validated',
  };

  const errUserWhitoutPhoneValidated = {
    message: 'Phone not validated',
  };

  const errUserInvalidEmail = {
    message: 'data.email should match format "email"',
  };

  const errEmailInvited = {
    message: 'Email already invited',
  };

  const errPhoneInvited = {
    message: 'Phone already invited',
  };

  const errUserInvalidPhone = {
    message: 'data.phone should match pattern "^\\+[0-9]{6,}$"',
  };

  const errInvalidWalletId = {
    message: 'Could not find a Wallet ID to search by.',
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
          walletId: 'firstWalletId',
          userId: 'firstUserId',
        })
        .post('/referral/invite')
        .reply(400, errInvalidWalletId)
        .post('/referral/generate-token')
        .reply(200, responseDataGenerateToken)
        .post('/referral/invite')
        .reply(400, errUserWhitoutEmailValidated)
        .post('/referral/invite')
        .reply(400, errUserInvalidEmail)
        .post('/referral/generate-token')
        .reply(200, responseDataGenerateToken)
        .post('/referral/invite')
        .reply(400, errUserWhitoutPhoneValidated)
        .post('/referral/invite')
        .reply(400, errUserInvalidPhone)
        .post('/referral/invite')
        .reply(500, errInternal)
        .post('/referral/generate-token')
        .reply(200, responseDataGenerateToken)
        .post('/referral/invite')
        .reply(200, responseData)
        .post('/referral/generate-token')
        .reply(200, responseDataGenerateToken)
        .post('/referral/invite')
        .reply(400, errEmailInvited)
        .post('/referral/generate-token')
        .reply(200, responseDataGenerateToken)
        .post('/referral/invite')
        .reply(200, responseData)
        .post('/referral/generate-token')
        .reply(200, responseDataGenerateToken)
        .post('/referral/invite')
        .reply(400, errPhoneInvited);
    }

    const walletRegister = {
      privateKey,
      fcmToken: '987qwe1',
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

  it('should return 400 due invalid params', async () => {
    const inputParams = {
      walletId: '',
      referralLink: 'https://abgsz.test-app.link/Ug1ZYKACu3',
      email: 'test@test',
      token: 'testToken',
    };

    try {
      await pSdk.referral.sendInvitation(inputParams);
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual(errInvalidWalletId.message);
    }
  });

  describe('email invitation', () => {
    it('should return 400 response due user without email validated', async () => {
      const tokenInputParams = {
        walletId,
      };
      try {
        const res = await pSdk.referral.generateToken(tokenInputParams);

        const inputParams = {
          walletId,
          referralLink: 'https://abgsz.test-app.link/Ug1ZYKACu3',
          email: 'test@test',
          token: res.data.token,
        };

        await pSdk.referral.sendInvitation(inputParams);
      } catch (error) {
        expect(error.response.status).toEqual(400);
        expect(error.response.data.message).toEqual(
          errUserWhitoutEmailValidated.message,
        );
      }
    });

    it('should return 400 response due invalid email', async () => {
      const inputParams = {
        walletId,
        referralLink: 'https://abgsz.test-app.link/Ug1ZYKACu3',
        email: 'invalid',
        token: 'testToken',
      };

      try {
        await pSdk.referral.sendInvitation(inputParams);
      } catch (error) {
        expect(error.response.status).toEqual(400);
        expect(error.response.data.message).toEqual(
          errUserInvalidEmail.message,
        );
      }
    });
  });

  describe('phone invitation', () => {
    it('should return 400 response due user without phone validated', async () => {
      const tokenInputParams = {
        walletId,
      };
      try {
        const res = await pSdk.referral.generateToken(tokenInputParams);

        const inputParams = {
          walletId,
          referralLink: 'https://abgsz.test-app.link/Ug1ZYKACu3',
          phone: '999999',
          token: res.data.token,
        };

        await pSdk.referral.sendInvitation(inputParams);
      } catch (error) {
        expect(error.response.status).toEqual(400);
        expect(error.response.data.message).toEqual(
          errUserWhitoutPhoneValidated.message,
        );
      }
    });

    it('should return 400 response due invalid phone', async () => {
      const inputParams = {
        walletId,
        referralLink: 'https://abgsz.test-app.link/Ug1ZYKACu3',
        phone: 'invalid',
        token: 'testToken',
      };

      try {
        await pSdk.referral.sendInvitation(inputParams);
      } catch (error) {
        expect(error.response.status).toEqual(400);
        expect(error.response.data.message).toEqual(
          errUserInvalidPhone.message,
        );
      }
    });
  });

  if (env === 'test') {
    it('should return 500 due internal server error', async () => {
      const inputParams = {
        walletId,
        referralLink: 'https://abgsz.test-app.link/Ug1ZYKACu3',
        phone: '999999',
        token: 'testToken',
      };

      try {
        await pSdk.referral.sendInvitation(inputParams);
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data.message).toEqual(errInternal.message);
      }
    });

    describe('email invitation', () => {
      it('expects to return a success message and status 200', async () => {
        const tokenInputParams = {
          walletId,
        };

        const res = await pSdk.referral.generateToken(tokenInputParams);

        const inputParams = {
          walletId,
          referralLink: 'https://abgsz.test-app.link/Ug1ZYKACu3',
          email: 'test@test',
          token: res.data.token,
        };

        const response = await pSdk.referral.sendInvitation(inputParams);

        expect(response.status).toBe(200);
        expect(response.data).toEqual(responseData);
      });

      it('should return 400 response due email already invited', async () => {
        const tokenInputParams = {
          walletId,
        };

        const res = await pSdk.referral.generateToken(tokenInputParams);

        const inputParams = {
          walletId,
          referralLink: 'https://abgsz.test-app.link/Ug1ZYKACu3',
          email: 'test@test',
          token: res.data.token,
        };

        try {
          await pSdk.referral.sendInvitation(inputParams);
        } catch (error) {
          expect(error.response.status).toEqual(400);
          expect(error.response.data.message).toEqual(errEmailInvited.message);
        }
      });
    });

    describe('phone invitation', () => {
      it('expects to return a success message and status 200', async () => {
        const tokenInputParams = {
          walletId,
        };

        const res = await pSdk.referral.generateToken(tokenInputParams);

        const inputParams = {
          walletId,
          referralLink: 'https://abgsz.test-app.link/Ug1ZYKACu3',
          phone: '999999',
          token: res.data.token,
        };

        const response = await pSdk.referral.sendInvitation(inputParams);

        expect(response.status).toBe(200);
        expect(response.data).toEqual(responseData);
      });

      it('should return 400 response due phone already invited', async () => {
        const tokenInputParams = {
          walletId,
        };

        const res = await pSdk.referral.generateToken(tokenInputParams);

        const inputParams = {
          walletId,
          referralLink: 'https://abgsz.test-app.link/Ug1ZYKACu3',
          phone: '999999',
          token: res.data.token,
        };

        try {
          await pSdk.referral.sendInvitation(inputParams);
        } catch (error) {
          expect(error.response.status).toEqual(400);
          expect(error.response.data.message).toEqual(errPhoneInvited.message);
        }
      });
    });
  }
});
