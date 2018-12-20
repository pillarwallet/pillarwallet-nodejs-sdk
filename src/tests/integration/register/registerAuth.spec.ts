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
      apiUrl: 'http://localhost:8080',
      notificationsUrl: 'http://localhost:8081',
      investmentsUrl: 'http://localhost:8082',
    });
    // Generate Register unique Id
    uuid = uuidV4();

    // If env is test use HTTP server mocking library, else use localhost
    if (env === 'test') {
      nonce = 'anyNonce';
      const mockApi = nock('http://localhost:8080');
      mockApi
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
    } else {
      const response = await Register.registerKeys(publicKey, uuid);
      // Use nonce for future requests
      nonce = response.data.nonce;
    }
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
      nock.isDone();
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
