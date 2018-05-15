import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';
let pSdk: any;

beforeEach(() => {
  pSdk = new PillarSdk({
    privateKey: 'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
  });
});

/**
 * Connection: Invite method
 */

describe('The Connection Class: Invite method', () => {
  it ('should successfully call with valid data', () => {
    const connectionInviteData = {
      targetUserId: 2,
      accessKey: 'abc123',
      walletId: 1,
    };

    const spy = jest.spyOn(Requester, 'execute');
    pSdk.connection.invite(connectionInviteData);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const invalidConnectionData = {
      targetUserId: 2,
      accessKey: 'abc123',
    };

    try {
      pSdk.connection.invite(invalidConnectionData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid walletId', () => {
    let errorThrown;
    const invalidConnectionData = {
      targetUserId: 2,
      accessKey: 'abc123',
      walletId: -1,
    };

    try {
      pSdk.connection.invite(invalidConnectionData);
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
      targetUserId: 2,
      walletId: 1,
      sourceUserAccessKey: 'hello',
      targetUserAccessKey: 'hello',
    };

    const spy = jest.spyOn(Requester, 'execute');
    pSdk.connection.accept(connectionAcceptData);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const invalidConnectionData = {
      walletId: 1,
      sourceUserAccessKey: 'hello',
      targetUserAccessKey: 'hello',
    };

    try {
      pSdk.connection.accept(invalidConnectionData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid walletId', () => {
    let errorThrown;
    const invalidConnectionData = {
      targetUserId: 2,
      walletId: -1,
      sourceUserAccessKey: 'hello',
      targetUserAccessKey: 'hello',
    };

    try {
      pSdk.connection.accept(invalidConnectionData);
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
      targetUserId: 2,
      accessKey: '123abc',
      walletId: 1,
    };

    const spy = jest.spyOn(Requester, 'execute');
    pSdk.connection.reject(connectionRejectData);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const invalidConnectionData = {
      targetUserId: 2,
      accessKey: '123abc',
      walletId: null,
    };

    try {
      pSdk.connection.reject(invalidConnectionData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid walletId', () => {
    let errorThrown;
    const connectionData = {
      targetUserId: 2,
      accessKey: '123abc',
      walletId: -1,
    };

    try {
      pSdk.connection.reject(connectionData);
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
      targetUserId: 2,
      accessKey: '123abc',
      walletId: 1,
    };

    const spy = jest.spyOn(Requester, 'execute');
    pSdk.connection.cancel(connectionCancelData);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const invalidConnectionData = {
      targetUserId: 2,
      accessKey: '123abc',
      walletId: null,
    };

    try {
      pSdk.connection.cancel(invalidConnectionData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid walletId', () => {
    let errorThrown;
    const connectionData = {
      targetUserId: 2,
      accessKey: '123abc',
      walletId: -1,
    };

    try {
      pSdk.connection.cancel(connectionData);
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
      walletId: 1,
    };

    const spy = jest.spyOn(Requester, 'execute');
    pSdk.connection.block(connectionBlockData);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const invalidConnectionData = {
      accessKey: '123abc',
      walletId: null,
    };

    try {
      pSdk.connection.block(invalidConnectionData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid walletId', () => {
    let errorThrown;
    const connectionData = {
      accessKey: '123abc',
      walletId: -1,
    };

    try {
      pSdk.connection.block(connectionData);
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
      walletId: 1,
    };

    const spy = jest.spyOn(Requester, 'execute');
    pSdk.connection.mute(connectionMuteData);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const invalidConnectionData = {
      accessKey: '123abc',
      walletId: null,
    };

    try {
      pSdk.connection.mute(invalidConnectionData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid walletId', () => {
    let errorThrown;
    const connectionData = {
      accessKey: '123abc',
      walletId: -1,
    };

    try {
      pSdk.connection.mute(connectionData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});
