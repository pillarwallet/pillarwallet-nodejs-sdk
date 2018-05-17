const generateKeyPair = require('../glue/generateKeyPair');
import {PillarSdk} from '../..';

let pSdk: any;

describe('asset endpoints', () => {
  beforeEach(() => {
    const hdkey = generateKeyPair();
    pSdk = new PillarSdk({
      privateKey: hdkey.privateKey.toString('hex')
    });
  });

  describe('Asset Default', () => {
    it('Expect success', async () => {

      const inputParams = {
        walletId: 1,
      };

      let result:any = {};

      pSdk.asset.defaults(inputParams)
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

  describe('Asset Search', () => {
    it('Expect success', async () => {

      const inputParams = {
        walletId: 1,
        query: 'a',
      };

      let result:any = {};

      pSdk.asset.search(inputParams)
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
