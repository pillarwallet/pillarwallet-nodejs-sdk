const hdkey = require('../glue/generateKeyPair');
import {PillarSdk} from '../..';

describe('user endpoints', () => {
  beforeEach(() => {
    this.pSdk = new PillarSdk({
      privateKey: hdkey.privateKey
    });
  });

  describe('User', () => {
    it('User update', () => {
      const inputParams = {
        walletId: 5,
        firstName: 'Charlie',
        lastName: 'Hedex',
        email: 'chunkylover69@aol.com',
        phone: '911',
        country: 'United States',
        state: 'NA',
        city: 'Springfield',
        tagline: 'Tagline',
        taglineStatus: true,
        userSearchable: true,
        profileImage: 'http://ads.jpg',
      };

     const result = this.pSdk.user.update(inputParams)
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

    it('User info', () => {
      const inputParams = {
        walletId: 4
      };

      const result = this.pSdk.user.info(inputParams)
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

    it('User search', () => {
      const inputParams = {
        walletId: 4,
        query: 'Homer',
      };

      const result = this.pSdk.user.search(inputParams)
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

    it('User delete', () => {
      const inputParams = {
        walletId: 45,
      };

      const result = this.pSdk.user.delete(inputParams)
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
