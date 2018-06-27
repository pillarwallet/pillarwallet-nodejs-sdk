import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';
import { HttpEndpoints } from '../../lib/constants/httpEndpoints';
import { default as postConfiguration } from '../../utils/requester-configurations/post';

const userValidateSchema = require('../../schemas/user/validate.json');

beforeEach(() => {
  this.pSdk = new PillarSdk({
    privateKey: 'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
  });
});

describe('The User Class: Update method', () => {
  it('should successfully call with valid data', () => {
    const userUpdateData =
      {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
        username: 'bob123',
        firstName: 'Bob',
        lastName: 'Jones',
        email: 'bob@acme-corp.com',
        phone: '+44 77 1111 2222',
        country: 'UK',
        state: 'CA',
        city: 'London',
        tagline: 'Social media consultant',
        taglineStatus: false,
        userSearchable: true,
        profileImage: 'http://photo1.jpg',
      };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.user.update(userUpdateData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          data: userUpdateData,
          url: 'http://localhost:8080/user/update',
        }),
    );
  });

});

describe('The User Class: Info method', () => {
  it('should successfully call with valid data', () => {
    const userInfoData = {
      walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.user.info(userInfoData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: {'X-API-Signature': expect.anything()},
          params: userInfoData,
          url: 'http://localhost:8080/user/info',
        }),
    );
  });

});

describe('The User Class: Search method', () => {
  it('should successfully call with valid data', () => {
    const userSearchData = {
      walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      query: 'searchforme',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.user.search(userSearchData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: {'X-API-Signature': expect.anything()},
          params: userSearchData,
          url: 'http://localhost:8080/user/search',
        }),
    );
  });

});

describe('The User Class: Delete method', () => {
  it('should successfully call with valid data', () => {
    const userInfoData = {
      walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.user.delete(userInfoData);

    expect(spy).toHaveBeenCalledWith(
    expect.objectContaining(
      {
        headers: { 'X-API-Signature': expect.anything() },
        data: userInfoData,
        url: 'http://localhost:8080/user/delete',
      }),
  );
  });
});

describe('The User Class: Username Search method', () => {
  it('should successfully call with valid data', () => {
    const usernameSearch = {
      username: 'bob',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.user.usernameSearch(usernameSearch);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          params: usernameSearch,
          url: 'http://localhost:8080/user/search-username',
        }),
    );
  });
});

describe('The User Class: Validate method', () => {
  beforeEach(() => {
    jest.spyOn(this.pSdk.user, 'executeRequest').mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    this.pSdk.user.executeRequest.mockClear();
  });

  it('should successfully call with valid data', async () => {
    const data = { username: 'Bob' };

    await this.pSdk.user.validate(data);
    expect(this.pSdk.user.executeRequest).toHaveBeenCalledWith(
      data,
      userValidateSchema,
      postConfiguration,
      HttpEndpoints.USER_VALIDATE,
      false,
    );
  });
});
