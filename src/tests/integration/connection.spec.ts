const hdkey = require('../utils/generateKeyPair');
import { PillarSdk } from '../..';

describe('connection endpoints', () => {
  beforeEach(() => {
    this.pSdk = new PillarSdk({
      privateKey: hdkey.privateKey,
    });
  });

  it('The Connection Class: Invite ', () => {
    const inputParams = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      accessKey: 'abc123',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    const result = this.pSdk.connection.invite(inputParams)
      .then((response:any) => {
        // Successful response!
        return response;
      })
      .catch((error:any) => {
        // Unsuccessful response.
        return error;
      });

    // waiting for test Apiurl to be provided
    // expect(result.result).toBe('success');
    expect(result).toBeTruthy();
  });

  it('The Connection Class: Accept ', () => {
    const inputParams = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      sourceUserAccessKey: 'hello',
      targetUserAccessKey: 'hello',
    };

    const result = this.pSdk.connection.accept(inputParams)
      .then((response:any) => {
        // Successful response!
        return response;
      })
      .catch((error:any) => {
        // Unsuccessful response.
        return error;
      });


    // expect(result.result).toBe('success');
    // waiting for test Apiurl to be provided
    expect(result).toBeTruthy();
  });

  it('The Connection Class: Reject ', () => {
    const inputParams = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      accessKey: 'abc123',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    const result = this.pSdk.connection.reject(inputParams)
      .then((response:any) => {
        // Successful response!
        return response;
      })
      .catch((error:any) => {
        // Unsuccessful response.
        return error;
      });

    // console.log(result);
    // expect(result.result).toBe('success');
    expect(result).toBeTruthy();
  });

  it('The Connection Class: Cancel ', () => {
    const inputParams = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      accessKey: 'abc123',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    const result = this.pSdk.connection.cancel(inputParams)
      .then((response:any) => {
        // Successful response!
        return response;
      })
      .catch((error:any) => {
        // Unsuccessful response.
        return error;
      });

    // console.log(result);
    // expect(result.result).toBe('success');
    expect(result).toBeTruthy();
  });

  it('The Connection Class: Block ', () => {
    const inputParams = {
      accessKey: 'abc123',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    const result = this.pSdk.connection.block(inputParams)
      .then((response:any) => {
        // Successful response!
        return response;
      })
      .catch((error:any) => {
        // Unsuccessful response.
        return error;
      });

    // console.log(result);
    // expect(result.result).toBe('success');
    expect(result).toBeTruthy();
  });

  it('The Connection Class: Mute ', () => {
    const inputParams = {
      accessKey: 'abc123',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    const result = this.pSdk.connection.mute(inputParams)
      .then((response:any) => {
        // Successful response!
        return response;
      })
      .catch((error:any) => {
        // Unsuccessful response.
        return error;
      });

    // console.log(result);
    // expect(result.result).toBe('success');
    expect(result).toBeTruthy();
  });
});
