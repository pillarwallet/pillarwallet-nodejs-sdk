// tslint:disable: object-shorthand-properties-first
import { Register } from '../../lib/register';
import { v4 as uuid } from 'uuid';
import { PillarSdk } from '../../index';
import { ProofKey } from '../../utils/pkce';

const keys = require('../utils/generateKeyPair');

// TODO: TECHNICAL DEPT!! Create a configurable way to use or one Mock for api (e.g. nock library)
// TODO: or the real api that is currently being used.

describe('Register Tests with real Api', () => {
  const publicKey = keys.publicKey.toString();
  const privateKey = keys.privateKey.toString();
  const uuIdv4 = uuid();
  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;

  beforeAll(() => {
    new PillarSdk({
      privateKey,
      apiUrl: 'http://localhost:8080',
    });
  });

  describe('registerKeys method', () => {
    const uuid = uuIdv4;
    let nonce: any;
    let authorizationCode: any;
    const codeVerifier = '48vt2vE0U09f7Oao9-P-HlrUycEZeo35ubZa0ppIasI';

    let response: any;

    beforeAll(async () => {
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
