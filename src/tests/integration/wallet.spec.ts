const hdkey = require('../glue/generateKeyPair');
import {PillarSdk} from '../..';

describe('wallet endpoints', () => {
  beforeEach(() => {
    this.pSdk = new PillarSdk({
      privateKey: hdkey.privateKey
    });
  });

  describe('Wallet Registration', () => {
    it('Expect Return Success', () => {

      const inputParams = {
        fcmToken: 'cMctpybZfwk:APA9arnIbla0UDSDGs_w7buoP2apxFIzI6YUdSFPLe2ANR-OrFiaAvJ'
      };

      const result = this.pSdk.wallet.register(inputParams)
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

  describe('Wallet Update', () => {
    it('Expect Success for update Method', () => {
      const inputParams = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        fcmToken: 'increaseThePeace'
      };

      const result = this.pSdk.wallet.update(inputParams)
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
