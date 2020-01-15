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
import { Register } from '../../../lib/register';
import { ProofKey } from '../../../utils/pkce';
import { Configuration } from '../../../lib/configuration';
const nock = require('nock');
const { generatePrivateKey } = require('../../utils/generateKeyPair');

describe('registerTokens method', () => {
  // Key pairs
  const privateKey = generatePrivateKey();

  // Generate random username
  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;

  const errInvalidPrivaeKey = {
    message: 'No registration record found',
  };
  const errInternal = {
    message: 'Internal Server Error',
  };

  let pSdk: PillarSdk;

  beforeAll(async () => {
    pSdk = new PillarSdk({});
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
        })
        .post('/register/tokens')
        .reply(200, {
          accessToken: 'myAccessToken',
          accessTokenExpiresAt: 'YYYY-mm-ddTHH:MM:ssZ',
          refreshToken: 'myRefreshToken',
          refreshTokenExpiresAt: 'YYYY-mm-ddTHH:MM:ssZ',
        })
        .post('/register/tokens')
        .reply(400, errInvalidPrivaeKey)
        .post('/register/tokens')
        .reply(500, errInternal);
    }

    try {
      await pSdk.wallet.registerAuthServer(walletRegister);
    } catch (e) {
      throw e;
    }
  });

  afterAll(() => {
    jest.restoreAllMocks();
    if (env === 'test') {
      nock.cleanAll();
    }
  });

  it('expects response to resolve with data and status code 200', async () => {
    const codeVerifier = await ProofKey.codeVerifierGenerator();

    const reponseRegisterTokens = await Register.registerTokens(
      codeVerifier.toString(),
      privateKey,
    );

    expect(reponseRegisterTokens.status).toBe(200);
    expect(reponseRegisterTokens.data).toEqual({
      accessToken: expect.any(String),
      accessTokenExpiresAt: expect.any(String),
      refreshToken: expect.any(String),
      refreshTokenExpiresAt: expect.any(String),
    });
  });

  it('should return 400 due invalid privateKey', async () => {
    const codeVerifier = await ProofKey.codeVerifierGenerator();

    Configuration.accessKeys.privateKey =
      '97ddae0f3a25b92268175400149d65d6887b9cefaf28ea2c078e05cdc15a3c0a';
    try {
      await Register.registerTokens(codeVerifier.toString(), privateKey);
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual(errInvalidPrivaeKey.message);
    }
  });

  if (env === 'test') {
    it('should return 500 due internal server error', async () => {
      const codeVerifier = await ProofKey.codeVerifierGenerator();

      try {
        await Register.registerTokens(codeVerifier.toString(), privateKey);
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data.message).toEqual(errInternal.message);
      }
    });
  }
});
