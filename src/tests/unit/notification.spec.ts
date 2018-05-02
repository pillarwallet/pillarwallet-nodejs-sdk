import { Notification } from  '../../lib/notification';
import { Requester } from '../../utils/requester';
import { RequestPromise } from 'request-promise';
let notificationSdk = new Notification();

describe('The Notification Class: List method', () => {
  it ('should successfully call with valid data', () => {
    const notificationData = {
      walletId: '1',
      fromTimestamp: '1525263620'
    };

    const privateKey = '3874hkwhjkdwa';

    const spy = jest.spyOn(Requester, 'execute');
    const notificationListPromise = notificationSdk.list(notificationData, privateKey);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const notificationData = {
      walletId: '1',
      fromTimestamp: null
    };

    const privateKey = '3874hkwhjkdwa';

    try {
      notificationSdk.list(notificationData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid key', () => {
    let errorThrown;
    const notificationData = {
      walletId: '1',
      fromTimestamp: '1525263620'
    };

    const privateKey = null;

    try {
      notificationSdk.list(notificationData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});
