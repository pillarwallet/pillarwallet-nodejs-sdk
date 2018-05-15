import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';
let pSdk: any;

beforeEach(() => {
  pSdk = new PillarSdk({
    privateKey: 'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
  });
});

describe('The User Class: Update method', () => {
  it ('should successfully call with valid data', () => {
    const userUpdateData = {
      walletId: 123,
      firstName: 'Homer',
      lastName: 'Simpson',
      email: 'chunkylover69@aol.com',
      phone: '911',
      country: 'United States',
      state: 'NA',
      city: 'Springfield',
      tagline: 'Tagline',
      taglineStatus: true,
      userSearchable: true,
      profileImage: 'http://homer.jpg',
    };

    const spy = jest.spyOn(Requester, 'execute');
    pSdk.user.update(userUpdateData);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const userUpdateData = {
      walletId: 123,
      firstName: 'Homer',
      lastName: 'Simpson',
      email: 'chunkylover69@aol.com',
      phone: '911',
      country: 'United States',
      state: 'NA',
      city: 'Springfield',
      tagline: 'Tagline',
      taglineStatus: 'Busy',    //here
      userSearchable: 'dunno', //here
    };

    try {
      pSdk.user.update(userUpdateData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid email', () => {
    let errorThrown;
    const userUpdateData = {
      walletId: 123,
      firstName: 'Homer',
      lastName: 'Simpson',
      email: '@aol.com',
      phone: '911',
      country: 'United States',
      state: 'NA',
      city: 'Springfield',
      tagline: 'Tagline',
      taglineStatus: true,
      userSearchable: true,
      profileImage: 'http://homer.jpg',
    };

    try {
      pSdk.user.update(userUpdateData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });

  it ('should fail when called with invalid profileImageUri', () => {
    let errorThrown;
    const userUpdateData = {
      walletId: 123,
      firstName: 'Homer',
      lastName: 'Simpson',
      email: '@aol.com',
      phone: '911',
      country: 'United States',
      state: 'NA',
      city: 'Springfield',
      tagline: 'Tagline',
      taglineStatus: true,
      userSearchable: true,
      profileImage: 'homer.jpg',
    };

    try {
      pSdk.user.update(userUpdateData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});

describe('The User Class: Info method', () => {
  it ('should successfully call with valid data', () => {
    const userInfoData = {
      walletId: 123,
    };

    const spy = jest.spyOn(Requester, 'execute');
    pSdk.user.info(userInfoData);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const userInfoData = {
      walletId: null,
    };

    try {
      pSdk.user.info(userInfoData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid id', () => {
    let errorThrown;
    const userInfoData = {
      walletId: -123,
    };

    try {
      pSdk.user.info(userInfoData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});

describe('The User Class: Search method', () => {
  it ('should successfully call with valid data', () => {
    const userSearchData = {
      walletId: 123,
      query: 'searchforme',
    };

    const spy = jest.spyOn(Requester, 'execute');
    pSdk.user.search(userSearchData);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const userInfoData = {
      walletId: 123,
      query: null,
    };

    try {
      pSdk.user.search(userInfoData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid id', () => {
    let errorThrown;
    const userInfoData = {
      walletId: -123,
      query: 'searchforme',
    };

    try {
      pSdk.user.search(userInfoData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});

describe('The User Class: Delete method', () => {
  it ('should successfully call with valid data', () => {
    const userInfoData = {
      walletId: 123,
    };

    const spy = jest.spyOn(Requester, 'execute');
    pSdk.user.delete(userInfoData);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const userInfoData = {
      walletId: null,
    };

    try {
      pSdk.user.delete(userInfoData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid id', () => {
    let errorThrown;
    const userInfoData = {
      walletId: -123,
    };

    try {
      pSdk.user.delete(userInfoData);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});
