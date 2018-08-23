import { PillarSdk } from '../..';
import { Requester } from '../../utils/requester';

let pSdk: PillarSdk;

describe('The Investment Class', () => {
  beforeEach(() => {
    pSdk = new PillarSdk({
      privateKey: 'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
      investmentsUrl: 'http://localhost:8082',
    });
    jest.spyOn(Requester, 'execute').mockImplementationOnce(() => Promise.resolve());
  });

  afterEach(() => {
    Requester.execute.mockRestore();
  });

  describe('depositRequest method', () => {
    it('should successfully call with valid data', async () => {
      const inputParams =
        {
          walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
          currency: 'GBP',
          serviceProvider: 'Nivaura',
        };

      await pSdk.investments.depositRequest(inputParams);

      expect(Requester.execute).toHaveBeenCalledWith(
        expect.objectContaining(
          {
            data: inputParams,
            url: 'http://localhost:8082/investment/wallet/deposit-request',
          }),
      );
    });

    it('should fail validation if one of the parameters is missing',  async () => {
      const inputParams = {
        currency: 'GBP',
        serviceProvider: 'Nivaura',
      };

      try {
        await pSdk.investments.depositRequest(inputParams);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message)
          .toBe('data should have required property \'walletId\'');
      }
    });

    it('should fail validations if the currency is missing', async () => {
      const inputParams = {
        walletId: '323423-adabab',
        serviceProvider: 'Nivaura',
      };

      try {
        await pSdk.investments.depositRequest(inputParams);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message)
          .toBe('data should have required property \'currency\'');
      }
    });

    it('should fail validations if the walletId is not string', async () => {
      const inputParams = {
        walletId: 1323,
        currency: 'GBP',
      };

      try {
        await pSdk.investments.depositRequest(inputParams);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message)
          .toBe('data.walletId should be string');
      }
    });

    it('should fail validations if the currency is not string', async () => {
      const inputParams = {
        currency: 1323,
        walletId: '1323',
      };

      try {
        await pSdk.investments.depositRequest(inputParams);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message)
          .toBe('data.currency should be string');
      }
    });
  });
});
