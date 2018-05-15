import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';
let pSdk: any;

beforeEach(() => {
  pSdk = new PillarSdk({
    privateKey: 'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
  });
});

describe('The Notification Class: List method', () => {
  it ('should successfully call with valid data', () => {
    const notificationData = {
      walletId: 1,
      fromTimestamp: '2016-05-24T15:54:14.876Z',
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

  it ('should fail when called with invalid walletId', () => {
    let errorThrown;
    const notificationData = {
      walletId: -1,
      fromTimestamp: '2016-05-24T15:54:14.876Z',
    };

    try {
      pSdk.notification.list(notificationData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});
