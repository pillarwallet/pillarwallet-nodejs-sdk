const env = process.env.NODE_ENV;

import { Register } from '../../../lib/register';
import { PillarSdk } from '../../../index';
import nock = require('nock');
import { v4 as uuidV4 } from 'uuid';

const keys = require('../../utils/generateKeyPair');

describe('registerKeys method', () => {
  // Keypair generation
  const publicKey = keys.publicKey;
  const privateKey = keys.privateKey;
  // Responses
  const regKeysResponse = {
    expiresAt: expect.any(String),
    nonce: expect.any(String),
  };
  const errMissingParams = {
    message: 'data.publicKey should match pattern "[a-fA-F0-9]{128}$"',
  };
  const errInternal = {
    message: 'Internal Server Error',
  };
  const errConflictUuid = {
    message: 'A valid nonce exists for this registration',
  };
  // variable for Universally unique identifier
  let uuid: string;

  beforeAll(() => {
    new PillarSdk({
      apiUrl: 'http://localhost:8080',
      notificationsUrl: 'http://localhost:8081',
      investmentsUrl: 'http://localhost:8082',
    });
    uuid = uuidV4();
    if (env === 'test') {
      const mockApi = nock('http://localhost:8080');
      mockApi
        .post('/register/keys', (body: { publicKey: string; uuid: string }) => {
          return body.publicKey === '' || body.uuid === '';
        })
        .reply(400, errMissingParams)
        .post('/register/keys')
        .reply(500, errInternal)
        .post('/register/keys', { publicKey, uuid })
        .reply(200, {
          expiresAt: '2015-03-21T05:41:32Z',
          nonce: 'AxCDF23232',
        })
        .post('/register/keys', { publicKey, uuid })
        .reply(409, errConflictUuid);
    }
  });

  afterAll(() => {
    jest.restoreAllMocks();
    if (env === 'test') {
      nock.isDone();
    }
  });

  it('should return 400 due missing params', async () => {
    expect.assertions(2);

    try {
      await Register.registerKeys('', uuid); // empty publicKey
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual(errMissingParams.message);
    }
  });
  if (env === 'test') {
    it('should return 500 due internal server error', async () => {
      expect.assertions(2);

      try {
        await Register.registerKeys(publicKey, uuid);
      } catch (error) {
        expect(error.response.status).toEqual(500);
        expect(error.response.data.message).toEqual(errInternal.message);
      }
    });
  }

  it('expects response to resolve with data and status code 200', async () => {
    const response = await Register.registerKeys(publicKey, uuid);
    expect(response.status).toEqual(200);
    expect(response.data).toEqual(regKeysResponse);
  });

  it('expects conflict error when one `uuid` is used in multiple registrations', async () => {
    try {
      await Register.registerKeys(publicKey, uuid);
    } catch (error) {
      expect(error.response.status).toEqual(409);
      expect(error.response.data.message).toEqual(errConflictUuid.message);
    }
  });
});
