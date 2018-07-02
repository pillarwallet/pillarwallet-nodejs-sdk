import { Requester } from '../../utils/requester';
import { User } from '../../lib/user';
import { HttpEndpoints } from '../../lib/constants/httpEndpoints';
import { default as postConfiguration } from '../../utils/requester-configurations/post';

const userValidateSchema = require('../../schemas/user/validate.json');

describe('User Class', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
    user.initialise({});

    jest.spyOn(user, 'validation').mockImplementationOnce(() => undefined);
    jest.spyOn(user, 'checkSignature').mockImplementationOnce(() => 'signature');
    jest.spyOn(Requester, 'execute').mockImplementationOnce(() => Promise.resolve());
  });

  afterEach(() => {
    Requester.execute.mockRestore();
  });

  describe('Update method', () => {
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

      user.update(userUpdateData);

      expect(Requester.execute).toHaveBeenCalledWith(
        expect.objectContaining(
          {
            headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
            data: userUpdateData,
            url: 'http://localhost:8080/user/update',
          }),
      );
    });

  });

  describe('Info method', () => {
    it('should successfully call with valid data', () => {
      const userInfoData = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      };

      user.info(userInfoData);

      expect(Requester.execute).toHaveBeenCalledWith(
        expect.objectContaining(
          {
            headers: {'X-API-Signature': expect.stringMatching(/.+/)},
            params: userInfoData,
            url: 'http://localhost:8080/user/info',
          }),
      );
    });

  });

  describe('Search method', () => {
    it('should successfully call with valid data', () => {
      const userSearchData = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
        query: 'searchforme',
      };

      user.search(userSearchData);

      expect(Requester.execute).toHaveBeenCalledWith(
        expect.objectContaining(
          {
            headers: {'X-API-Signature': expect.stringMatching(/.+/)},
            params: userSearchData,
            url: 'http://localhost:8080/user/search',
          }),
      );
    });

  });

  describe('Delete method', () => {
    it('should successfully call with valid data', () => {
      const userInfoData = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      };

      user.delete(userInfoData);

      expect(Requester.execute).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
          data: userInfoData,
          url: 'http://localhost:8080/user/delete',
        }),
    );
    });
  });

  describe('Username Search method', () => {
    it('should successfully call with valid data', () => {
      const usernameSearch = {
        username: 'bob',
      };

      user.usernameSearch(usernameSearch);

      expect(Requester.execute).toHaveBeenCalledWith(
        expect.objectContaining(
          {
            headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
            params: usernameSearch,
            url: 'http://localhost:8080/user/search-username',
          }),
      );
    });
  });

  describe('Validate method', () => {
    it('should successfully call with valid data', () => {
      const data = { username: 'Bob' };

      jest.spyOn(user, 'executeRequest').mockImplementation(
        () => Promise.resolve()
      );

      user.validate(data);

      expect(user.executeRequest).toHaveBeenCalledWith({
        data,
        schema: userValidateSchema,
        defaultRequest: postConfiguration,
        url: 'http://localhost:8080' + HttpEndpoints.USER_VALIDATE,
        checkSignature: false,
      });
    });
  });
});
