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
// imports
import { PillarSdk } from '../../../index';
import { v4 as uuidV4 } from 'uuid';
import { Register } from '../../../lib/register';
import { ProofKey } from '../../../utils/pkce';
// HTTP server mocking library
const nock = require('nock');
// Key pairs( Private, Public, Address )
const keys = require('../../utils/generateKeyPair');

describe('registerAccess method', () => {
  // Key pairs
  const publicKey = keys.publicKey.toString();
  const privateKey = keys.privateKey.toString();
  const ethAddress = keys.ethAddress.toString();
  // Generate random username
  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;

  // Variables
  let data: any;
  let uuid: string;
  let nonce: string;
  let authorizationCode: string;

  // Expected responses
  const errInternal = {
    message: 'Internal Server Error',
  };
  const errUnauthorized = {
    message: 'Signature not verified',
  };

  const errMissingParams = {
    message: 'Missing parameter: `code_verifier`',
  };

  const responseRegisterAccess = {
    accessToken: expect.any(String),
    accessTokenExpiresAt: expect.any(String),
    fcmToken: expect.any(String),
    refreshToken: expect.any(String),
    refreshTokenExpiresAt: expect.any(String),
    userId: expect.any(String),
    walletId: expect.any(String),
  };

  beforeAll(async () => {
    // Generate code verifier from library
    const codeVerifier = await ProofKey.codeVerifierGenerator();
    // Set SDK Config
    new PillarSdk({
      privateKey,
      apiUrl: 'http://localhost:8080',
    });
    // Generate Register unique Id
    uuid = uuidV4();

    // If env is test use HTTP server mocking library, else use localhost
    if (env === 'test') {
      const mockApi = nock('http://localhost:8080');
      mockApi
        .post('/register/keys', { publicKey, uuid })
        .reply(200, {
          expiresAt: '2015-03-21T05:41:32Z',
          nonce: 'AxCDF23232',
        })
        .post('/register/auth')
        .reply(200, {
          authorizationCode: 'Authorisation code',
          expiresAt: '2011-06-14T04:12:36Z',
        })
        .post(
          '/register/access',
          (body: { codeVerifier: string; uuid: string }) => {
            return body.codeVerifier === '' || body.uuid === '';
          },
        )
        .reply(400, errMissingParams)
        .post('/register/access')
        .reply(500, errInternal)
        .post('/register/access')
        .reply(401, errUnauthorized)
        .post('/register/access')
        .reply(200, {
          accessToken: 'myAccessToken',
          accessTokenExpiresAt: '2016-07-12T23:34:21Z',
          refreshToken: 'myRefreshToken',
          refreshTokenExpiresAt: '2016-07-12T23:34:21Z',
          fcmToken: 'fcmToken',
          userId: 'userId',
          walletId: 'walletId',
        });
    }

    const registerKeysResponse = await Register.registerKeys(publicKey, uuid);
    // Use nonce for future requests
    nonce = registerKeysResponse.data.nonce;

    // registerAuth Parameters
    const registerAuthData = {
      codeChallenge: ProofKey.codeChallengeGenerator(codeVerifier.toString()),
      ethAddress,
      fcmToken: 'OneFcmToken',
      username,
      uuid,
      nonce,
    };

    const registerAuthResponse = await Register.registerAuth(
      registerAuthData,
      privateKey,
    );
    // Use authorizationCode for future requests
    authorizationCode = registerAuthResponse.data.authorizationCode;

    data = {
      codeVerifier: codeVerifier.toString(),
      uuid,
      authorizationCode,
    };
  });

  afterAll(() => {
    jest.restoreAllMocks();
    if (env === 'test') {
      nock.cleanAll();
    }
  });

  it('should return 400 error due to missing params', async () => {
    const regAccessData = { ...data };
    regAccessData.codeVerifier = '';
    try {
      await Register.registerAccess(regAccessData, privateKey);
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual(errMissingParams.message);
    }
  });

  if (env === 'test') {
    it('should return 500 due internal server error', async () => {
      const regAccessData = { ...data };
      delete regAccessData.authorizationCode;

      try {
        await Register.registerAccess(regAccessData, privateKey);
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data.message).toEqual(errInternal.message);
      }
    });
  }

  it('expects to return unauthorised due to invalid signature', async () => {
    const regAccessData = { ...data };
    delete regAccessData.authorizationCode;
    try {
      await Register.registerAccess(regAccessData, privateKey);
    } catch (error) {
      expect(error.response.status).toEqual(401);
      expect(error.response.data.message).toEqual(errUnauthorized.message);
    }
  });

  it('expects response to resolve with data and status code 200', async () => {
    const response = await Register.registerAccess(data, privateKey);
    expect(response.status).toEqual(200);
    expect(response.data).toEqual(responseRegisterAccess);
  });
});
