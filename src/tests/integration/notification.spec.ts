const generateKeyPair = require('../glue/generateKeyPair');
import {PillarSdk} from '../..';

let pSdk: any;

describe('notification endpoints', () => {
  beforeEach(() => {
    const hdkey = generateKeyPair();
    pSdk = new PillarSdk({
      privateKey: hdkey.privateKey.toString('hex')
    });
  });

  describe('Notification list', () => {
    it('Expect success', async () => {
      const inputParams = {
        walletId: 1,
        fromTimestamp: '2016-05-24T15:54:14.876Z'
      };

      let result:any = {};

      pSdk.notification.list(inputParams)
        .then((response:any) => {
          // Successful response!
          result = response;
        })
        .catch((error:any) => {
          // Unsuccessful response.
          result = error;
        });

      console.log(result);
    });
  });

});
