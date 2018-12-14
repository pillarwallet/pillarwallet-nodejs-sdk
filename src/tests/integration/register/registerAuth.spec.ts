// tslint:disable: object-shorthand-properties-first
import { PillarSdk } from '../../../index';

const env = process.env.NODE_ENV;

import { v4 as uuidV4 } from 'uuid';
import { Register } from '../../../lib/register';
import { ProofKey } from '../../../utils/pkce';

const nock = require('nock');
const keys = require('../../utils/generateKeyPair');

describe('registerAuth method', () => {
  const publicKey = keys.publicKey.toString();
  const privateKey = keys.privateKey.toString();
  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;
  const codeVerifier = ProofKey.codeVerifierGenerator();
  let data: any;
  let uuid: string;
  let nonce: string;

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
    new PillarSdk({
      privateKey,
      apiUrl: 'http://localhost:8080',
    });
    uuid = uuidV4();
    const response = await Register.registerKeys(publicKey, uuid);
    nonce = response.data.nonce;

    if (env === 'test') {
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
    }
  });

  beforeEach(() => {
    data = {
      codeChallenge: ProofKey.codeChallengeGenerator(codeVerifier.toString()),
      ethAddress: keys.ethAddress,
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
