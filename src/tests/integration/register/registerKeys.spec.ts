/*
Copyright (C) 2021 Stiftung Pillar Project

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
const env = process.env.NODE_ENV;

import { Register } from '../../../lib/register';
import { PillarSdk } from '../../../index';
import * as nock from 'nock';
import { v4 as uuidV4 } from 'uuid';

const keys = require('../../utils/generateKeyPair');

describe('registerKeys method', () => {
  // Keypair generation
  const publicKey = keys.publicKey;
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
    message: 'Duplicate UUID',
  };
  // variable for Universally unique identifier
  let uuid: string;

  beforeAll(() => {
    new PillarSdk({});
    uuid = uuidV4();
    if (env === 'test') {
      const mockApi = nock('https://localhost:8080');
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
        .reply(400, errConflictUuid);
    }
  });

  afterAll(() => {
    jest.restoreAllMocks();
    if (env === 'test') {
      nock.cleanAll();
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
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual(errConflictUuid.message);
    }
  });
});
