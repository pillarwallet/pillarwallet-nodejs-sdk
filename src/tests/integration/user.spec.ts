const generateKeyPair = require('../glue/generateKeyPair');
import {PillarSdk} from '../..';

let pSdk: any;

describe('user endpoints', () => {
  beforeEach(() => {
    const hdkey = generateKeyPair();
    pSdk = new PillarSdk({
      privateKey: hdkey.privateKey.toString('hex')
    });
  });

  describe('User', () => {
    it('User update', async () => {
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

      let result:any = {};

      await pSdk.user.update(inputParams)
        .then((response:any) => {
          // Successful response!
          result = response;
        })
        .catch((error:any) => {
          // Unsuccessful response.
          result = error;
        });

      expect(result.result).toBe('success');
    });

    it('User info', async () => {
      const inputParams = {
        walletId: 4
      };

      let result:any = {};

      await pSdk.user.info(inputParams)
        .then((response:any) => {
          // Successful response!
          result = response;
        })
        .catch((error:any) => {
          // Unsuccessful response.
          result = error;
        });

    });

    it('User search', async () => {
      const inputParams = {
        walletId: 4,
        query: 'Homer',
      };

      let result:any = {};

      await pSdk.user.search(inputParams)
        .then((response:any) => {
          // Successful response!
          result = response;
        })
        .catch((error:any) => {
          // Unsuccessful response.
          result = error;
        });

    });

    it('User delete', async () => {
      const inputParams = {
        walletId: 45,
      };

      let result:any = {};

      await pSdk.user.delete(inputParams)
        .then((response:any) => {
          // Successful response!
          result = response;
        })
        .catch((error:any) => {
          // Unsuccessful response.
          result = error;
        });

      expect(result.result).toBe('success');
    });

  });

});
