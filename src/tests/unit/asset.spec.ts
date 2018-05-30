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
});
