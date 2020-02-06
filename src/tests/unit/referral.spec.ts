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
import { default as getConfiguration } from '../../utils/requester-configurations/get';
import { Configuration } from '../../lib/configuration';
import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

describe('Referral Class', () => {
  const requesterExecuteSpy: any = jest
    .spyOn(Requester, 'execute')
    .mockImplementation(() => {});
  let pSdk: PillarSdk;
  const accessToken = 'myAccessToken';

  jest.spyOn(Configuration.prototype, 'executeRequest');

  beforeEach(() => {
    pSdk = new PillarSdk({});
    pSdk.setRequestTimeout(300);
    Configuration.setAuthTokens(accessToken, '');
  });

  afterEach(() => {
    Configuration.setAuthTokens('', '');
    requesterExecuteSpy.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('.list', () => {
    it('should successfully call with valid data and Authorization header', () => {
      const referralListData = {
        walletId: 'abc-123',
      };

      pSdk.referral.list(referralListData);

      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        params: referralListData,
        url: 'https://localhost:8080/referral/list',
        timeout: 300,
      });
    });

    it('should throw an error if called with invalid data', async () => {
      const referralListData = {
        walletId: null,
      };

      try {
        await pSdk.referral.list(referralListData);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toEqual('data.walletId should be string');
      }
    });
  });
});
