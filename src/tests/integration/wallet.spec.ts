const generateKeyPair = require('../glue/generateKeyPair');
import {PillarSdk} from '../..';

let pSdk: any;

describe('wallet endpoints', () => {
  beforeEach(() => {
    const hdkey = generateKeyPair();
    pSdk = new PillarSdk({
      privateKey: hdkey.privateKey.toString('hex')
    });
  });

  describe('Wallet Registration', () => {
    it('Expect Return Success', async () => {

      const inputParams = {
        fcmToken: 'cMctpybZfwk:APA91bFP_IarnIblW0UDSDGs_w7buoP2apxFIzI6YUOuib_FdSFPLe2ANR-OrFiaAvJ'
      };
      let result:any = {};

      await pSdk.wallet.register(inputParams)
       .then((response:any) => {
       // Successful response!
         result = response;
     })
       .catch((error:any) => {
         // Unsuccessful response.
         result = error;
       });
      expect(result.result).toBe('success');
    });
  });

  describe('Wallet Update', () => {
    it('Expect Success for update Method', async () => {
      const inputParams = {
        walletId: 4,
        fcmToken: 'increaseThePeace'
      };
      let result:any = {};

      await pSdk.wallet.update(inputParams)
        .then((response:any) => {
          // Successful response!
          result = response;
        })
        .catch((error:any) => {
          // Unsuccessful response.
          result = error;
        });
      expect(result.result).toBe('success');
    });
  });
});
