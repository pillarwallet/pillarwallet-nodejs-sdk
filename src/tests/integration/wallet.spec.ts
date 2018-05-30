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
        fcmToken: 'cMctpybZfwk:APA9arnIbla0UDSDGs_w7buoP2apxFIzI6YUdSFPLe2ANR-OrFiaAvJ'
      };

      const result = await pSdk.wallet.register(inputParams)
       .then((response:any) => {
       // Successful response!
         return response;
     })
       .catch((error:any) => {
         // Unsuccessful response.
         return result;
       });

      expect(result).toBeTruthy();
    });
  });

  describe('Wallet Update', () => {
    it('Expect Success for update Method', async () => {
      const inputParams = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        fcmToken: 'increaseThePeace'
      };

      const result = await pSdk.wallet.update(inputParams)
        .then((response:any) => {
          // Successful response!
          return response;
        })
        .catch((error:any) => {
          // Unsuccessful response.
          return result;
        });

      expect(result).toBeTruthy();
    });
  });
});
