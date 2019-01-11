// tslint:disable: object-shorthand-properties-first
const env = process.env.NODE_ENV;

import { PillarSdk } from '../../../index';
import { Register } from '../../../lib/register';
import { ProofKey } from '../../../utils/pkce';
import { Configuration } from '../../../lib/configuration';
const nock = require('nock');
const keys = require('../../utils/generateKeyPair');

describe('registerTokens method', () => {
  // Key pairs
  const privateKey = keys.privateKey.toString();

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
    pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
      privateKey,
    });
    const walletRegister = {
      privateKey,
      fcmToken: '987qwe',
      username,
    };

    if (env === 'test') {
      const mockApi = nock('http://localhost:8080');
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
      await Register.registerTokens(codeVerifier.toString());
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual(errInvalidPrivaeKey.message);
    }
  });

  if (env === 'test') {
    it('should return 500 due internal server error', async () => {
      const codeVerifier = await ProofKey.codeVerifierGenerator();

      try {
        await Register.registerTokens(codeVerifier.toString());
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data.message).toEqual(errInternal.message);
      }
    });
  }
});
