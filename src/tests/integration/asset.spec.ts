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
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      const result = await pSdk.asset.defaults(inputParams)
        .then((response: any) => {
          // Successful response!
          //console.log(response);
          return response;
        })
        .catch((error: any) => {
          // Unsuccessful response.
          return error;
        });

      console.log(result);
    });
  });

  describe('Asset Search', () => {
    it('Expect success', async () => {

      const inputParams = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        query: 'p',
      };

      const result = await pSdk.asset.search(inputParams)
        .then((response: any) => {
          // Successful response!
          //console.log(response);
          return response;
        })
        .catch((error: any) => {
          // Unsuccessful response.
          return error;
        });

      console.log(result);

    });
  });

});
