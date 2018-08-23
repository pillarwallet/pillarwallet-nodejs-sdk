import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

describe('Notification Class', () => {
  let pSdk: PillarSdk;

  beforeEach(() => {
    pSdk = new PillarSdk({
      privateKey:
        'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
      notificationsUrl: 'http://localhost:8081',
    });
  });

  describe('List method', () => {
    it('should successfully call with valid data', () => {
      const notificationData = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
        fromTimestamp: '2016-05-24T15:54:14.876Z',
        type: 'message',
      };

      const spy = jest.spyOn(Requester, 'execute');
      pSdk.notification.list(notificationData);

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { 'X-API-Signature': expect.anything() },
          params: notificationData,
          url: 'http://localhost:8081/notification/list',
        }),
      );
    });
  });
});
