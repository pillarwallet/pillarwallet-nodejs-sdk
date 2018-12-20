import { PillarSdk } from '../..';
import { Requester } from '../../utils/requester';
import { Configuration } from '../../lib/configuration';
import { default as getConfiguration } from '../../utils/requester-configurations/get';

describe('Notification Class', () => {
  const spy = jest.spyOn(Requester, 'execute');
  let pSdk: PillarSdk;

  jest.spyOn(Configuration.prototype, 'executeRequest');

  spy.mockImplementation(() => {});

  beforeEach(() => {
    pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
      notificationsUrl: 'http://localhost:8081',
      investmentsUrl: 'http://localhost:8082',
    });
  });

  afterEach(() => {
    Configuration.accessToken = '';
    Configuration.prototype.executeRequest.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('.list', () => {
    it('should successfully call with valid data with Authorization header', () => {
      const notificationData = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
        fromTimestamp: '2016-05-24T15:54:14.876Z',
        type: 'message',
      };

      Configuration.accessToken = 'myAccessToken';

      pSdk.notification.list(notificationData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        params: notificationData,
        url: 'http://localhost:8081/notification/list',
      });
    });

    it('validates data', async () => {
      expect.assertions(2);

      try {
        await pSdk.notification.list({});
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toBe("data should have required property 'walletId'");
      }
    });
  });
});
