import { Wallet } from  '../../lib/wallet';
import { Requester } from '../../utils/requester';
import { RequestPromise } from 'request-promise';
import { PillarSdk } from '../..';
let pSdk;

beforeEach(() => {
  pSdk = new PillarSdk({
    privateKey: '123',
  });
});

describe('The Wallet Class: Register method', () => {
  it ('should successfully call with valid data', () => {
    const walletRegistrationData = {
      publicKey: '123abc',
      ethAddress: '0x02999',
      fcmToken: '987qwe',
    };

    const spy = jest.spyOn(Requester, 'execute');
    const walletRegistrationPromise = pSdk.wallet.register(walletRegistrationData);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const walletRegistrationData = {
      ethAddress: '0x02999',
      fcmToken: '987qwe',
    };

    try {
      pSdk.wallet.register(walletRegistrationData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid key', () => {
    let errorThrown;
    const walletRegistrationData = {
      publicKey: '123abc',
      ethAddress: '0x02999',
      fcmToken: '987qwe',
    };

    pSdk = new PillarSdk({
      privateKey: null,
    });

    try {
      pSdk.wallet.register(walletRegistrationData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});

describe('The Wallet Class: Update method', () => {
  it ('should successfully call with valid data', () => {
    const walletUpdateData = {
      walletId: '1',
      ethAddress: '0x02999',
      fcmToken: '987qwe',
      signalRegistrationId: '123abc',
    };

    const spy = jest.spyOn(Requester, 'execute');
    const walletRegistrationPromise = pSdk.wallet.update(walletUpdateData);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const walletUpdateData = {
      ethAddress: '0x02999',
      fcmToken: '987qwe',
    };

    try {
      pSdk.wallet.update(walletUpdateData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid key', () => {
    let errorThrown;
    const walletRegistrationData = {
      publicKey: '123abc',
      ethAddress: '0x02999',
      fcmToken: '987qwe',
    };

    pSdk = new PillarSdk({
      privateKey: null,
    });

    try {
      pSdk.wallet.update(walletRegistrationData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});
