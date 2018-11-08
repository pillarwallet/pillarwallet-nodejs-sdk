import nock = require('nock');
import { PillarSdk } from '../..';

const keys = require('../utils/generateKeyPair');

const responseRegisterKey = {
  nonce: '3yy1uy3u13yu1y3uy3',
  expiresAt: '01.01.2019',
};

const responseRegisterAuth = {
  authorizationCode: 'Authorisation code',
  expiresAt: 'YYYY-mm-ddTHH:MM:ssZ',
};

const responseRegisterAccess = {
    accessToken: "string",
    accessTokenExpiresAt: "YYYY-mm-ddTHH:MM:ssZ",
    fcmToken: "string",
    refreshToken: "string",
    refreshTokenExpiresAt: "YYYY-mm-ddTHH:MM:ssZ",
    userId: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    walletId: "d290f1ee-6c54-4b01-90e6-d701748f0851"
};

nock('http://localhost:8080')
  .post('/register/keys')
  .reply(200, responseRegisterKey);

nock('http://localhost:8080')
  .post('/register/auth')
  .reply(200, responseRegisterAuth);

nock('http://localhost:8080')
  .post('/register/access')
  .reply(200, responseRegisterAccess);

describe('POST /register/keys', () => {
  let pSdk: PillarSdk;
  let walletRegister = {};
  let walletAccess = {};

  beforeEach(() => {
    walletRegister = {
      privateKey: keys.privateKey,
      publicKey: keys.publicKey,
      fcmToken: '987qwe',
      username: 'sdfsdfs',
    };
  });

  walletRegister = {
    privateKey: keys.privateKey,
    publicKey: keys.publicKey,
    fcmToken: '987qwe',
    username: 'sdfsdfs',
  };

  pSdk = new PillarSdk({
    apiUrl: 'http://localhost:8080',
    privateKey: keys.privateKey,
  });

  it('Responds with expected /register/auth JSON', async () => {
    const response = await pSdk.wallet.registerAuthServer(walletRegister);
    expect(response.data).toEqual(responseRegisterAuth);
  });

  it('Should thrown error if request goes wrong', async () => {
    expect.assertions(1);
    nock('http://localhost:8080')
      .post('/register/keys')
      .reply(500, { message: 'Internal server error' });
    try {
      await pSdk.wallet.registerAuthServer(walletRegister);
    } catch (error) {
      expect(error.message).toEqual('Request failed with status code 500');
    }
  });
});

describe('POST /register/access', () => {
  let pSdk: PillarSdk;
  let walletAccess = {};

  beforeEach(() => {
    walletAccess = {
      privateKey: keys.privateKey,
      codeVerifier: "Code verifier",
      uuid: "d290f1ee-6c54-4b01-90e6-d701748f0851"
    }
  });

  pSdk = new PillarSdk({
    apiUrl: 'http://localhost:8080',
    privateKey: keys.privateKey,
  });

  it('Responds with expected /register/access JSON', async () => {
    const response = await pSdk.wallet.registerAccessServer(walletAccess);
    expect(response.data).toEqual(responseRegisterAccess);
  });

  it('Should thrown error if request goes wrong', async () => {
    expect.assertions(1);
    nock('http://localhost:8080')
      .post('/register/access')
      .reply(500, { message: 'Internal server error' });
    try {
      await pSdk.wallet.registerAccessServer(walletAccess);
    } catch (error) {
      expect(error.message).toEqual('Request failed with status code 500');
    }
  });
});
