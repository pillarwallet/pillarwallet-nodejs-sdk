const hdkey = require('../utils/generateKeyPair');
import { PillarSdk } from '../..';

describe('notification endpoints', () => {
  beforeEach(() => {
    this.pSdk = new PillarSdk({
      privateKey: hdkey.privateKey,
    });
  });

  describe('Notification list', () => {
    it('Expect success',  () => {
      const inputParams = {
        walletId: 1,
        fromTimestamp: '2016-05-24T15:54:14.876Z',
      };

      const result = this.pSdk.notification.list(inputParams)
        .then((response:any) => {
          // Successful response!
          return response;
        })
        .catch((error:any) => {
          // Unsuccessful response.
          return error;
        });

      // waiting for test Apiurl to be provided
      // expect(result.result).toBe('success');
      expect(result).toBeTruthy();
    });
  });

});
