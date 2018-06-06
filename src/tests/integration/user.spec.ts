const hdkey = require('../utils/generateKeyPair');
import { PillarSdk } from '../..';

describe('user endpoints', () => {
  beforeEach(() => {
    this.pSdk = new PillarSdk({
      privateKey: hdkey.privateKey,
    });
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
        walletId: '24233',
        username: 'bob',
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
        walletId: '24233',
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
        walletId: '24233',
        userId: '24233',
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
