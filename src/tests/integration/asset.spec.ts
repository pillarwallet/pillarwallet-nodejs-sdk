const hdkey = require('../utils/generateKeyPair');
import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

let spy;

describe('asset endpoints', () => {
  beforeEach(() => {
    this.pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
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
        walletId: '87bcf0e2-9aaa-4b1a-86f9-9fcf54f1185f',
      };

      this.pSdk.asset.defaults(inputParams)
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

  describe('Asset Search', () => {
    it('Expect success', () => {

      const inputParams = {
        walletId: '87bcf0e2-9aaa-4b1a-86f9-9fcf54f1185f',
        query: 'p',
      };

      this.pSdk.asset.search(inputParams)
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

  describe('Asset list', () => {
    it('Expect success',  () => {

      const inputParams = {
        walletId: '87bcf0e2-9aaa-4b1a-86f9-9fcf54f1185f',
      };

      this.pSdk.asset.list(inputParams)
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
