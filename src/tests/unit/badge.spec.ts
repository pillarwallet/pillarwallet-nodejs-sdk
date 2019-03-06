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
import { default as getConfiguration } from '../../utils/requester-configurations/get';
import { default as postConfiguration } from '../../utils/requester-configurations/post';
import { Requester } from '../../utils/requester';
import { Configuration } from '../../lib/configuration';

describe('Badge Class', () => {
  let pSdk: PillarSdk;

  const requesterExecuteSpy = jest
    .spyOn(Requester, 'execute')
    .mockResolvedValue('');
  const accesToken = 'myAccessToken';

  beforeEach(() => {
    pSdk = new PillarSdk({
      privateKey:
        'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
    });
  });

  afterEach(() => {
    requesterExecuteSpy.mockClear();
    Configuration.setAuthTokens('', '');
  });

  describe('.my', () => {
    it('should successfully call with valid data and Authorization header', () => {
      Configuration.setAuthTokens(accesToken, '');
      const userBadgesData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.badge.my(userBadgesData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        params: userBadgesData,
        url: 'https://localhost:8080/badge/my',
      });
    });

    it('should throw an error if called with invalid data', async () => {
      const userBadgesData = {
        walletId: null,
      };

      try {
        await pSdk.badge.my(userBadgesData);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toEqual('data.walletId should be string');
      }
    });
  });

  describe('.selfAward', () => {
    it('should successfully call with valid data and Authorization header', () => {
      Configuration.setAuthTokens(accesToken, '');
      const selfAwardBadgeData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        event: 'test-event',
      };

      pSdk.badge.selfAward(selfAwardBadgeData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        data: selfAwardBadgeData,
        url: 'https://localhost:8080/badge/self-award',
      });
    });

    it('should throw an error if called with invalid data', async () => {
      const selfAwardBadgeData = {
        walletId: null,
        event: null,
      };

      try {
        await pSdk.badge.selfAward(selfAwardBadgeData);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toEqual(
          'data.walletId should be string, data.event should be string',
        );
      }
    });
  });
});
