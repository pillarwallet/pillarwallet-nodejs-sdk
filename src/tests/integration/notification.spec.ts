const keys = require('../utils/generateKeyPair');
import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

describe('notification endpoints', () => {
  const requesterExecuteSpy: any = jest.spyOn(Requester, 'execute');
  let pSdk: PillarSdk;

  requesterExecuteSpy.mockImplementation(() => Promise.resolve());

  beforeEach(() => {
    pSdk = new PillarSdk({
      privateKey: keys.privateKey,
      notificationsUrl: 'http://localhost:8081',
    });
  });

  afterEach(() => {
    requesterExecuteSpy.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('Notification list', () => {
    it('Expect success', async () => {
      const inputParams = {
        walletId: '24adad233',
        fromTimestamp: '2016-05-24T15:54:14.876Z',
        type: 'message',
        fetchLatest: true,
      };

      await pSdk.notification.list(inputParams);

      /**
       * TODO: Currently waiting on a development
       * or testing environment before we can asset
       * a correct / expected response. For now, just
       * using a spy to ensure that the request was made.
       */
      expect(requesterExecuteSpy).toHaveBeenCalled();
    });
  });
});
