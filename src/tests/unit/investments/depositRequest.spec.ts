import { PillarSdk } from '../../../index';
import { Requester } from '../../../utils/requester';
import { Configuration } from '../../../lib/configuration';

describe('The Investment Class', () => {
  let pSdk: PillarSdk;

  // Mock Register Process
  Configuration.accessToken = 'OneAccessToken';
  Configuration.refreshToken = 'OneRefreshToken';

  beforeEach(() => {
    pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
      notificationsUrl: 'http://localhost:8081',
      investmentsUrl: 'http://localhost:8082',
    });
    jest
      .spyOn(Requester, 'execute')
      .mockImplementationOnce(() => Promise.resolve());
  });

  afterEach(() => {
    Requester.execute.mockRestore();
  });

  describe('depositRequest method', () => {
    it('should successfully call with valid data', async () => {
      const inputParams = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
        currency: 'GBP',
        serviceProvider: 'Nivaura',
      };

      await pSdk.investments.depositRequest(inputParams);

      expect(Requester.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          data: inputParams,
          url: 'http://localhost:8082/investment/wallet/deposit-request',
        }),
      );
    });

    it('should fail validation if one of the parameters is missing', async () => {
      const inputParams = {
        currency: 'GBP',
        serviceProvider: 'Nivaura',
      };

      expect.assertions(2);
      try {
        await pSdk.investments.depositRequest(inputParams);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toBe("data should have required property 'walletId'");
      }
    });

    it('should fail validations if the currency is missing', async () => {
      const inputParams = {
        walletId: '323423-adabab',
        serviceProvider: 'Nivaura',
      };

      expect.assertions(2);
      try {
        await pSdk.investments.depositRequest(inputParams);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toBe("data should have required property 'currency'");
      }
    });

    it('should fail validations if the walletId is not string', async () => {
      const inputParams = {
        walletId: 1323,
        currency: 'GBP',
      };

      expect.assertions(2);
      try {
        await pSdk.investments.depositRequest(inputParams);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toBe('data.walletId should be string');
      }
    });

    it('should fail validations if the currency is not string', async () => {
      const inputParams = {
        currency: 1323,
        walletId: '1323',
      };

      expect.assertions(2);
      try {
        await pSdk.investments.depositRequest(inputParams);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toBe('data.currency should be string');
      }
    });
  });
});
