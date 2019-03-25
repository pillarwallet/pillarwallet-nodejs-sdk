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
import { default as postConfiguration } from '../../utils/requester-configurations/post';
import { Configuration } from '../../lib/configuration';
import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

describe('Connection v2 Class', () => {
  const requesterExecuteSpy: any = jest
    .spyOn(Requester, 'execute')
    .mockImplementation(() => {});
  let pSdk: PillarSdk;
  const accessToken = 'myAccessToken';

  jest.spyOn(Configuration.prototype, 'executeRequest');

  beforeEach(() => {
    pSdk = new PillarSdk({});
  });

  afterEach(() => {
    Configuration.setAuthTokens('', '');
    requesterExecuteSpy.mockClear();
    Configuration.prototype.executeRequest.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  /**
   * Connection: Invite method
   */
  describe('.invite', () => {
    it('should successfully call with valid data and Authorization header', () => {
      Configuration.setAuthTokens(accessToken, '');
      const connectionInviteData = {
        targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        sourceIdentityKey: Math.random()
          .toString(36)
          .substring(7),
        targetIdentityKey: Math.random()
          .toString(36)
          .substring(7),
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.connectionV2.invite(connectionInviteData);

      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        data: connectionInviteData,
        url: 'https://localhost:8080/connection/v2/invite',
      });
    });
  });

  /**
   * Connection: Accept method
   */
  describe('.accept', () => {
    it('should successfully call with valid data and Authorization header', () => {
      Configuration.setAuthTokens(accessToken, '');
      const connectionAcceptData = {
        targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        sourceUserIdentityKeys: {
          sourceIdentityKey: Math.random()
            .toString(36)
            .substring(7),
          targetIdentityKey: Math.random()
            .toString(36)
            .substring(7),
        },
        targetUserIdentityKeys: {
          sourceIdentityKey: Math.random()
            .toString(36)
            .substring(7),
          targetIdentityKey: Math.random()
            .toString(36)
            .substring(7),
        },
      };

      pSdk.connectionV2.accept(connectionAcceptData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        data: connectionAcceptData,
        url: 'https://localhost:8080/connection/v2/accept',
      });
    });
  });
});