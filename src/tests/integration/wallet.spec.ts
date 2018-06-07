const keys = require('../utils/generateKeyPair');
import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

const spy = jest.spyOn(Requester, 'execute');

describe('wallet endpoints', () => {
  beforeEach(() => {
    this.pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
      privateKey: keys.privateKey,
    });
  });

  describe('Wallet Registration', () => {
    it('Expect Return Success', () => {

      const inputParams = {
        fcmToken: 'cMctpybZfwk:APA9arnIbla0UDSDGs_w7buoP2apxFIzI6YUdSFPLe2ANR-OrFiaAvJ',
      };

      const result = this.pSdk.wallet.register(inputParams)
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

  describe('Wallet Update', () => {
    it('Expect Success for update Method', () => {
      const inputParams = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        fcmToken: 'increaseThePeace',
      };

      const result = this.pSdk.wallet.update(inputParams)
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
