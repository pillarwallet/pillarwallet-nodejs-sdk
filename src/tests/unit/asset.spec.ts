import { Asset } from  '../../lib/asset';
import { Requester } from '../../utils/requester';
import { RequestPromise } from 'request-promise';
let assetSdk = new Asset();

describe('The Asset Class: Defaults method', () => {
  it ('should successfully call with valid data', () => {
    const assetDefaultsData = {
      walletId: '1',
    };

    const privateKey = '3874hkwhjkdwa';

    const spy = jest.spyOn(Requester, 'execute');
    const assetDefaultsPromise = assetSdk.defaults(assetDefaultsData, privateKey);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const assetDefaultsData = {
      walletId: null
    };

    const privateKey = '3874hkwhjkdwa';

    try {
      assetSdk.defaults(assetDefaultsData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid key', () => {
    let errorThrown;
    const assetDefaultsData = {
      walletId: '1',
    };

    const privateKey = null;

    try {
      assetSdk.defaults(assetDefaultsData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});

describe('The Asset Class: Search method', () => {
  it ('should successfully call with valid data', () => {
    const assetSearchData = {
      walletId: '1',
      query: 'searchthis',
    };

    const privateKey = '3874hkwhjkdwa';

    const spy = jest.spyOn(Requester, 'execute');
    const assetSearchPromise = assetSdk.search(assetSearchData, privateKey);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const assetSearchData = {
      walletId: '1',
      query: null,
    };

    const privateKey = '3874hkwhjkdwa';

    try {
      assetSdk.search(assetSearchData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid key', () => {
    let errorThrown;
    const assetSearchData = {
      walletId: '1',
      query: 'searchthis',
    };

    const privateKey = null;

    try {
      assetSdk.search(assetSearchData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});