// tslint:disable: object-shorthand-properties-first
const env = process.env.NODE_ENV;

import { PillarSdk } from '../../../index';
const nock = require('nock');
const keys = require('../../utils/generateKeyPair');

describe('userUsernameSearch method', () => {
  let pSdk: PillarSdk;

  // Generate random username
  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;

  // Expected responses
  const inappropriateUsernameErr = {
    message: 'Inappropriate username',
  };

  const ethAddress = keys.ethAddress.toString();

  const walletParams = {
    username,
    ethAddress,
    fcmToken: 'abc123',
  };

  beforeAll(async () => {
    pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
      privateKey: keys.privateKey,
    });

    if (env === 'test') {
      const mockApi = nock('http://localhost:8080');
      mockApi
        .post('/wallet/register')
        .reply(200)
        .get(`/user/search-username?username=${username}`)
        .reply(200, {
          username,
        })
        .get('/user/search-username?username=invalidUsername')
        .reply(200, {})
        .get('/user/search-username?username=root')
        .reply(400, inappropriateUsernameErr);
    }

    await pSdk.wallet.register(walletParams);
  });

  afterAll(() => {
    jest.restoreAllMocks();
    if (env === 'test') {
      nock.cleanAll();
    }
  });

  it('expects response to resolve with data and status code 200', async () => {
    const response = await pSdk.user.usernameSearch({ username });
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({ username });
  });

  it('expects response to resolve with no data and status code 200', async () => {
    const response = await pSdk.user.usernameSearch({
      username: 'invalidUsername',
    });
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({});
  });

  it('should return 400 error due to inappropriate username', async () => {
    try {
      await pSdk.user.usernameSearch({ username: 'root' });
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual(
        inappropriateUsernameErr.message,
      );
    }
  });
});
