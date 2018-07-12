const keys = require('../utils/generateKeyPair');
import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

let spy: any;

describe('notification endpoints', () => {
  beforeEach(() => {
    this.pSdk = new PillarSdk({
      privateKey: keys.privateKey,
      notificationsUrl: 'http://localhost:8081',
    });

    spy = jest.spyOn(Requester, 'execute');
  });

  afterEach(() => {
    spy.mockClear();
  });

  describe('Notification list', () => {
    it('Expect success',  () => {
      const inputParams = {
        walletId: '24adad233',
        fromTimestamp: '2016-05-24T15:54:14.876Z',
        type: 'message',
      };

      this.pSdk.notification.list(inputParams)
        .then((response: any) => {
          // Successful response!
          return response;
        })
        .catch((error: any) => {
          // Unsuccessful response.
          return error;
        });

      /**
       * TODO: Currently waiting on a development
       * or testing environment before we can asset
       * a correct / expected response. For now, just
       * using a spy to ensure that the request was made.
       */
      expect(spy).toHaveBeenCalled();
    });
  });
});
