import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

beforeEach(() => {
  this.pSdk = new PillarSdk({
    privateKey: 'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
  });
});

/**
 * Connection: Invite method
 */
describe('The Connection Class: Invite method', () => {
  it('should successfully call with valid data', () => {
    const connectionInviteData = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      accessKey: 'abc123',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.connection.invite(connectionInviteData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
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
describe('The Connection Class: Accept method', () => {
  it('should successfully call with valid data', () => {
    const connectionAcceptData = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      sourceUserAccessKey: 'hello',
      targetUserAccessKey: 'hello',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.connection.accept(connectionAcceptData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
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
describe('The Connection Class: Reject method', () => {
  it('should successfully call with valid data', () => {
    const connectionRejectData = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      accessKey: '123abc',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.connection.reject(connectionRejectData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
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
describe('The Connection Class: Cancel method', () => {
  it('should successfully call with valid data', () => {
    const connectionCancelData = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      accessKey: '123abc',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.connection.cancel(connectionCancelData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
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
describe('The Connection Class: Block method', () => {
  it('should successfully call with valid data', () => {
    const connectionBlockData = {
      accessKey: '123abc',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.connection.block(connectionBlockData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
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
describe('The Connection Class: Mute method', () => {
  it('should successfully call with valid data', () => {
    const connectionMuteData = {
      accessKey: '123abc',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.connection.mute(connectionMuteData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          data: connectionMuteData,
          url: 'http://localhost:8080/connection/mute',
        }),
    );
  });
});
