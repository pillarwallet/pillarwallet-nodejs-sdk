import {Requester} from '../../utils/requester';
import {PillarSdk} from '../..';

let pSdk: any;

beforeEach(() => {
  pSdk = new PillarSdk({
    privateKey: 'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
  });
});

describe('The Wallet Class: Register method', () => {
  it('should successfully call with valid data', () => {
    const walletRegistrationData = {
      fcmToken: '987qwe',
    };

    const spy = jest.spyOn(Requester, 'execute');
    pSdk.wallet.register(walletRegistrationData);

    expect(spy).toBeCalled();
  });

  it('should fail when called with invalid data', () => {
    let errorThrown;
    const walletRegistrationData = {
      fcmToken: '987qwe',
      ethAddress: '0xc1912fee45d61c87cc5ea59dae31190fffff232' // ethAddress invalid with 1 char less than expected
    };

    try {
      pSdk.wallet.register(walletRegistrationData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it('should fail when called with invalid public key ', () => {
    let errorThrown;
    const walletRegistrationData = {
      fcmToken: '987qwe',
      publicKey: 'aef23212dbaadfa322321231231313123131312312312312312312312312312aae' +
      'f23212dbaadfa322321231231313123131312312312312312312312312312' // publicKey invalid with 1 char less than expected
    };

    try {
      pSdk.wallet.register(walletRegistrationData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it('should fail when called with invalid key', () => {
    let errorThrown;

    try {
      pSdk = new PillarSdk({
        privateKey: null,
      });
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});

describe('The Wallet Class: Update method', () => {
  it('should successfully call with valid data', () => {
    const walletUpdateData = {
      walletId: 1,
      fcmToken: '987qwe'
    };

    const spy = jest.spyOn(Requester, 'execute');
    pSdk.wallet.update(walletUpdateData);

    expect(spy).toBeCalled();
  });

  it('should fail when called with invalid data', () => {
    let errorThrown;
    const walletUpdateData = {
      walletId: -1,
      fcmToken: '987qwe'
    };

    try {
      pSdk.wallet.update(walletUpdateData);
    } catch (error) {
      errorThrown = error;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });


  it('should fail when called with invalid key', () => {
    let errorThrown;

    try {
      pSdk = new PillarSdk({
        privateKey: null,
      });
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});
