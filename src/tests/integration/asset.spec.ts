// tslint:disable: object-shorthand-properties-first
const hdkey = require('../utils/generateKeyPair');
import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

// TODO: Mock api using nock library
describe.skip('asset endpoints', () => {
  const requesterExecuteSpy: any = jest.spyOn(Requester, 'execute');
  let pSdk: PillarSdk;

  let walletId: string;
  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;
  // Key pairs
  const privateKey = hdkey.privateKey.toString();
  const walletRegister = {
    privateKey,
    fcmToken: '987qwe',
    username,
  };

  beforeAll(async () => {
    let response: any;
    pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
      notificationsUrl: 'http://localhost:8081',
      investmentsUrl: 'http://localhost:8082',
    });
    try {
      response = await pSdk.wallet.registerAuthServer(walletRegister);
      walletId = response.data.walletId;
    } catch (e) {
      throw e;
    }
  });

  afterEach(() => {
    requesterExecuteSpy.mockClear();
  });

  describe('Asset Search', () => {
    it('Expect success', () => {
      const inputParams = {
        walletId: '87bcf0e2-9aaa-4b1a-86f9-9fcf54f1185f',
        query: 'p',
      };

      pSdk.asset
        .search(inputParams)
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
      expect(requesterExecuteSpy).toHaveBeenCalled();
    });
  });

  describe('Asset list', () => {
    it('Expect success', () => {
      const inputParams = {
        walletId: '87bcf0e2-9aaa-4b1a-86f9-9fcf54f1185f',
      };

      pSdk.asset
        .list(inputParams)
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
      expect(requesterExecuteSpy).toHaveBeenCalled();
    });
  });
});
