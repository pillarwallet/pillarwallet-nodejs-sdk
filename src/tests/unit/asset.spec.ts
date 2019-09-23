/*
Copyright (C) 2019 Stiftung Pillar Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
import { PillarSdk } from '../..';
import { default as getConfiguration } from '../../utils/requester-configurations/get';
import { Requester } from '../../utils/requester';
import { Configuration } from '../../lib/configuration';

describe('Asset Class', () => {
  let pSdk: PillarSdk;

  const requesterExecuteSpy = jest
    .spyOn(Requester, 'execute')
    .mockResolvedValue('');
  const accesToken = 'myAccessToken';

  beforeEach(() => {
    pSdk = new PillarSdk({});
  });

  afterEach(() => {
    requesterExecuteSpy.mockClear();
    Configuration.setAuthTokens('', '');
  });

  describe('.defaults', () => {
    it('should successfully call with valid data and Authorization header', () => {
      Configuration.setAuthTokens(accesToken, '');
      const assetDefaultsData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.asset.defaults(assetDefaultsData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        params: assetDefaultsData,
        url: 'https://localhost:8080/asset/defaults',
      });
    });

    it('should successfully call with valid data, Authorization and Network header', () => {
      Configuration.setAuthTokens(accesToken, '');
      pSdk.setNetwork('mainnet');
      const assetDefaultsData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.asset.defaults(assetDefaultsData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: 'Bearer myAccessToken', Network: 'mainnet' },
        params: assetDefaultsData,
        url: 'https://localhost:8080/asset/defaults',
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
    it('should successfully call with valid data and Authorization header', () => {
      Configuration.setAuthTokens(accesToken, '');
      const assetPreferredData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.asset.preferred(assetPreferredData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        params: assetPreferredData,
        url: 'https://localhost:8080/asset/preferred',
      });
    });

    it('should successfully call with valid data, Authorization and Network header', () => {
      Configuration.setAuthTokens(accesToken, '');
      pSdk.setNetwork('mainnet');
      const assetPreferredData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.asset.preferred(assetPreferredData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: 'Bearer myAccessToken', Network: 'mainnet' },
        params: assetPreferredData,
        url: 'https://localhost:8080/asset/preferred',
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
    it('should successfully call with valid data and Authorization header', () => {
      Configuration.setAuthTokens(accesToken, '');
      const assetSearchData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        query: 'searchthis',
      };

      pSdk.asset.search(assetSearchData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        params: assetSearchData,
        url: 'https://localhost:8080/asset/search',
      });
    });

    it('should successfully call with valid data, Authorization and Network header', () => {
      Configuration.setAuthTokens(accesToken, '');
      pSdk.setNetwork('mainnet');
      const assetSearchData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        query: 'searchthis',
      };

      pSdk.asset.search(assetSearchData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: 'Bearer myAccessToken', Network: 'mainnet' },
        params: assetSearchData,
        url: 'https://localhost:8080/asset/search',
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
    it('should successfully call with valid data and Authorization header', () => {
      Configuration.setAuthTokens(accesToken, '');
      const assetListData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        symbols: ['SYM', 'BOL', 'LOG', 'NASE'],
      };

      pSdk.asset.list(assetListData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        params: assetListData,
        url: 'https://localhost:8080/asset/list',
      });
    });

    it('should successfully call with valid data, Authorization and Network header', () => {
      Configuration.setAuthTokens(accesToken, '');
      pSdk.setNetwork('mainnet');
      const assetListData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        symbols: ['SYM', 'BOL', 'LOG', 'NASE'],
      };

      pSdk.asset.list(assetListData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: 'Bearer myAccessToken', Network: 'mainnet' },
        params: assetListData,
        url: 'https://localhost:8080/asset/list',
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
