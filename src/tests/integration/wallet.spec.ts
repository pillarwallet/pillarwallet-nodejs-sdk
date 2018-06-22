const keys = require('../utils/generateKeyPair');
import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

let spy;

describe('wallet endpoints', () => {
  beforeEach(() => {
    this.pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
      privateKey: keys.privateKey,
    });

    spy = jest.spyOn(Requester, 'execute');
  });

  afterEach(() => {
    spy.mockClear();
  });

  describe('Wallet Registration', () => {
    it('Expect Return Success', () => {

      const inputParams = {
        fcmToken: 'cMctpybZfwk:APA9arnIbla0UDSDGs_w7buoP2apxFIzI6YUdSFPLe2ANR-OrFiaAvJ',
        username: 'bob123',
      };

      this.pSdk.wallet.register(inputParams)
        .then((response: any) => {
          // Successful response!
          // console.log(response.data);
          return response;
        })
        .catch((error: any) => {
          // Unsuccessful response.
          // console.log(error);
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
        walletId: '746b2bf4-12d3-425b-8cb7-0e9593bbbb17',
        fcmToken: 'increaseThePeace',
      };

      const result = this.pSdk.wallet.update(inputParams)
        .then((response: any) => {
          // Successful response!
          // console.log(response.data);
          return response;

        })
        .catch((error: any) => {
          // Unsuccessful response.
          // console.log(error);
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
