import { Wallet } from  '../../lib/wallet';
import { Requester } from '../../utils/requester';
import { RequestPromise } from 'request-promise';
let walletSdk = new Wallet();

describe('The Wallet Class', () => {
  it ('should successfully call with valid data', () => {
    const walletRegistrationData = {
      publicKey: '123abc',
      ethAddress: '0x02999',
      fcmToken: '987qwe',
    };

    const privateKey = '3874hkwhjkdwa';

    const spy = jest.spyOn(Requester, 'execute');
    const walletRegistrationPromise = walletSdk.register(walletRegistrationData, privateKey);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const walletRegistrationData = {
      ethAddress: '0x02999',
      fcmToken: '987qwe',
    };

    const privateKey = '3874hkwhjkdwa';

    try {
      walletSdk.register(walletRegistrationData, privateKey);
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

    const privateKey = null;

    try {
      walletSdk.register(walletRegistrationData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});
