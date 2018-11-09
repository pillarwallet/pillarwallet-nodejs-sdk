import nock = require('nock');
import { PillarSdk } from '../..';

const keys = require('../utils/generateKeyPair');

const responseRegisterKey = {
  nonce: '3yy1uy3u13yu1y3uy3',
  expiresAt: '2011-06-14T04:12:36Z',
};

const responseRegisterAuth = {
  authorizationCode: 'Authorisation code',
  expiresAt: '2011-06-14T04:12:36Z',
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

describe('POST RegisterAuthServer', () => {
  const pSdk = new PillarSdk({
    apiUrl: 'http://localhost:8080',
    privateKey: keys.privateKey,
  });
  let walletRegister = {};
  beforeEach(() => {
    walletRegister = {
      privateKey: keys.privateKey,
      publicKey: keys.publicKey,
      ethAddress: '0x0000000000000000000000000000000000000000',
      fcmToken: '987qwe',
      username: 'sdfsdfs',
    };
  });

  it('Responds with a nonce and expiry date /register/auth JSON', async () => {
    const response = await pSdk.wallet.registerAuthServer(walletRegister);
    expect(response.data).toEqual(responseRegisterAccess);
  });

  it('Throws an error if request goes wrong', async () => {
    expect.assertions(1);
    nock('http://localhost:8080')
      .post('/register/keys')
      .reply(500, 'Internal server error');
    try {
      await pSdk.wallet.registerAuthServer(walletRegister);
    } catch (error) {
      expect(error.message).toEqual('Request failed with status code 500');
    };
  });
});
