const hdkey = require('../utils/generateKeyPair');
import { PillarSdk } from '../..';

describe('asset endpoints', () => {
  beforeEach(() => {
    this.pSdk = new PillarSdk({
      privateKey: hdkey.privateKey,
    });
  });

  describe('Asset Default', () => {
    it('Expect success',  () => {

      const inputParams = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      const result = this.pSdk.asset.defaults(inputParams)
        .then((response: any) => {
          // Successful response!
          // console.log(response);
          return response;
        })
        .catch((error: any) => {
          // Unsuccessful response.
          return error;
        });

      expect(result).toBeTruthy();
    });
  });

  describe('Asset Search', () => {
    it('Expect success', () => {

      const inputParams = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        query: 'p',
      };

      const result = this.pSdk.asset.search(inputParams)
        .then((response: any) => {
          // Successful response!
          // console.log(response);
          return response;
        })
        .catch((error: any) => {
          // Unsuccessful response.
          return error;
        });

      expect(result).toBeTruthy();

    });
  });

});
