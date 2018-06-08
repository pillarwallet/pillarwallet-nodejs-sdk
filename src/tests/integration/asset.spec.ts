const hdkey = require('../utils/generateKeyPair');
import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

let spy;

describe('asset endpoints', () => {
  beforeEach(() => {
    this.pSdk = new PillarSdk({
      privateKey: hdkey.privateKey,
    });

    spy = jest.spyOn(Requester, 'execute');
  });

  afterEach(() => {
    spy.mockClear();
  });

  describe('Asset Default', () => {
    it('Expect success',  () => {

      const inputParams = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      this.pSdk.asset.defaults(inputParams)
        .then((response: any) => {
          // Successful response!
          // console.log(response);
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

  describe('Asset Search', () => {
    it('Expect success', () => {

      const inputParams = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        query: 'p',
      };

      this.pSdk.asset.search(inputParams)
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
