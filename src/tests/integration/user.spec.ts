const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const keys = require('../utils/generateKeyPair');
import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

let spy;

describe('user endpoints', () => {
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

  describe('User', () => {
    it('User update', () => {
      const inputParams = {
        walletId: 'efcbe336-c6fc-4165-af68-b4a216c0f287',
        firstName: 'Bob',
        lastName: 'Jones',
        email: 'bob@acme-corp.com',
        phone: '+44 77 1111 2222',
        country: 'UK',
        state: 'CA',
        city: 'London',
        tagline: 'Social media consultant',
        taglineStatus: false,
        userSearchable: true,
      };

      this.pSdk.user.update(inputParams)
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

    it('User info', () => {
      const inputParams = {
        walletId: 'efcbe336-c6fc-4165-af68-b4a216c0f287',
      };

      this.pSdk.user.info(inputParams)
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

    it('User search', () => {
      const inputParams = {
        walletId: 'efcbe336-c6fc-4165-af68-b4a216c0f287',
        query: 'Bob',
      };

      this.pSdk.user.search(inputParams)
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

    it('User delete', () => {
      const inputParams = {
        walletId: 'efcbe336-c6fc-4165-af68-b4a216c0f287',
      };

      this.pSdk.user.delete(inputParams)
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

    // we still can not automatically run the integration tests.
    it.skip('User Validation', async () => {
      const inputParams = {
        username: 'amber',
      };

      const res = await this.pSdk.user.validate(inputParams);
      expect(res.data).toEqual({ id: expect.any(String), username: 'amber' });
    });

    // we still can not automatically run the integration tests.
    it.skip('Username Search', async () => {
      const inputParams = {
        username: 'amber',
      };

      const res = await this.pSdk.user.usernameSearch(inputParams);
      expect(res.data).toEqual({ id: expect.any(String) });
    });
  });

  describe('User Upload Profile Image Form Data', () => {
    let wallet;

    beforeEach(async () => {
      const inputParams = {
        fcmToken: 'cMctpybZfwk:APA9arnIbla0UDSDGs_w7buoP2apxFIzI6YUdSFPLe2ANR-OrFiaAvJ',
        username: 'userprofilesdk',
      };
      wallet = await this.pSdk.wallet.register(inputParams);
    });

    it('uploads an image with form data', async () => {
      const walletId = wallet.data.walletId;
      const formData = new FormData();
      formData.append('walletId', walletId);
      formData.append('image', fs.createReadStream(path.resolve(__dirname, '../assets/fff.jpg')));

      const res = await this.pSdk.user.uploadProfileImageFormData(walletId, formData);

      expect(res.data).toEqual({
        result: 'success',
        message: 'Profile image was successfully uploaded.',
        profileImage: expect.stringMatching(/^.+\.jpg$/),
      });
    });
  });

  describe('User Image by User ID method', () => {
    let wallet;

    beforeEach(async () => {
      const inputParams = {
        fcmToken: 'abc-123',
        username: 'image-by-userid',
      };
      wallet = await this.pSdk.wallet.register(inputParams);

      const walletId = wallet.data.walletId;
      const formData = new FormData();
      formData.append('walletId', walletId);
      formData.append('image', fs.createReadStream(path.resolve(__dirname, '../assets/fff.jpg')));

      await this.pSdk.user.uploadProfileImageFormData(walletId, formData);
    });

    it('retrieves the user\'s current profile image using user ID', async () => {
      const res = await this.pSdk.user.imageByUserId({
        walletId: wallet.data.walletId,
        userId: wallet.data.userId,
      });

      expect(res.status).toBe(200);
    });
  });
});
