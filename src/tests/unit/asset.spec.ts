import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

describe('Asset Class', () => {
  const requesterExecuteSpy = jest.spyOn(Requester, 'execute');
  let pSdk: PillarSdk;

  beforeEach(() => {
    pSdk = new PillarSdk({
      privateKey:
        'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
    });
  });

  afterEach(() => {
    requesterExecuteSpy.mockClear();
  });

  describe('The Asset Class: Defaults method', () => {
    it('should successfully call with valid data', () => {
      const assetDefaultsData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.asset.defaults(assetDefaultsData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { 'X-API-Signature': expect.anything() },
          params: assetDefaultsData,
          url: 'http://localhost:8080/asset/defaults',
        }),
      );
    });
  });

  describe('The Asset Class: Preferred method', () => {
    it('should successfully call with valid data', () => {
      const assetPreferredData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.asset.preferred(assetPreferredData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { 'X-API-Signature': expect.anything() },
          params: assetPreferredData,
          url: 'http://localhost:8080/asset/preferred',
        }),
      );
    });

    it('should not successfully call with valid data', () => {
      const assetPreferredData = {
        walletId: null,
      };

      expect(() => {
        pSdk.asset.preferred(assetPreferredData);
      }).toThrowError(TypeError);
      expect(requesterExecuteSpy).not.toHaveBeenCalled();
    });
  });

  describe('The Asset Class: Search method', () => {
    it('should successfully call with valid data', () => {
      const assetSearchData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        query: 'searchthis',
      };

      pSdk.asset.search(assetSearchData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { 'X-API-Signature': expect.anything() },
          params: assetSearchData,
          url: 'http://localhost:8080/asset/search',
        }),
      );
    });
  });

  describe('The Asset Class: List method', () => {
    it('should successfully call with valid data', () => {
      const assetListData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.asset.list(assetListData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { 'X-API-Signature': expect.anything() },
          params: assetListData,
          url: 'http://localhost:8080/asset/list',
        }),
      );
    });

    it('should successfully call with an additional array of symvols to return', async () => {
      const assetListData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        symbols: ['SYM', 'BOL', 'LOG', 'NASE'],
      };

      const lol = await pSdk.asset.list(assetListData);
      console.log(lol);

      expect(requesterExecuteSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { 'X-API-Signature': expect.anything() },
          params: assetListData,
          url: 'http://localhost:8080/asset/list',
        }),
      );
    });
  });
});
