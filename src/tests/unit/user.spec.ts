import { Requester } from '../../utils/requester';
import { User } from '../../lib/user';
import { Configuration } from '../../lib/configuration';
import { HttpEndpoints } from '../../lib/constants/httpEndpoints';
import { default as postConfiguration } from '../../utils/requester-configurations/post';
import { default as deleteConfiguration } from '../../utils/requester-configurations/delete';
import { default as getConfiguration } from '../../utils/requester-configurations/get';
import { default as putConfiguration } from '../../utils/requester-configurations/put';
import { Readable } from 'stream';

const userValidateSchema = require('../../schemas/user/validate.json');
const profileImageSchema = require('../../schemas/user/profileImage.json');
const uploadProfileImageSchema = require('../../schemas/user/uploadProfileImage.json');
const userInfoByIdSchema = require('../../schemas/user/infoById.json');
const deleteProfileImageSchema = require('../../schemas/user/deleteProfileImage.json');
const imageByUserIdSchema = require('../../schemas/user/imageByUserId.json');
const updateNotificationPreferencesSchema =
  require('../../schemas/user/userNotificationPreferences.json');

describe('User Class', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
    user.initialise({});

    jest.spyOn(user, 'validation');
    jest.spyOn(user, 'checkSignature').mockImplementationOnce(() => 'signature');
    jest.spyOn(user, 'executeRequest');
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

  describe('Info By Id method', () => {
    let targetUserId: string;
    let query: UserInfoById;

    beforeEach(async () => {
      targetUserId = 'target-user-id';
      query = {
        walletId: 'wallet-id',
        userAccessKey: 'user-access-key',
        targetUserAccessKey: 'target-user-access-key',
      };

      await user.infoById(targetUserId, query);
    });

    it('should validate query', () => {
      expect(user.validation).toHaveBeenCalledWith(userInfoByIdSchema, query);
    });

    it('should successfully call requester execute with valid data', async () => {
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        url: Configuration.accessKeys.apiUrl + HttpEndpoints.USER_INFO_BY_ID + targetUserId,
        params: query,
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
      };

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

  describe('Create One Time Password method', () => {
    it('successfully calls with email address', () => {
      const u = {
        email: 'foo@email.com',
        walletId: '12345',
      };

      user.createOneTimePassword(u);

      expect(Requester.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
          data: u,
          url: 'http://localhost:8080/user/create-one-time-password',
        }),
      );
    });

    it('successfully calls with phone number', () => {
      const u = {
        phone: '+447321450233',
        walletId: '12345',
      };

      user.createOneTimePassword(u);

      expect(Requester.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
          data: u,
          url: 'http://localhost:8080/user/create-one-time-password',
        }),
      );
    });

    it('formats phone number', () => {
      const u = {
        phone: ' +44 (7777) 123-456.',
        walletId: '12345',
      };

      user.createOneTimePassword(u);

      expect(Requester.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          data: {
            phone: '+447777123456',
            walletId: '12345',
          },
        }),
      );
    });

    it('throws an error when user data is missing', async () => {
      expect.assertions(2);

      try {
        await user.createOneTimePassword({});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toMatch(/data should have required property 'walletId'/);
      }
    });

    it('validates phone number', async () => {
      expect.assertions(2);

      const u = {
        phone: '+12345',
        walletId: 'abc-123',
      };

      try {
        await user.createOneTimePassword(u);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toMatch('data.phone should match pattern \"^\\+[0-9]{6,}$\"');
      }
    });
  });

  describe('User Validate Email method', () => {
    it('makes a POST request', () => {
      const data = {
        walletId: 'walletId',
        email: 'foo@bar.com',
        oneTimePassword: '12345',
      };

      user.validateEmail(data);

      expect(Requester.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          data,
          method: 'POST',
          headers: {
            'X-API-Signature': expect.stringMatching(/.+/),
          },
          url: 'http://localhost:8080/user/validate-email',
          json: true,
        }),
      );
    });

    it('validates input data based on schema', async () => {
      expect.assertions(4);

      try {
        await user.validateEmail({});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toMatch(/data should have required property 'email'/);
        expect(e.message).toMatch(/data should have required property 'oneTimePassword'/);
        expect(e.message).toMatch(/data should have required property 'walletId'/);
      }
    });
  });

  describe('User Validate Phone method', () => {
    it('makes a POST request with formatted phone number', () => {
      const data = {
        walletId: 'walletId',
        phone: '+1 (2) 34-56',
        oneTimePassword: '54321',
      };

      user.validatePhone(data);

      expect(Requester.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { ...data, phone: '+123456' },
          method: 'POST',
          headers: {
            'X-API-Signature': expect.stringMatching(/.+/),
          },
          url: 'http://localhost:8080/user/validate-phone',
          json: true,
        }),
      );
    });

    it('validates input data based on schema', async () => {
      expect.assertions(4);

      try {
        await user.validatePhone({});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toMatch(/data should have required property 'phone'/);
        expect(e.message).toMatch(/data should have required property 'oneTimePassword'/);
        expect(e.message).toMatch(/data should have required property 'walletId'/);
      }
    });
  });

  describe('updateNotificationPreferences method', () => {
    it('should successfully call with valid data', () => {
      const data = { walletId: 'wallet-id' };

      user.updateNotificationPreferences(data);

      expect(user.executeRequest).toHaveBeenCalledWith({
        data,
        schema: updateNotificationPreferencesSchema,
        defaultRequest: putConfiguration,
        url: 'http://localhost:8080' + HttpEndpoints.USER_NOTIFICATION_PREFERENCES,
      });
    });
  });
});
