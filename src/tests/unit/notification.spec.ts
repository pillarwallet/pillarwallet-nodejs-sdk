import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

beforeEach(() => {
  this.pSdk = new PillarSdk({
    privateKey: 'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
  });
});

describe('The Notification Class: List method', () => {
  it ('should successfully call with valid data', () => {
    const notificationData = {
      walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      fromTimestamp: '2016-05-24T15:54:14.876Z',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.notification.list(notificationData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          params: notificationData,
          url: 'http://localhost:8080/notification/list',
        }),
    );
  });
});
