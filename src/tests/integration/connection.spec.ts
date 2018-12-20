// tslint:disable: object-shorthand-properties-first
const keys = require('../utils/generateKeyPair');
import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

// TODO: Mock api using nock library
describe.skip('Connection Class', () => {
  const requesterExecuteSpy: any = jest.spyOn(Requester, 'execute');
  let pSdk: PillarSdk;

  let walletId: string;
  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;
  // Key pairs
  const privateKey = keys.privateKey.toString();
  const walletRegister = {
    privateKey,
    fcmToken: '987qwe',
    username,
  };

  beforeAll(async () => {
    let response: any;
    pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
      notificationsUrl: 'http://localhost:8081',
      investmentsUrl: 'http://localhost:8082',
    });
    try {
      response = await pSdk.wallet.registerAuthServer(walletRegister);
      walletId = response.data.walletId;
    } catch (e) {
      throw e;
    }
  });

  afterEach(() => {
    requesterExecuteSpy.mockClear();
  });

  it('.invite', () => {
    const inputParams = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      accessKey: 'abc123',
      walletId,
    };

    pSdk.connection.invite(inputParams);

    /**
     * TODO: Currently waiting on a development
     * or testing environment before we can asset
     * a correct / expected response. For now, just
     * using a spy to ensure that the request was made.
     */
    expect(requesterExecuteSpy).toHaveBeenCalled();
  });

  it('.accept', () => {
    const inputParams = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      walletId,
      sourceUserAccessKey: 'hello',
      targetUserAccessKey: 'hello',
    };

    pSdk.connection.accept(inputParams);

    /**
     * TODO: Currently waiting on a development
     * or testing environment before we can asset
     * a correct / expected response. For now, just
     * using a spy to ensure that the request was made.
     */
    expect(requesterExecuteSpy).toHaveBeenCalled();
  });

  it('.reject', () => {
    const inputParams = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      accessKey: 'abc123',
      walletId,
    };

    pSdk.connection.reject(inputParams);

    /**
     * TODO: Currently waiting on a development
     * or testing environment before we can asset
     * a correct / expected response. For now, just
     * using a spy to ensure that the request was made.
     */
    expect(requesterExecuteSpy).toHaveBeenCalled();
  });

  it('.cancel', () => {
    const inputParams = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      accessKey: 'abc123',
      walletId,
    };

    pSdk.connection.cancel(inputParams);

    /**
     * TODO: Currently waiting on a development
     * or testing environment before we can asset
     * a correct / expected response. For now, just
     * using a spy to ensure that the request was made.
     */
    expect(requesterExecuteSpy).toHaveBeenCalled();
  });

  it('.block', () => {
    const inputParams = {
      accessKey: 'abc123',
      walletId,
      targetUserId: '8cc06db4-ec05-11e8-8eb2-f2801f1b9fd1',
      block: true,
    };

    pSdk.connection.block(inputParams);

    /**
     * TODO: Currently waiting on a development
     * or testing environment before we can asset
     * a correct / expected response. For now, just
     * using a spy to ensure that the request was made.
     */
    expect(requesterExecuteSpy).toHaveBeenCalled();
  });

  it('.mute', () => {
    const inputParams = {
      accessKey: 'abc123',
      walletId,
      targetUserId: '8cc06db4-ec05-11e8-8eb2-f2801f1b9fd1',
      mute: true,
    };

    pSdk.connection.mute(inputParams);

    /**
     * TODO: Currently waiting on a development
     * or testing environment before we can asset
     * a correct / expected response. For now, just
     * using a spy to ensure that the request was made.
     */
    expect(requesterExecuteSpy).toHaveBeenCalled();
  });

  it('.disconnect', () => {
    const inputParams = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      sourceUserAccessKey: 'abc123',
      targetUserAccessKey: 'abc124',
      walletId,
    };

    pSdk.connection.disconnect(inputParams);

    /**
     * TODO: Currently waiting on a development
     * or testing environment before we can asset
     * a correct / expected response. For now, just
     * using a spy to ensure that the request was made.
     */
    expect(requesterExecuteSpy).toHaveBeenCalled();
  });
});
