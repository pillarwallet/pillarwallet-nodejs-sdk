import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

describe('Connection Class', () => {
  const requesterExecuteSpy: any = jest.spyOn(Requester, 'execute');
  let pSdk: PillarSdk;

  beforeEach(() => {
    pSdk = new PillarSdk({
      privateKey:
        'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
    });
  });

  afterEach(() => {
    requesterExecuteSpy.mockClear();
  });

  /**
   * Connection: Invite method
   */
  describe('Invite method', () => {
    it('should successfully call with valid data', () => {
      const connectionInviteData = {
        targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        accessKey: 'abc123',
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.connection.invite(connectionInviteData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { 'X-API-Signature': expect.anything() },
          data: connectionInviteData,
          url: 'http://localhost:8080/connection/invite',
        }),
      );
    });
  });

  /**
   * Connection: Accept method
   */
  describe('Accept method', () => {
    it('should successfully call with valid data', () => {
      const connectionAcceptData = {
        targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        sourceUserAccessKey: 'hello',
        targetUserAccessKey: 'hello',
      };

      pSdk.connection.accept(connectionAcceptData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { 'X-API-Signature': expect.anything() },
          data: connectionAcceptData,
          url: 'http://localhost:8080/connection/accept',
        }),
      );
    });
  });

  /**
   * Connection: Reject method
   */
  describe('Reject method', () => {
    it('should successfully call with valid data', () => {
      const connectionRejectData = {
        targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        accessKey: '123abc',
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.connection.reject(connectionRejectData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { 'X-API-Signature': expect.anything() },
          data: connectionRejectData,
          url: 'http://localhost:8080/connection/reject',
        }),
      );
    });
  });

  /**
   * Connection: Cancel method
   */
  describe('Cancel method', () => {
    it('should successfully call with valid data', () => {
      const connectionCancelData = {
        targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        accessKey: '123abc',
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.connection.cancel(connectionCancelData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { 'X-API-Signature': expect.anything() },
          data: connectionCancelData,
          url: 'http://localhost:8080/connection/cancel',
        }),
      );
    });
  });

  /**
   * Connection: Block method
   */
  describe('Block method', () => {
    it('should successfully call with valid data', () => {
      const connectionBlockData = {
        accessKey: '123abc',
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.connection.block(connectionBlockData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { 'X-API-Signature': expect.anything() },
          data: connectionBlockData,
          url: 'http://localhost:8080/connection/block',
        }),
      );
    });
  });

  /**
   * Connection: Mute method
   */
  describe('Mute method', () => {
    it('should successfully call with valid data', () => {
      const connectionMuteData = {
        accessKey: '123abc',
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.connection.mute(connectionMuteData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { 'X-API-Signature': expect.anything() },
          data: connectionMuteData,
          url: 'http://localhost:8080/connection/mute',
        }),
      );
    });
  });
});
