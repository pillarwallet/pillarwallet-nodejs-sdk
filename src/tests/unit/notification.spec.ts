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
import { PillarSdk } from '../..';
import { Requester } from '../../utils/requester';
import { Configuration } from '../../lib/configuration';
import { default as getConfiguration } from '../../utils/requester-configurations/get';

describe('Notification Class', () => {
  const spy = jest.spyOn(Requester, 'execute');
  let pSdk: PillarSdk;
  const accessToken = 'myAccessToken';

  jest.spyOn(Configuration.prototype, 'executeRequest');

  spy.mockImplementation(() => {});

  beforeEach(() => {
    pSdk = new PillarSdk({});
  });

  afterEach(() => {
    Configuration.setAuthTokens('', '');
    Configuration.prototype.executeRequest.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('.list', () => {
    it('should successfully call with valid data and Authorization header', () => {
      const notificationData = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
        fromTimestamp: '2016-05-24T15:54:14.876Z',
        type: 'message',
      };

      Configuration.setAuthTokens(accessToken, '');

      pSdk.notification.list(notificationData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        params: notificationData,
        url: 'http://localhost:8081/notification/list',
      });
    });

    it('validates data', async () => {
      expect.assertions(2);

      try {
        await pSdk.notification.list({});
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toBe("data should have required property 'walletId'");
      }
    });
  });
});
