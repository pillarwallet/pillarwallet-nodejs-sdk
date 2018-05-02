import { User } from  '../../lib/user';
import { Requester } from '../../utils/requester';
import { RequestPromise } from 'request-promise';
const userSdk = new User();

describe('The User Class: Update method', () => {
  it ('should successfully call with valid data', () => {
    const userUpdateData = {
      walletId: '123',
      firstName: 'Homer',
      lastName: 'Simpson',
      email: 'chunkylover69@aol.com',
      phone: '911',
      country: 'United States',
      state: 'NA',
      city: 'Springfield',
      tagline: 'Tagline',
      taglineStatus: 'Busy',
      userSearchable: 'dunno',
      profileImage: 'http://homer.jpg',
    };

    const privateKey = '3874hkwhjkdwa';

    const spy = jest.spyOn(Requester, 'execute');
    const userPromise = userSdk.update(userUpdateData, privateKey);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const userUpdateData = {
      walletId: '123',
      firstName: 'Homer',
      lastName: 'Simpson',
      email: 'chunkylover69@aol.com',
      phone: '911',
      country: 'United States',
      state: 'NA',
      city: 'Springfield',
      tagline: 'Tagline',
      taglineStatus: 'Busy',
      userSearchable: 'dunno',
    };

    const privateKey = '3874hkwhjkdwa';

    try {
      userSdk.update(userUpdateData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid key', () => {
    let errorThrown;
    const userUpdateData = {
      walletId: '123',
      firstName: 'Homer',
      lastName: 'Simpson',
      email: 'chunkylover69@aol.com',
      phone: '911',
      country: 'United States',
      state: 'NA',
      city: 'Springfield',
      tagline: 'Tagline',
      taglineStatus: 'Busy',
      userSearchable: 'dunno',
      profileImage: 'http://homer.jpg',
    };

    const privateKey = null;

    try {
      userSdk.update(userUpdateData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});

describe('The User Class: Info method', () => {
  it ('should successfully call with valid data', () => {
    const userInfoData = {
      walletId: '123',
    };

    const privateKey = '3874hkwhjkdwa';

    const spy = jest.spyOn(Requester, 'execute');
    const userPromise = userSdk.info(userInfoData, privateKey);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const userInfoData = {
      walletId: null,
    };

    const privateKey = '3874hkwhjkdwa';

    try {
      userSdk.info(userInfoData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid key', () => {
    let errorThrown;
    const userInfoData = {
      walletId: '123',
    };

    const privateKey = null;

    try {
      userSdk.info(userInfoData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});

describe('The User Class: Search method', () => {
  it ('should successfully call with valid data', () => {
    const userSearchData = {
      walletId: '123',
      query: 'searchforme',
    };

    const privateKey = '3874hkwhjkdwa';

    const spy = jest.spyOn(Requester, 'execute');
    const userPromise = userSdk.search(userSearchData, privateKey);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const userInfoData = {
      walletId: '123',
      query: null,
    };

    const privateKey = '3874hkwhjkdwa';

    try {
      userSdk.search(userInfoData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid key', () => {
    let errorThrown;
    const userInfoData = {
      walletId: '123',
      query: 'searchforme',
    };

    const privateKey = null;

    try {
      userSdk.search(userInfoData, privateKey);
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

    const privateKey = '3874hkwhjkdwa';

    const spy = jest.spyOn(Requester, 'execute');
    const userPromise = userSdk.delete(userInfoData, privateKey);

    expect(spy).toBeCalled();
  });

  it ('should fail when called with invalid data', () => {
    let errorThrown;
    const userInfoData = {
      walletId: null,
    };

    const privateKey = '3874hkwhjkdwa';

    try {
      userSdk.delete(userInfoData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(TypeError);
  });

  it ('should fail when called with invalid key', () => {
    let errorThrown;
    const userInfoData = {
      walletId: '123',
    };

    const privateKey = null;

    try {
      userSdk.delete(userInfoData, privateKey);
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});
