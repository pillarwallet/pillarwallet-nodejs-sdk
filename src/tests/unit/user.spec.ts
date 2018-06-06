import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

beforeEach(() => {
  this.pSdk = new PillarSdk({
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
    this.pSdk.user.update(userUpdateData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          body: userUpdateData,
          url: 'http://localhost:8080/user/update',
        }),
    );
  });

});

describe('The User Class: Info method', () => {
  it ('should successfully call with valid data', () => {
    const userInfoData = {
      walletId: 123,
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.user.info(userInfoData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          qs: userInfoData,
          url: 'http://localhost:8080/user/info',
        }),
    );
  });

});

describe('The User Class: Search method', () => {
  it ('should successfully call with valid data', () => {
    const userSearchData = {
      walletId: 123,
      query: 'searchforme',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.user.search(userSearchData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          qs: userSearchData,
          url: 'http://localhost:8080/user/search',
        }),
    );
  });

});

describe('The User Class: Delete method', () => {
  it ('should successfully call with valid data', () => {
    const userInfoData = {
      walletId: 123,
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.user.delete(userInfoData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          body: userInfoData,
          url: 'http://localhost:8080/user/delete',
        }),
    );
  });

});
