import { Requester } from '../../utils/requester';
import { User } from '../../lib/user';
import { Configuration } from '../../lib/configuration';
import { HttpEndpoints } from '../../lib/constants/httpEndpoints';
import { default as postConfiguration } from '../../utils/requester-configurations/post';
import { default as deleteConfiguration } from '../../utils/requester-configurations/delete';
import { default as getConfiguration } from '../../utils/requester-configurations/get';
import { Readable } from 'stream';

const userValidateSchema = require('../../schemas/user/validate.json');
const profileImageSchema = require('../../schemas/user/profileImage.json');
const uploadProfileImageSchema = require('../../schemas/user/uploadProfileImage.json');
const deleteProfileImageSchema = require('../../schemas/user/deleteProfileImage.json');
const imageByUserIdSchema = require('../../schemas/user/imageByUserId.json');

describe('User Class', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
    user.initialise({});

    jest.spyOn(user, 'validation').mockImplementationOnce(() => undefined);
    jest.spyOn(user, 'checkSignature').mockImplementationOnce(() => 'signature');
    jest.spyOn(user, 'executeRequest').mockImplementation(() => Promise.resolve());
    jest.spyOn(Requester, 'execute').mockImplementationOnce(() => Promise.resolve());
  });

  afterEach(() => {
    Requester.execute.mockRestore();
    user.executeRequest.mockRestore();
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

      expect(Requester.execute).toHaveBeenCalledWith({
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        method: 'GET',
        params: userInfoData,
        url: 'http://localhost:8080/user/info',
      });
    });

  });

  describe('Search method', () => {
    it('should successfully call with valid data', () => {
      const userSearchData = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
        query: 'searchform',
      };

      user.search(userSearchData);

      expect(Requester.execute).toHaveBeenCalledWith({
        headers: {
          'X-API-Signature': expect.stringMatching(/.+/)
        },
        method: 'GET',
        params: userSearchData,
        url: 'http://localhost:8080/user/search',
      });
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

      expect(Requester.execute).toHaveBeenCalledWith({
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        method: 'GET',
        params: usernameSearch,
        url: 'http://localhost:8080/user/search-username',
      });
    });
  });

  describe('Validate method', () => {
    it('should successfully call with valid data', () => {
      const data = { username: 'Bob' };

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

  describe('Profile Image method', () => {
    it('should successfully call with valid data', () => {
      const data = { imageName: 'image.png' };

      user.profileImage(data);

      expect(user.validation).toHaveBeenCalledWith(profileImageSchema, data);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        url: `http://localhost:8080${HttpEndpoints.USER_IMAGE}/${data.imageName}`,
        responseType: 'stream',
      });
    });
  });

  describe('Upload Profile Image method', () => {
    it('should successfully call with valid data', () => {
      const image = new Readable();
      const query = { walletId: '0000' };

      user.uploadProfileImage(image, query);

      expect(user.validation).toHaveBeenCalledWith(uploadProfileImageSchema, query);
      expect(user.checkSignature).toHaveBeenCalledWith(query, Configuration.accessKeys.privateKey);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        url: `http://localhost:8080${HttpEndpoints.USER_IMAGE}?walletId=0000`,
        data: image,
      });
    });
  });

  describe('Delete Profile Image method', () => {
    it('should successfully call with valid data', () => {
      const data = { walletId: 'wallet-id' };

      user.deleteProfileImage(data);

      expect(user.executeRequest).toHaveBeenCalledWith({
        data,
        schema: deleteProfileImageSchema,
        defaultRequest: deleteConfiguration,
        url: 'http://localhost:8080' + HttpEndpoints.USER_IMAGE,
      });
    });
  });

  describe('Image by User ID method', () => {
    it('validate input data', () => {
      const data = {
        walletId: 'walletId',
        userId: 'userId',
      };

      user.imageByUserId(data);

      expect(user.validation).toHaveBeenCalledWith(imageByUserIdSchema, data);
    });

    it('returns a rejected promise when validation fails', async () => {
      expect.assertions(2);

      user.validation.mockRestore();

      try {
        await user.imageByUserId({});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toBe("data should have required property 'walletId', data should have required property 'userId'");
      }
    });

    it('executes a GET request based on input data', () => {
      const data = {
        walletId: 'walletId',
        userId: 'userId',
      }

      user.imageByUserId(data);

      expect(Requester.execute).toHaveBeenCalledWith({
        headers: {
          'X-API-Signature': expect.stringMatching(/.+/),
        },
        method: 'GET',
        url: 'http://localhost:8080/user/image-by-userid/userId',
        params: { walletId: 'walletId' },
      });
    });
  });
});
