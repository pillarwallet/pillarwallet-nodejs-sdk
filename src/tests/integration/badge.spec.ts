const hdkey = require('../utils/generateKeyPair');
import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

describe('badge endpoints', () => {
  const requesterExecuteSpy: any = jest.spyOn(Requester, 'execute');
  let pSdk: PillarSdk;

  beforeEach(() => {
    pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
      privateKey: hdkey.privateKey,
    });
  });

  afterEach(() => {
    requesterExecuteSpy.mockClear();
  });

  describe('User Badges', () => {
    it('Expect success', () => {
      const inputParams = {
        walletId: '87bcf0e2-9aaa-4b1a-86f9-9fcf54f1185f',
      };

      pSdk.badge
        .my(inputParams)
        .then((response: any) => {
          return response;
        })
        .catch((error: any) => {
          return error;
        });

      /**
       * TODO: Currently waiting on a development
       * or testing environment before we can asset
       * a correct / expected response. For now, just
       * using a spy to ensure that the request was made.
       */
      expect(requesterExecuteSpy).toHaveBeenCalled();
    });
  });

  describe('Self award badge', () => {
    it('Expect success', () => {
      const inputParams = {
        walletId: '87bcf0e2-9aaa-4b1a-86f9-9fcf54f1185f',
        event: 'test-event',
      };

      pSdk.badge
        .selfAward(inputParams)
        .then((response: any) => {
          return response;
        })
        .catch((error: any) => {
          return error;
        });

      /**
       * TODO: Currently waiting on a development
       * or testing environment before we can asset
       * a correct / expected response. For now, just
       * using a spy to ensure that the request was made.
       */
      expect(requesterExecuteSpy).toHaveBeenCalled();
    });
  });
});
