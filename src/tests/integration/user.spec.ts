const keys = require('../utils/generateKeyPair');
import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

let spy;

describe('user endpoints', () => {
  beforeEach(() => {
    this.pSdk = new PillarSdk({
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
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
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
        status: 'pending|OTP-verified|active',
        verificationService: 'Nivaura',
        verificationStatus: 'approved',
        verificationReference: 'x1234y44',
        investorClassification: 'sophisticated',
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
        walletId: '24233',
        username: 'bob',
      };

      this.pSdk.user.info(inputParams)
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

    it('User search', () => {
      const inputParams = {
        walletId: '24233',
        query: 'Homer',
      };

      this.pSdk.user.search(inputParams)
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

    it('User delete', () => {
      const inputParams = {
        walletId: '24233',
        userId: '24233',
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
  });
});
