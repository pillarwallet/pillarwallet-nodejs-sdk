import { PillarSdk } from '../..';
import { default as getConfiguration } from '../../utils/requester-configurations/get';
import { Requester } from '../../utils/requester';
import { Configuration } from '../../lib/configuration';

describe('Asset Class', () => {
  let pSdk: PillarSdk;
  const requesterExecuteSpy = jest
    .spyOn(Requester, 'execute')
    .mockResolvedValue('');

  beforeEach(() => {
    pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
      notificationsUrl: 'http://localhost:8081',
      investmentsUrl: 'http://localhost:8082',
    });
  });

  afterEach(() => {
    requesterExecuteSpy.mockClear();
    Configuration.accessToken = '';
  });

  describe('.defaults', () => {
    it('should successfully call with valid data with Authorization header', () => {
      Configuration.accessToken = 'myAccessToken';
      const assetDefaultsData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.asset.defaults(assetDefaultsData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        params: assetDefaultsData,
        url: 'http://localhost:8080/asset/defaults',
      });
    });

    it('should throw an error if called with invalid data', async () => {
      const assetDefaultData = {
        walletId: null,
      };

      try {
        await pSdk.asset.defaults(assetDefaultData);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toEqual('data.walletId should be string');
      }
    });
  });

  describe('.preferred', () => {
    it('should successfully call with valid data with Authorization header', () => {
      Configuration.accessToken = 'myAccessToken';
      const assetPreferredData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.asset.preferred(assetPreferredData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        params: assetPreferredData,
        url: 'http://localhost:8080/asset/preferred',
      });
    });

    it('should throw an error if called with invalid data', async () => {
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
    it('should successfully call with valid data with Authorization header', () => {
      Configuration.accessToken = 'myAccessToken';
      const assetSearchData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        query: 'searchthis',
      };

      pSdk.asset.search(assetSearchData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        params: assetSearchData,
        url: 'http://localhost:8080/asset/search',
      });
    });

    it('should throw an error if called with invalid data', async () => {
      const assetSearchData = {
        walletId: null,
      };

      try {
        await pSdk.asset.search(assetSearchData);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toEqual(
          "data.walletId should be string, data should have required property 'query'",
        );
      }
    });
  });

  describe('.list', () => {
    it('should successfully call with valid data with Authorization header', () => {
      Configuration.accessToken = 'myAccessToken';
      const assetListData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        symbols: ['SYM', 'BOL', 'LOG', 'NASE'],
      };

      pSdk.asset.list(assetListData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        params: assetListData,
        url: 'http://localhost:8080/asset/list',
      });
    });

    it('should throw an error if called with invalid data', async () => {
      const assetListData = {
        walletId: null,
        symbols: false,
      };

      try {
        await pSdk.asset.list(assetListData);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toEqual(
          'data.walletId should be string, data.symbols should be array',
        );
      }
    });
  });
});
