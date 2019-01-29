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
import { Register } from '../../lib/register';
import { v4 as uuidV4 } from 'uuid';
import { PillarSdk } from '../../index';
import { ProofKey } from '../../utils/pkce';

const keys = require('../utils/generateKeyPair');

// TODO: TECHNICAL DEPT!! Create a configurable way to use or one Mock for api (e.g. nock library)
// TODO: or the real api that is currently being used.

/**
 * It's not possible to run these tests independently
 * Skip these for now and update as part of the OAuth tidy up work
 */
describe.skip('Register Tests with real Api', () => {
  const publicKey = keys.publicKey.toString();
  const privateKey = keys.privateKey.toString();
  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;
  let uuid;

  beforeAll(() => {
    new PillarSdk({
      privateKey,
      apiUrl: 'http://localhost:8080',
    });
  });

  beforeEach(() => {
    uuid = uuidV4();
  });

  describe('registerKeys method', () => {
    let nonce: any;
    let authorizationCode: any;
    const codeVerifier = '48vt2vE0U09f7Oao9-P-HlrUycEZeo35ubZa0ppIasI';

    let response: any;

    beforeEach(async () => {
      response = await Register.registerKeys(publicKey, uuid);
      nonce = response.data.nonce;
    });

    it('expects method registerKeys to return nonce and its expiration datetime', async () => {
      expect(response.data).toEqual({
        expiresAt: expect.any(String),
        nonce: expect.any(String),
      });
    });

    it('expects method registerAuth to return authorization and its expiration datetime', async () => {
      const data = {
        codeChallenge: ProofKey.codeChallengeGenerator(codeVerifier.toString()),
        ethAddress: keys.ethAddress,
        fcmToken: 'OneFcmToken',
        username,
        uuid,
        nonce,
      };
      const responseAuth = await Register.registerAuth(data, privateKey);
      authorizationCode = responseAuth.data.authorizationCode;
      expect(responseAuth.data).toEqual({
        expiresAt: expect.any(String),
        authorizationCode: expect.any(String),
      });
    });

    it('expects method registerAccess to return access Token', async () => {
      const dataAccess = {
        codeVerifier,
        uuid,
        authorizationCode,
      };
      const responseAccess = await Register.registerAccess(
        dataAccess,
        privateKey,
      );
      expect(responseAccess.data).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        accessTokenExpiresAt: expect.any(String),
        refreshTokenExpiresAt: expect.any(String),
        fcmToken: expect.any(String),
        userId: expect.any(String),
        walletId: expect.any(String),
      });
    });
  });
});
