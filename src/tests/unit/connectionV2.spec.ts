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
    pSdk.configuration.setRequestTimeout(300);
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
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.connectionV2.invite(connectionInviteData);

      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        data: connectionInviteData,
        url: 'https://localhost:8080/connection/v2/invite',
        timeout: 300,
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
      };

      pSdk.connectionV2.accept(connectionAcceptData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        data: connectionAcceptData,
        url: 'https://localhost:8080/connection/v2/accept',
        timeout: 300,
      });
    });
  });

  /**
   * Connection: Reject method
   */
  describe('.reject', () => {
    it('should successfully call with valid data and Authorization header', () => {
      Configuration.setAuthTokens(accessToken, '');
      const connectionRejectData = {
        targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.connectionV2.reject(connectionRejectData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        data: connectionRejectData,
        url: 'https://localhost:8080/connection/v2/reject',
        timeout: 300,
      });
    });
  });

  /**
   * Connection: Cancel method
   */
  describe('.cancel', () => {
    it('should successfully call with valid data and Authorization header', () => {
      Configuration.setAuthTokens(accessToken, '');
      const connectionCancelData = {
        targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.connectionV2.cancel(connectionCancelData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        data: connectionCancelData,
        url: 'https://localhost:8080/connection/v2/cancel',
        timeout: 300,
      });
    });
  });

  /**
   * Connection: Mute method
   */
  describe('.mute', () => {
    it('should successfully call with valid data and Authorization header', () => {
      Configuration.setAuthTokens(accessToken, '');
      const connectionMuteData = {
        targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        mute: true,
      };

      pSdk.connectionV2.mute(connectionMuteData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        data: connectionMuteData,
        url: 'https://localhost:8080/connection/v2/mute',
        timeout: 300,
      });
    });
  });

  /**
   * Connection: Block method
   */
  describe('.block', () => {
    it('should successfully call with valid data and Authorization header', () => {
      Configuration.setAuthTokens(accessToken, '');
      const connectionBlockData = {
        targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        block: true,
      };

      pSdk.connectionV2.block(connectionBlockData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        data: connectionBlockData,
        url: 'https://localhost:8080/connection/v2/block',
        timeout: 300,
      });
    });
  });

  /**
   * Connection: Blacklist method
   */
  describe('.blacklist', () => {
    it('should successfully call with valid data and Authorization header', () => {
      Configuration.setAuthTokens(accessToken, '');
      const connectionBlacklistData = {
        targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        blacklist: true,
      };

      pSdk.connectionV2.blacklist(connectionBlacklistData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        data: connectionBlacklistData,
        url: 'https://localhost:8080/connection/v2/blacklist',
        timeout: 300,
      });
    });
  });

  /**
   * Connection: Disconnect method
   */
  describe('.disconnect', () => {
    it('should successfully call with valid data and Authorization header', () => {
      Configuration.setAuthTokens(accessToken, '');
      const connectionDisconnectData = {
        targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.connectionV2.disconnect(connectionDisconnectData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        data: connectionDisconnectData,
        url: 'https://localhost:8080/connection/v2/disconnect',
        timeout: 300,
      });
    });
  });

    /**
   * Connection: List method
   */
  describe('.list', () => {
    it('should successfully call with valid data and Authorization header', () => {
      Configuration.setAuthTokens(accessToken, '');
      const connectionDisconnectData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.connectionV2.list(connectionDisconnectData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        params: connectionDisconnectData,
        url: 'https://localhost:8080/connection/v2/list',
        timeout: 300,
      });
    });
  });
});
