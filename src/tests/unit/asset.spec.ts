import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';
let pSdk: any;

beforeEach(() => {
  pSdk = new PillarSdk({
    privateKey: 'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
  });
});

describe('The Asset Class: Defaults method', () => {
  it ('should successfully call with valid data', () => {
    const assetDefaultsData = {
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    const spy = jest.spyOn(Requester, 'execute');
    pSdk.asset.defaults(assetDefaultsData);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const assetDefaultsData = {
      walletId: -1,
    };

    try {
      pSdk.asset.defaults(assetDefaultsData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

});

describe('The Asset Class: Search method', () => {
  it ('should successfully call with valid data', () => {
    const assetSearchData = {
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      query: 'searchthis',
    };

    const spy = jest.spyOn(Requester, 'execute');
    pSdk.asset.search(assetSearchData);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const assetSearchData = {
      walletId: 1,
      query: null,
    };

    try {
      pSdk.asset.search(assetSearchData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid WalletId', () => {
    let errorThrown;
    const assetSearchData = {
      walletId: -1,
      query: 'searchthis',
    };

    try {
      pSdk.asset.search(assetSearchData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });

  describe('The Asset Class: List method', () => {
    it ('should successfully call with valid data', () => {
      const assetListData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      const spy = jest.spyOn(Requester, 'execute');
      pSdk.asset.list(assetListData);

      expect(spy).toBeCalled();
    });

    it ('should fail when called with invalid data', () => {
      let errorThrown;
      const assetListData = {
        walletId: -1,
      };

      try {
        pSdk.asset.list(assetListData);
      } catch (e) {
        errorThrown = e;
      }

      expect(errorThrown).toBeInstanceOf(TypeError);
    });
  });

  describe('The Asset Class: Delete method', () => {
    it ('should successfully call with valid data', () => {
      const assetDeleteData = {
        name: 'xxx',
      };

      const spy = jest.spyOn(Requester, 'execute');
      pSdk.asset.delete(assetDeleteData);

      expect(spy).toBeCalled();
    });

    it ('should fail when called with invalid data', () => {
      let errorThrown;
      const assetDeleteData = {
        walletId: -1,
      };

      try {
        pSdk.asset.delete(assetDeleteData);
      } catch (e) {
        errorThrown = e;
      }

      expect(errorThrown).toBeInstanceOf(TypeError);
    });
  });

  describe('The Asset Class: Update method', () => {
    it ('should successfully call with valid data', () => {
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
        isDefault: false
      };

      const spy = jest.spyOn(Requester, 'execute');
      pSdk.asset.update(assetUpdateData);

      expect(spy).toBeCalled();
    });

    it ('should fail when called with invalid data', () => {
      let errorThrown;
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
        isDefault: 'blabla'
      };

      try {
        pSdk.asset.update(assetUpdateData);
      } catch (e) {
        errorThrown = e;
      }

      expect(errorThrown).toBeInstanceOf(TypeError);
    });
  });
});
