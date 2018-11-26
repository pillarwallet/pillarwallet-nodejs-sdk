import { default as postConfiguration } from '../../utils/requester-configurations/post';
import { Configuration } from '../../lib/configuration';
import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

describe('Connection Class', () => {
  const requesterExecuteSpy: any = jest
    .spyOn(Requester, 'execute')
    .mockImplementation(() => {});
  let pSdk: PillarSdk;

  jest.spyOn(Configuration.prototype, 'executeRequest');

  beforeEach(() => {
    pSdk = new PillarSdk({
      privateKey:
        'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
    });
  });

  afterEach(() => {
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
        url: 'http://localhost:8080/connection/invite',
      });
    });
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
        url: 'http://localhost:8080/connection/accept',
      });
    });
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
        url: 'http://localhost:8080/connection/reject',
      });
    });
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
        url: 'http://localhost:8080/connection/cancel',
      });
    });
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
        url: 'http://localhost:8080/connection/block',
      });
    });
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
        url: 'http://localhost:8080/connection/mute',
      });
    });
  });

  /**
   * Connection: Disconnect method
   */
  describe('.disconnect', () => {
    it('should successfully call with valid data', () => {
      const connectionDisconnectData = {
        targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        accessKey: 'abc123',
        walletId: '8cc06db4-ec05-11e8-8eb2-f2801f1b9fd1',
      };

      pSdk.connection.disconnect(connectionDisconnectData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        data: connectionDisconnectData,
        url: 'http://localhost:8080/connection/disconnect',
      });
    });
  });
});
