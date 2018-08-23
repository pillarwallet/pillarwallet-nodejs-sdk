const keys = require('../utils/generateKeyPair');
import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

describe('connection endpoints', () => {
  const requesterExecuteSpy: any = jest.spyOn(Requester, 'execute');
  let pSdk: PillarSdk;

  beforeEach(() => {
    pSdk = new PillarSdk({
      privateKey: keys.privateKey,
    });
  });

  afterEach(() => {
    requesterExecuteSpy.mockClear();
  });

  it('The Connection Class: Invite ', () => {
    const inputParams = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      accessKey: 'abc123',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    pSdk.connection
      .invite(inputParams)
      .then((response: any) => {
        // Successful response!
        return response;
      })
      .catch((error: any) => {
        // Unsuccessful response.
        return error;
      });

    /**
     * TODO: Currently waiting on a development
     * or testing environment before we can asset
     * a correct / expected response. For now, just
     * using a spy to ensure that the request was made.
     */
    expect(requesterExecuteSpy).toHaveBeenCalled();
  });

  it('The Connection Class: Accept ', () => {
    const inputParams = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      sourceUserAccessKey: 'hello',
      targetUserAccessKey: 'hello',
    };

    pSdk.connection
      .accept(inputParams)
      .then((response: any) => {
        // Successful response!
        return response;
      })
      .catch((error: any) => {
        // Unsuccessful response.
        return error;
      });

    /**
     * TODO: Currently waiting on a development
     * or testing environment before we can asset
     * a correct / expected response. For now, just
     * using a spy to ensure that the request was made.
     */
    expect(requesterExecuteSpy).toHaveBeenCalled();
  });

  it('The Connection Class: Reject ', () => {
    const inputParams = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      accessKey: 'abc123',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    pSdk.connection
      .reject(inputParams)
      .then((response: any) => {
        // Successful response!
        return response;
      })
      .catch((error: any) => {
        // Unsuccessful response.
        return error;
      });

    /**
     * TODO: Currently waiting on a development
     * or testing environment before we can asset
     * a correct / expected response. For now, just
     * using a spy to ensure that the request was made.
     */
    expect(requesterExecuteSpy).toHaveBeenCalled();
  });

  it('The Connection Class: Cancel ', () => {
    const inputParams = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      accessKey: 'abc123',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    pSdk.connection
      .cancel(inputParams)
      .then((response: any) => {
        // Successful response!
        return response;
      })
      .catch((error: any) => {
        // Unsuccessful response.
        return error;
      });

    /**
     * TODO: Currently waiting on a development
     * or testing environment before we can asset
     * a correct / expected response. For now, just
     * using a spy to ensure that the request was made.
     */
    expect(requesterExecuteSpy).toHaveBeenCalled();
  });

  it('The Connection Class: Block ', () => {
    const inputParams = {
      accessKey: 'abc123',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    pSdk.connection
      .block(inputParams)
      .then((response: any) => {
        // Successful response!
        return response;
      })
      .catch((error: any) => {
        // Unsuccessful response.
        return error;
      });

    /**
     * TODO: Currently waiting on a development
     * or testing environment before we can asset
     * a correct / expected response. For now, just
     * using a spy to ensure that the request was made.
     */
    expect(requesterExecuteSpy).toHaveBeenCalled();
  });

  it('The Connection Class: Mute ', () => {
    const inputParams = {
      accessKey: 'abc123',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    pSdk.connection
      .mute(inputParams)
      .then((response: any) => {
        // Successful response!
        return response;
      })
      .catch((error: any) => {
        // Unsuccessful response.
        return error;
      });

    /**
     * TODO: Currently waiting on a development
     * or testing environment before we can asset
     * a correct / expected response. For now, just
     * using a spy to ensure that the request was made.
     */
    expect(requesterExecuteSpy).toHaveBeenCalled();
  });
});
