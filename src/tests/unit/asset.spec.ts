import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';
let pSdk: any;

beforeEach(() => {
  pSdk = new PillarSdk({
    privateKey: 'abd23eddea',
  });
});

describe('The Asset Class: Defaults method', () => {
  it ('should successfully call with valid data', () => {
    const assetDefaultsData = {
      walletId: 1,
    };

    const spy = jest.spyOn(Requester, 'execute');
    pSdk.asset.defaults(assetDefaultsData);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const assetDefaultsData = {
      walletId: null,
    };

    try {
      pSdk.asset.defaults(assetDefaultsData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid key', () => {
    let errorThrown;
    const assetDefaultsData = {
      walletId: 1,
    };

    pSdk = new PillarSdk({
      privateKey: null,
    });

    try {
      pSdk.asset.defaults(assetDefaultsData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});

describe('The Asset Class: Search method', () => {
  it ('should successfully call with valid data', () => {
    const assetSearchData = {
      walletId: 1,
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

  it ('should fail when called with invalid key', () => {
    let errorThrown;
    const assetSearchData = {
      walletId: 1,
      query: 'searchthis',
    };

    pSdk = new PillarSdk({
      privateKey: null,
    });

    try {
      pSdk.asset.search(assetSearchData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});
