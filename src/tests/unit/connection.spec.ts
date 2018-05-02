import { Connection } from  '../../lib/connection';
import { Requester } from '../../utils/requester';
import { RequestPromise } from 'request-promise';

let connectionSdk = new Connection();

/**
 * Connection: Invite method
 */

describe('The Connection Class: Invite method', () => {
  it ('should successfully call with valid data', () => {
    const connectionInviteData = {
      targetUserId: '2',
      accessKey: 'abc123',
      walletId: '1',
    };

    const privateKey = '3874hkwhjkdwa';

    const spy = jest.spyOn(Requester, 'execute');
    const connectionInvitePromise = connectionSdk.invite(connectionInviteData, privateKey);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const invalidConnectionData = {
      targetUserId: '2',
      accessKey: 'abc123',
    };

    const privateKey = '3874hkwhjkdwa';

    try {
      connectionSdk.invite(invalidConnectionData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid key', () => {
    let errorThrown;
    const invalidConnectionData = {
      targetUserId: '2',
      accessKey: 'abc123',
      walletId: '1',
    };

    const privateKey = null;

    try {
      connectionSdk.invite(invalidConnectionData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});


/**
 * Connection: Accept method
 */

describe('The Connection Class: Accept method', () => {
  it ('should successfully call with valid data', () => {
    const connectionAcceptData = {
      targetUserId: '2',
      walletId: '1',
      sourceUserAccessKey: 'hello',
      targetUserAccessKey: 'hello',
    };

    const privateKey = '3874hkwhjkdwa';

    const spy = jest.spyOn(Requester, 'execute');
    const connectionInvitePromise = connectionSdk.accept(connectionAcceptData, privateKey);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const invalidConnectionData = {
      walletId: '1',
      sourceUserAccessKey: 'hello',
      targetUserAccessKey: 'hello',
    };

    const privateKey = '3874hkwhjkdwa';

    try {
      connectionSdk.accept(invalidConnectionData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid key', () => {
    let errorThrown;
    const invalidConnectionData = {
      targetUserId: '2',
      walletId: '1',
      sourceUserAccessKey: 'hello',
      targetUserAccessKey: 'hello',
    };

    const privateKey = null;

    try {
      connectionSdk.accept(invalidConnectionData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});


/**
 * Connection: Reject method
 */

describe('The Connection Class: Reject method', () => {
  it ('should successfully call with valid data', () => {
    const connectionRejectData = {
      targetUserId: '2',
      accessKey: '123abc',
      walletId: '1',
    };

    const privateKey = '3874hkwhjkdwa';

    const spy = jest.spyOn(Requester, 'execute');
    const connectionInvitePromise = connectionSdk.reject(connectionRejectData, privateKey);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const invalidConnectionData = {
      targetUserId: '2',
      accessKey: '123abc',
      walletId: null,
    };

    const privateKey = '3874hkwhjkdwa';

    try {
      connectionSdk.reject(invalidConnectionData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid key', () => {
    let errorThrown;
    const connectionData = {
      targetUserId: '2',
      accessKey: '123abc',
      walletId: '1',
    };

    const privateKey = null;

    try {
      connectionSdk.reject(connectionData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});


/**
 * Connection: Cancel method
 */

describe('The Connection Class: Cancel method', () => {
  it ('should successfully call with valid data', () => {
    const connectionCancelData = {
      targetUserId: '2',
      accessKey: '123abc',
      walletId: '1',
    };

    const privateKey = '3874hkwhjkdwa';

    const spy = jest.spyOn(Requester, 'execute');
    const connectionInvitePromise = connectionSdk.cancel(connectionCancelData, privateKey);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const invalidConnectionData = {
      targetUserId: '2',
      accessKey: '123abc',
      walletId: null,
    };

    const privateKey = '3874hkwhjkdwa';

    try {
      connectionSdk.cancel(invalidConnectionData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid key', () => {
    let errorThrown;
    const connectionData = {
      targetUserId: '2',
      accessKey: '123abc',
      walletId: '1',
    };

    const privateKey = null;

    try {
      connectionSdk.cancel(connectionData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});


/**
 * Connection: Block method
 */

describe('The Connection Class: Block method', () => {
  it ('should successfully call with valid data', () => {
    const connectionBlockData = {
      accessKey: '123abc',
      walletId: '1',
    };

    const privateKey = '3874hkwhjkdwa';

    const spy = jest.spyOn(Requester, 'execute');
    const connectionInvitePromise = connectionSdk.block(connectionBlockData, privateKey);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const invalidConnectionData = {
      accessKey: '123abc',
      walletId: null,
    };

    const privateKey = '3874hkwhjkdwa';

    try {
      connectionSdk.block(invalidConnectionData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid key', () => {
    let errorThrown;
    const connectionData = {
      accessKey: '123abc',
      walletId: '1',
    };

    const privateKey = null;

    try {
      connectionSdk.block(connectionData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});


/**
 * Connection: Mute method
 */

describe('The Connection Class: Mute method', () => {
  it ('should successfully call with valid data', () => {
    const connectionMuteData = {
      accessKey: '123abc',
      walletId: '1',
    };

    const privateKey = '3874hkwhjkdwa';

    const spy = jest.spyOn(Requester, 'execute');
    const connectionInvitePromise = connectionSdk.mute(connectionMuteData, privateKey);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const invalidConnectionData = {
      accessKey: '123abc',
      walletId: null,
    };

    const privateKey = '3874hkwhjkdwa';

    try {
      connectionSdk.mute(invalidConnectionData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid key', () => {
    let errorThrown;
    const connectionData = {
      accessKey: '123abc',
      walletId: '1',
    };

    const privateKey = null;

    try {
      connectionSdk.mute(connectionData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});