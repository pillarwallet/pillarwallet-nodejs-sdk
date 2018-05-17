const generateKeyPair = require('../glue/generateKeyPair');
import {PillarSdk} from '../..';

let pSdk: any;

describe('connection endpoints', () => {
  beforeEach(() => {
    const hdkey = generateKeyPair();
    pSdk = new PillarSdk({
      privateKey: hdkey.privateKey.toString('hex')
    });
  });

  it('The Connection Class: Invite ', async () => {
    const inputParams = {
      targetUserId: 2,
      accessKey: 'abc123',
      walletId: 1,
    };

    let result:any = {};

    await pSdk.connection.invite(inputParams)
      .then((response:any) => {
        // Successful response!
        result = response;
      })
      .catch((error:any) => {
        // Unsuccessful response.
        result = error;
      });

    expect(result.result).toBe('success');
  });

  it('The Connection Class: Accept ', async () => {
    const inputParams = {
      targetUserId: 2,
      walletId: 1,
      sourceUserAccessKey: 'abc123',
      targetUserAccessKey: 'abc123',
    };

    let result:any = {};

    await pSdk.connection.accept(inputParams)
      .then((response:any) => {
        // Successful response!
        result = response;
      })
      .catch((error:any) => {
        // Unsuccessful response.
        result = error;
      });
    console.log(result);
    //expect(result.result).toBe('success');
  });

  it('The Connection Class: Reject ', async () => {
    const inputParams = {
      targetUserId: 2,
      accessKey: '123abc',
      walletId: 1
    };

    let result:any = {};

    await pSdk.connection.reject(inputParams)
      .then((response:any) => {
        // Successful response!
        result = response;
      })
      .catch((error:any) => {
        // Unsuccessful response.
        result = error;
      });
    console.log(result);
    //expect(result.result).toBe('success');
  });

  it('The Connection Class: Cancel ', async () => {
    const inputParams = {
      targetUserId: 2,
      accessKey: '123abc',
      walletId: 1
    };

    let result:any = {};

    await pSdk.connection.cancel(inputParams)
      .then((response:any) => {
        // Successful response!
        result = response;
      })
      .catch((error:any) => {
        // Unsuccessful response.
        result = error;
      });
    console.log(result);
   // expect(result.result).toBe('success');
  });

  it('The Connection Class: Block ', async () => {
    const inputParams = {
      accessKey: '123abc',
      walletId: 1
    };

    let result:any = {};

    await pSdk.connection.block(inputParams)
      .then((response:any) => {
        // Successful response!
        result = response;
      })
      .catch((error:any) => {
        // Unsuccessful response.
        result = error;
      });
    console.log(result);
   // expect(result.result).toBe('success');
  });

  it('The Connection Class: Mute ', async () => {
    const inputParams = {
      accessKey: '123abc',
      walletId: 1
    };

    let result:any = {};

    await pSdk.connection.mute(inputParams)
      .then((response:any) => {
        // Successful response!
        result = response;
      })
      .catch((error:any) => {
        // Unsuccessful response.
        result = error;
      });
    console.log(result);
   // expect(result.result).toBe('success');
  });
});
