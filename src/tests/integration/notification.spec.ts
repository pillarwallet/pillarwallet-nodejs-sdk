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
import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

describe('notification endpoints', () => {
  const requesterExecuteSpy: any = jest.spyOn(Requester, 'execute');
  let pSdk: PillarSdk;

  requesterExecuteSpy.mockImplementation(() => Promise.resolve());

  beforeEach(() => {
    pSdk = new PillarSdk({});
  });

  afterEach(() => {
    requesterExecuteSpy.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('Notification list', () => {
    it('Expect success', async () => {
      const inputParams = {
        walletId: '24adad233',
        fromTimestamp: '2016-05-24T15:54:14.876Z',
        type: 'message',
        fetchLatest: true,
      };

      await pSdk.notification.list(inputParams);

      /**
       * TODO: Currently waiting on a development
       * or testing environment before we can asset
       * a correct / expected response. For now, just
       * using a spy to ensure that the request was made.
       */
      expect(requesterExecuteSpy).toHaveBeenCalled();
    });
  });
});
