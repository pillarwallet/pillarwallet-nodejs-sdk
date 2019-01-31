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

describe('registerAuth method', () => {
  // Key pairs
  const publicKey = keys.publicKey.toString();
  const privateKey = keys.privateKey.toString();
  const ethAddress = keys.ethAddress.toString();
  // Generate random username
  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;
  // Generate code verifier from library
  const codeVerifier = ProofKey.codeVerifierGenerator();
  // Variables
  let data: any;
  let uuid: string;
  let nonce: string;
  // Expected responses
  const errMissingParams = {
    message:
      'data.username should NOT be shorter than 4 characters, data.username should pass "regexp" keyword validation',
  };
  const errInternal = {
    message: 'Internal Server Error',
  };
  const errUnauthorized = {
    message: 'Signature not verified',
  };
  const responseRegisterAuth = {
    authorizationCode: expect.any(String),
    expiresAt: expect.any(String),
  };

  beforeAll(async () => {
    // Set SDK Config
    new PillarSdk({
      privateKey,
      apiUrl: 'https://localhost:8080',
    });
    // Generate Register unique Id
    uuid = uuidV4();

    // If env is test use HTTP server mocking library, else use localhost
    if (env === 'test') {
      const mockApi = nock('https://localhost:8080');
      mockApi
        .post('/register/keys', { publicKey, uuid })
        .reply(200, {
          expiresAt: '2015-03-21T05:41:32Z',
          nonce: 'AxCDF23232',
        })
        .post(
          '/register/auth',
          (body: {
            codeChallenge: string;
            ethAddress: string;
            fcmToken: string;
            username: string;
            uuid: string;
          }) => {
            return (
              body.uuid === '' ||
              body.codeChallenge === '' ||
              body.ethAddress === '' ||
              body.fcmToken === '' ||
              body.username === ''
            );
          },
        )
        .reply(400, errMissingParams)
        .post('/register/auth')
        .reply(500, errInternal)
        .post('/register/auth')
        .reply(401, errUnauthorized)
        .post('/register/auth')
        .reply(200, {
          authorizationCode: 'Authorisation code',
          expiresAt: '2011-06-14T04:12:36Z',
        });
    }
    const response = await Register.registerKeys(publicKey, uuid);
    // Use nonce for future requests
    nonce = response.data.nonce;

    // registerAuth Parameters
    data = {
      codeChallenge: ProofKey.codeChallengeGenerator(codeVerifier.toString()),
      ethAddress,
      fcmToken: 'OneFcmToken',
      username,
      uuid,
      nonce,
    };
  });

  afterAll(() => {
    jest.restoreAllMocks();
    if (env === 'test') {
      nock.cleanAll();
    }
  });

  it('should return 400 due missing params', async () => {
    expect.assertions(2);
    const regAuthData = { ...data };
    // empty username
    regAuthData.username = '';
    try {
      await Register.registerAuth(regAuthData, privateKey); // empty username
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual(errMissingParams.message);
    }
  });

  if (env === 'test') {
    it('should return 500 internal server error', async () => {
      expect.assertions(2);
      const regAuthData = { ...data };
      try {
        await Register.registerAuth(regAuthData, privateKey);
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data).toEqual(errInternal);
      }
    });
  }

  it('expects to return unauthorised due to invalid signature', async () => {
    expect.assertions(2);
    const regAuthData = { ...data };
    delete regAuthData.nonce;
    try {
      await Register.registerAuth(regAuthData, privateKey);
    } catch (error) {
      expect(error.response.status).toEqual(401);
      expect(error.response.data.message).toEqual(errUnauthorized.message);
    }
  });

  it('expects response to resolve with data and status code 200', async () => {
    const regAuthData = { ...data };
    const response = await Register.registerAuth(regAuthData, privateKey);
    expect(response.status).toEqual(200);
    expect(response.data).toEqual(responseRegisterAuth);
  });
});
