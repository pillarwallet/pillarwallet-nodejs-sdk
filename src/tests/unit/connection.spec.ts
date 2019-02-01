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

describe('Connection Class', () => {
  const requesterExecuteSpy: any = jest
    .spyOn(Requester, 'execute')
    .mockImplementation(() => {});
  let pSdk: PillarSdk;
  const accessToken = 'myAccessToken';

  jest.spyOn(Configuration.prototype, 'executeRequest');

  beforeEach(() => {
    pSdk = new PillarSdk({
      privateKey:
        'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
    });
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
    it('should successfully call with valid data', () => {
      const connectionInviteData = {
        targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        accessKey: 'abc123',
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.connection.invite(connectionInviteData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        data: connectionInviteData,
        url: 'https://localhost:8080/connection/invite',
      });
    });

    it(
      'when accessToken is set, should successfully call' +
        ' with valid data with Authorization header',
      () => {
        Configuration.setAuthTokens(accessToken, '');
        const connectionInviteData = {
          targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
          accessKey: 'abc123',
          walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        };

        pSdk.connection.invite(connectionInviteData);

        expect(Requester.execute).toHaveBeenCalledWith({
          ...postConfiguration,
          headers: { Authorization: 'Bearer myAccessToken' },
          data: connectionInviteData,
          url: 'https://localhost:8080/connection/invite',
        });
      },
    );
  });

  /**
   * Connection: Accept method
   */
  describe('.accept', () => {
    it('should successfully call with valid data', () => {
      const connectionAcceptData = {
        targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        sourceUserAccessKey: 'hello',
        targetUserAccessKey: 'hello',
      };

      pSdk.connection.accept(connectionAcceptData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        data: connectionAcceptData,
        url: 'https://localhost:8080/connection/accept',
      });
    });

    it(
      'when accessToken is set, should successfully call' +
        ' with valid data with Authorization header',
      () => {
        Configuration.setAuthTokens(accessToken, '');
        const connectionAcceptData = {
          targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
          walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
          sourceUserAccessKey: 'hello',
          targetUserAccessKey: 'hello',
        };

        pSdk.connection.accept(connectionAcceptData);

        expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
        expect(Requester.execute).toHaveBeenCalledWith({
          ...postConfiguration,
          headers: { Authorization: 'Bearer myAccessToken' },
          data: connectionAcceptData,
          url: 'https://localhost:8080/connection/accept',
        });
      },
    );
  });

  /**
   * Connection: Reject method
   */
  describe('.reject', () => {
    it('should successfully call with valid data', () => {
      const connectionRejectData = {
        targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        accessKey: '123abc',
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.connection.reject(connectionRejectData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        data: connectionRejectData,
        url: 'https://localhost:8080/connection/reject',
      });
    });

    it(
      'when accessToken is set, should successfully call' +
        ' with valid data with Authorization header',
      () => {
        Configuration.setAuthTokens(accessToken, '');
        const connectionRejectData = {
          targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
          accessKey: '123abc',
          walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        };

        pSdk.connection.reject(connectionRejectData);

        expect(Requester.execute).toHaveBeenCalledWith({
          ...postConfiguration,
          headers: { Authorization: 'Bearer myAccessToken' },
          data: connectionRejectData,
          url: 'https://localhost:8080/connection/reject',
        });
      },
    );
  });

  /**
   * Connection: Cancel method
   */
  describe('.cancel', () => {
    it('should successfully call with valid data', () => {
      const connectionCancelData = {
        targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        accessKey: '123abc',
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.connection.cancel(connectionCancelData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        data: connectionCancelData,
        url: 'https://localhost:8080/connection/cancel',
      });
    });

    it(
      'when accessToken is set, should successfully call' +
        ' with valid data with Authorization header',
      () => {
        Configuration.setAuthTokens(accessToken, '');
        const connectionCancelData = {
          targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
          accessKey: '123abc',
          walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        };

        pSdk.connection.cancel(connectionCancelData);

        expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
        expect(Requester.execute).toHaveBeenCalledWith({
          ...postConfiguration,
          headers: { Authorization: 'Bearer myAccessToken' },
          data: connectionCancelData,
          url: 'https://localhost:8080/connection/cancel',
        });
      },
    );
  });

  /**
   * Connection: Block method
   */
  describe('.block', () => {
    it('should successfully call with valid data', () => {
      const connectionBlockData = {
        accessKey: '123abc',
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        targetUserId: '8cc06db4-ec05-11e8-8eb2-f2801f1b9fd1',
        block: true,
      };

      pSdk.connection.block(connectionBlockData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        data: connectionBlockData,
        url: 'https://localhost:8080/connection/block',
      });
    });

    it(
      'when accessToken is set, should successfully call' +
        ' with valid data with Authorization header',
      () => {
        Configuration.setAuthTokens(accessToken, '');
        const connectionBlockData = {
          accessKey: '123abc',
          walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
          targetUserId: '8cc06db4-ec05-11e8-8eb2-f2801f1b9fd1',
          block: true,
        };

        pSdk.connection.block(connectionBlockData);

        expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
        expect(Requester.execute).toHaveBeenCalledWith({
          ...postConfiguration,
          headers: { Authorization: 'Bearer myAccessToken' },
          data: connectionBlockData,
          url: 'https://localhost:8080/connection/block',
        });
      },
    );
  });

  /**
   * Connection: Mute method
   */
  describe('.mute', () => {
    it('should successfully call with valid data', () => {
      const connectionMuteData = {
        accessKey: '123abc',
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        targetUserId: '8cc06db4-ec05-11e8-8eb2-f2801f1b9fd1',
        mute: true,
      };

      pSdk.connection.mute(connectionMuteData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        data: connectionMuteData,
        url: 'https://localhost:8080/connection/mute',
      });
    });

    it(
      'when accessToken is set, should successfully call' +
        ' with valid data with Authorization header',
      () => {
        Configuration.setAuthTokens(accessToken, '');
        const connectionMuteData = {
          accessKey: '123abc',
          walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
          targetUserId: '8cc06db4-ec05-11e8-8eb2-f2801f1b9fd1',
          mute: true,
        };

        pSdk.connection.mute(connectionMuteData);

        expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
        expect(Requester.execute).toHaveBeenCalledWith({
          ...postConfiguration,
          headers: { Authorization: 'Bearer myAccessToken' },
          data: connectionMuteData,
          url: 'https://localhost:8080/connection/mute',
        });
      },
    );
  });

  /**
   * Connection: Disconnect method
   */
  describe('.disconnect', () => {
    it('should successfully call with valid data', () => {
      const connectionDisconnectData = {
        targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        sourceUserAccessKey: 'abc123',
        targetUserAccessKey: 'abc124',
        walletId: '8cc06db4-ec05-11e8-8eb2-f2801f1b9fd1',
      };

      pSdk.connection.disconnect(connectionDisconnectData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        data: connectionDisconnectData,
        url: 'https://localhost:8080/connection/disconnect',
      });
    });

    it(
      'when accessToken is set, should successfully call' +
        ' with valid data with Authorization header',
      () => {
        Configuration.setAuthTokens(accessToken, '');
        const connectionDisconnectData = {
          targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
          sourceUserAccessKey: 'abc123',
          targetUserAccessKey: 'abc124',
          walletId: '8cc06db4-ec05-11e8-8eb2-f2801f1b9fd1',
        };

        pSdk.connection.disconnect(connectionDisconnectData);

        expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
        expect(Requester.execute).toHaveBeenCalledWith({
          ...postConfiguration,
          headers: { Authorization: 'Bearer myAccessToken' },
          data: connectionDisconnectData,
          url: 'https://localhost:8080/connection/disconnect',
        });
      },
    );
  });
});
