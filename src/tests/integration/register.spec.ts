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

nock('http://localhost:8080')
  .post('/register/keys')
  .reply(200, responseRegisterKey);

nock('http://localhost:8080')
  .post('/register/auth')
  .reply(200, responseRegisterAuth);

describe('POST /register/key', () => {
  let pSdk: PillarSdk;
  let walletRegister = {};
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
