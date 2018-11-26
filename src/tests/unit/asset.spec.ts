import { PillarSdk } from '../..';
import { default as getConfiguration } from '../../utils/requester-configurations/get';

describe('Asset Class', () => {
  let pSdk: PillarSdk;
  let requesterExecuteSpy: any;

  beforeEach(() => {
    pSdk = new PillarSdk({
      privateKey:
        'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
    });
    requesterExecuteSpy = jest
      .spyOn(pSdk.asset, 'executeRequest')
      .mockResolvedValue('');
  });

  afterEach(() => {
    requesterExecuteSpy.mockClear();
  });

  describe('.defaults', () => {
    it('should successfully call with valid data', () => {
      const assetDefaultsData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.asset.defaults(assetDefaultsData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          defaultRequest: getConfiguration,
          params: assetDefaultsData,
          url: 'http://localhost:8080/asset/defaults',
        }),
      );
    });
  });

  describe('.preferred', () => {
    it('should successfully call with valid data', () => {
      const assetPreferredData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.asset.preferred(assetPreferredData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          defaultRequest: getConfiguration,
          params: assetPreferredData,
          url: 'http://localhost:8080/asset/preferred',
        }),
      );
    });

    it('should not successfully call with valid data', async () => {
      requesterExecuteSpy.mockRestore();
      const assetPreferredData = {
        walletId: null,
      };

      try {
        await pSdk.asset.preferred(assetPreferredData);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toEqual('data.walletId should be string');
      }
    });
  });

  describe('.search', () => {
    it('should successfully call with valid data', () => {
      const assetSearchData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        query: 'searchthis',
      };

      pSdk.asset.search(assetSearchData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          defaultRequest: getConfiguration,
          params: assetSearchData,
          url: 'http://localhost:8080/asset/search',
        }),
      );
    });
  });

  describe('.list', () => {
    it('should successfully call with valid data', () => {
      const assetListData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.asset.list(assetListData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          defaultRequest: getConfiguration,
          params: assetListData,
          url: 'http://localhost:8080/asset/list',
        }),
      );
    });

    it('should successfully call with an additional array of symbols to return', async () => {
      const assetListData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        symbols: ['SYM', 'BOL', 'LOG', 'NASE'],
      };

      pSdk.asset.list(assetListData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          defaultRequest: getConfiguration,
          params: assetListData,
          url: 'http://localhost:8080/asset/list',
        }),
      );
    });
  });
});
