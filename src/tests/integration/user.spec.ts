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
      const userUpdateData = {
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

      await pSdk.user.update(userUpdateData)
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
