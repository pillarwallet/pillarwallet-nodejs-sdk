import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

beforeEach(() => {
  this.pSdk = new PillarSdk({
    privateKey: 'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
  });
});

describe('The Asset Class: Defaults method', () => {
  it('should successfully call with valid data', () => {
    const assetDefaultsData = {
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.asset.defaults(assetDefaultsData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          params: assetDefaultsData,
          url: 'http://localhost:8080/asset/defaults',
        }));
  });
});

describe('The Asset Class: Search method', () => {
  it('should successfully call with valid data', () => {
    const assetSearchData = {
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      query: 'searchthis',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.asset.search(assetSearchData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          params: assetSearchData,
          url: 'http://localhost:8080/asset/search',
        },
      ),
    );
  });
});

describe('The Asset Class: List method', () => {
  it('should successfully call with valid data', () => {
    const assetListData = {
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.asset.list(assetListData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature':  expect.anything() },
          params: assetListData,
          url: 'http://localhost:8080/asset/list',
        },
      ),
    );
  });

});

describe('The Asset Class: Delete method', () => {
  it('should successfully call with valid data', () => {
    const assetDeleteData = {
      name: 'xxx',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.asset.delete(assetDeleteData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature':  expect.anything() },
          data: assetDeleteData,
          url: 'http://localhost:8080/asset/delete',
        },
      ),
    );
  });
});

describe('The Asset Class: Update method', () => {
  it('should successfully call with valid data', () => {
    const assetUpdateData = {
      name: 'XYZ Token',
      symbol: 'XYZ',
      address: '0xc1912fee45d61c87cc5ea59dae31190fffff232b',
      decimals: 18,
      description: 'The token to change the world',
      wallpaperUrl: 'http://www.example.com/wallpaper1.jpg',
      iconUrl: 'http://www.example.com/icon1.jpg',
      email: 'bob@example.com',
      telegram: 'example',
      twitter: '@example',
      website: 'http://www.example.com',
      whitepaper: 'http://www.example.com/whitepaper.pdf',
      isDefault: false,
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.asset.update(assetUpdateData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature':  expect.anything() },
          data: assetUpdateData,
          url: 'http://localhost:8080/asset/update',
        },
      ),
    );
  });
});
