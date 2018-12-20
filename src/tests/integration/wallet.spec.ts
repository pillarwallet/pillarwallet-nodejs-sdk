// tslint:disable: object-shorthand-properties-first
const keys = require('../utils/generateKeyPair');
import { Requester } from '../../utils/requester';
import { Register } from '../../lib/register';
import { PillarSdk } from '../..';

// TODO: TECHNICAL DEPT!! Create a configurable way to use or one Mock for api (e.g. nock library)
// TODO: or the real api that is currently being used.

describe.skip('wallet endpoints', () => {
  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;
  const requesterExecuteSpy: any = jest.spyOn(Requester, 'execute');
  let pSdk: PillarSdk;
  let walletId: string;
  // Key pairs
  const privateKey = keys.privateKey.toString();

  const walletRegister = {
    privateKey,
    fcmToken: '987qwe',
    username,
  };

  beforeAll(async () => {
    pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
      notificationsUrl: 'http://localhost:8081',
      investmentsUrl: 'http://localhost:8082',
    });
  });

  afterEach(() => {
    requesterExecuteSpy.mockClear();
  });

  describe('The Wallet registerAuthServer method', () => {
    it('should return the expected response', async () => {
      let response: any;
      try {
        response = await pSdk.wallet.registerAuthServer(walletRegister);
        walletId = response.data.walletId;
      } catch (e) {
        throw e;
      }
      expect(response.data).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        accessTokenExpiresAt: expect.any(String),
        refreshTokenExpiresAt: expect.any(String),
        fcmToken: expect.any(String),
        userId: expect.any(String),
        walletId: expect.any(String),
      });
    });
  });

  describe('Wallet Update', () => {
    it('Expect Success for update Method', () => {
      const inputParams = {
        walletId,
        fcmToken: 'increaseThePeace',
      };

      const result = pSdk.wallet
        .update(inputParams)
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

  describe('The Register refreshAuthToken method', () => {
    it('refresh token', async () => {
      const responseRefresh = await Register.refreshAuthToken();
      expect(responseRefresh.data).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        accessTokenExpiresAt: expect.any(String),
        refreshTokenExpiresAt: expect.any(String),
      });
    });
  });

  // we still can not automatically run the integration tests.
  describe('The Wallet registerAddress method', () => {
    it('calls the API with valid data', async () => {
      const inputParams = {
        fcmToken:
          'cMctpybZfwk:APA9arnIbla0UDSDGs_w7buoP2apxFIzI6YUdSFPLe2ANR-OrFiaAvJ',
        username: 'bob123',
      };

      const inputParams2 = {
        walletId,
        blockchain: 'ethereum',
        blockchainAddress: '0x3eA19bddb978Db62344Ffba5d37Ba41C83C57917',
        fcmToken: 'sdcxxczdsds',
      };

      const response = await pSdk.wallet.registerAddress(inputParams2);
      expect(response.data).toEqual({
        result: 'success',
        message: 'Successfully registered address on BCX',
      });
    });
  });

  // we still can not automatically run the integration tests.
  describe('The Wallet unregisterAddress method', () => {
    it('calls the API with valid data', async () => {
      const inputParams = {
        fcmToken:
          'cMctpybZfwk:APA9arnIbla0UDSDGs_w7buoP2apxFIzI6YUdSFPLe2ANR-OrFiaAvJ',
        username: 'bob123',
      };

      const inputParams2 = {
        walletId,
        blockchain: 'ethereum',
        blockchainAddress: '0x3eA19bddb978Db62344Ffba5d37Ba41C83C57917',
        fcmToken: 'sdcxxczdsds',
      };

      await pSdk.wallet.registerAddress(inputParams2);

      const inputParams3 = {
        walletId,
        blockchain: 'ethereum',
        blockchainAddress: '0x3eA19bddb978Db62344Ffba5d37Ba41C83C57917',
      };

      const response = await pSdk.wallet.unregisterAddress(inputParams3);
      expect(response.data).toEqual({
        result: 'success',
        message: 'Successfully unregistered address on BCX',
      });
    });
  });
});
