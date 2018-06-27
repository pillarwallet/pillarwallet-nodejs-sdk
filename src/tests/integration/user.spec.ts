const keys = require('../utils/generateKeyPair');
import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

let spy;

describe('user endpoints', () => {
  beforeEach(() => {
    this.pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8082',
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
        username: 'bob123',
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
        profileImage: 'http://photo1.jpg',
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
  });
});
