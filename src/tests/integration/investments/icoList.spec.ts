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
const env = process.env.NODE_ENV;
import * as nock from 'nock';
import { PillarSdk } from '../../../index';

describe('The Investment Class', () => {
  let pSdk: PillarSdk;

  const responseData = {
    result: 'success',
    data: [],
  };

  beforeEach(() => {
    pSdk = new PillarSdk({});

    if (env === 'test') {
      const mockApi = nock('http://localhost:8082');
      mockApi
        .get('/users/56b540e9-927a-4ced-a1be-61b059f33f2b/icos')
        .reply(200, responseData);
    }
  });

  afterAll(() => {
    jest.restoreAllMocks();
    if (env === 'test') {
      nock.cleanAll();
    }
  });

  describe('icoList method', () => {
    it('should return 200 with data Array', async () => {
      const inputParams = {
        userId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      };

      const res = await pSdk.investments.icoList(inputParams);

      expect(res.status).toBe(200);
      expect(res.data).toHaveProperty('result', 'success');
      expect(res.data.data).toBeInstanceOf(Array);
    });
  });
});
