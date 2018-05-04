import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';
let pSdk: any;

beforeEach(() => {
  pSdk = new PillarSdk({
    privateKey: '123',
  });
});

describe('The Notification Class: List method', () => {
  it ('should successfully call with valid data', () => {
    const notificationData = {
      walletId: 1,
      fromTimestamp: '1525263620',
    };

    const spy = jest.spyOn(Requester, 'execute');
    pSdk.notification.list(notificationData);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const notificationData = {
      walletId: 1,
      fromTimestamp: null,
    };

    try {
      pSdk.notification.list(notificationData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid key', () => {
    let errorThrown;
    const notificationData = {
      walletId: 1,
      fromTimestamp: '1525263620',
    };

    pSdk = new PillarSdk({
      privateKey: null,
    });

    try {
      pSdk.notification.list(notificationData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});
