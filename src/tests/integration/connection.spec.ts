const hdkey = require('../glue/generateKeyPair');
import { PillarSdk } from '../..';

describe('connection endpoints', () => {
  beforeEach(() => {
    this.pSdk = new PillarSdk({
      privateKey: hdkey.privateKey,
    });
  });

  it('The Connection Class: Invite ', () => {
    const inputParams = {
      targetUserId: 2,
      accessKey: 'abc123',
      walletId: 1,
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
      targetUserId: 2,
      walletId: 1,
      sourceUserAccessKey: 'abc123',
      targetUserAccessKey: 'abc123',
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
      targetUserId: 2,
      accessKey: '123abc',
      walletId: 1,
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
      targetUserId: 2,
      accessKey: '123abc',
      walletId: 1,
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
      accessKey: '123abc',
      walletId: 1,
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
      accessKey: '123abc',
      walletId: 1,
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
