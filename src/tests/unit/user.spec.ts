import { Requester } from '../../utils/requester';
import { User } from '../../lib/user';
import { Configuration } from '../../lib/configuration';
import { HttpEndpoints } from '../../lib/constants/httpEndpoints';
import { default as postConfiguration } from '../../utils/requester-configurations/post';
import { default as deleteConfiguration } from '../../utils/requester-configurations/delete';
import { default as getConfiguration } from '../../utils/requester-configurations/get';
import { default as putConfiguration } from '../../utils/requester-configurations/put';
import { Readable } from 'stream';
import { PillarSdk } from '../..';

const profileImageSchema = require('../../schemas/user/profileImage.json');
const uploadProfileImageSchema = require('../../schemas/user/uploadProfileImage.json');
const userInfoByIdSchema = require('../../schemas/user/infoById.json');
const imageByUserIdSchema = require('../../schemas/user/imageByUserId.json');

describe('User Class', () => {
  const privateKey: string =
    'aef23212dbaadfa322321231231313123131312312312312312312312312312a';
  const accessToken = 'myAccessToken';
  let pSdk: PillarSdk;
  let user: User;

  const mockRequesterExecute = jest
    .spyOn(Requester, 'execute')
    .mockImplementation(() => Promise.resolve());

  const configRequestSpy = jest.spyOn(
    Configuration.prototype,
    'executeRequest',
  );

  beforeEach(() => {
    user = new User();
    user.initialise({});
    pSdk = new PillarSdk({
      privateKey,
    });
    jest.spyOn(user, 'validation');
    jest
      .spyOn(user, 'checkSignature')
      .mockImplementationOnce(() => 'signature');
  });

  afterEach(() => {
    Configuration.accessToken = '';
    mockRequesterExecute.mockClear();
    configRequestSpy.mockClear();
  });

  describe('.update', () => {
    it('should successfully call with valid data with key signature header', () => {
      const userUpdateData = {
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

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        data: userUpdateData,
        url: 'http://localhost:8080/user/update',
      });
    });

    it('should successfully call with valid data with Authorization header', () => {
      const userUpdateData = {
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

      Configuration.accessToken = accessToken;

      user.update(userUpdateData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { Authorization: `Bearer ${accessToken}` },
        data: userUpdateData,
        url: 'http://localhost:8080/user/update',
      });
    });

    it('returns a rejected promise when validation fails', async () => {
      expect.assertions(2);

      try {
        await user.update({});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toBe("data should have required property 'walletId'");
      }
    });
  });

  describe('.info', () => {
    it('should successfully call with valid data with key signature header', () => {
      const userInfoData = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      };

      user.info(userInfoData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        params: userInfoData,
        url: 'http://localhost:8080/user/info',
      });
    });

    it('should successfully call with valid data with Authorization header', () => {
      const userInfoData = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      };

      Configuration.accessToken = accessToken;

      user.info(userInfoData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: `Bearer ${accessToken}` },
        params: userInfoData,
        url: 'http://localhost:8080/user/info',
      });
    });

    it('returns a rejected promise when validation fails', async () => {
      expect.assertions(2);

      try {
        await user.info({});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toBe("data should have required property 'walletId'");
      }
    });
  });

  describe('.infoById', () => {
    let targetUserId: string;
    let query: UserInfoById;

    beforeEach(() => {
      targetUserId = 'target-user-id';
      query = {
        walletId: 'wallet-id',
        userAccessKey: 'user-access-key',
        targetUserAccessKey: 'target-user-access-key',
      };
    });

    it('should validate query', () => {
      user.infoById(targetUserId, query);

      expect(user.validation).toHaveBeenCalledWith(userInfoByIdSchema, query);
    });

    it('should successfully call requester execute with valid data with key signature header', () => {
      user.infoById(targetUserId, query);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        url: `${Configuration.accessKeys.apiUrl}${
          HttpEndpoints.USER_INFO_BY_ID
        }${targetUserId}`,
        params: query,
        headers: {
          'X-API-Signature': expect.stringMatching(/.+/),
        },
      });
    });

    it('should successfully call requester execute with valid data with Authorization header', () => {
      Configuration.accessToken = accessToken;

      user.infoById(targetUserId, query);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        url: `${Configuration.accessKeys.apiUrl}${
          HttpEndpoints.USER_INFO_BY_ID
        }${targetUserId}`,
        params: query,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    });
  });

  describe('.search', () => {
    it('should successfully call with valid data with key signature header', () => {
      const userSearchData = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
        query: 'searchform',
      };

      user.search(userSearchData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: {
          'X-API-Signature': expect.stringMatching(/.+/),
        },
        params: userSearchData,
        url: 'http://localhost:8080/user/search',
      });
    });

    it('should successfully call with valid data with Authorization header', () => {
      const userSearchData = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
        query: 'searchform',
      };

      Configuration.accessToken = accessToken;

      user.search(userSearchData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: userSearchData,
        url: 'http://localhost:8080/user/search',
      });
    });

    it('returns a rejected promise when validation fails', async () => {
      expect.assertions(3);

      try {
        await user.search({});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toMatch("data should have required property 'query'");
        expect(e.message).toMatch(
          "data should have required property 'walletId'",
        );
      }
    });
  });

  describe('.delete', () => {
    it('should successfully call with valid data with key signature header', () => {
      const userInfoData = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      };

      user.delete(userInfoData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...deleteConfiguration,
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        data: userInfoData,
        url: 'http://localhost:8080/user/delete',
      });
    });

    it('should successfully call with valid data with Authorization header', () => {
      const userInfoData = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      };

      Configuration.accessToken = accessToken;

      user.delete(userInfoData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...deleteConfiguration,
        headers: { Authorization: `Bearer ${accessToken}` },
        data: userInfoData,
        url: 'http://localhost:8080/user/delete',
      });
    });

    it('returns a rejected promise when validation fails', async () => {
      expect.assertions(2);

      try {
        await user.delete({});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toBe("data should have required property 'walletId'");
      }
    });
  });

  describe('.usernameSearch', () => {
    it('should successfully call with valid data with key signature header', () => {
      const usernameSearch = {
        username: 'bob',
      };

      user.usernameSearch(usernameSearch);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        params: usernameSearch,
        url: 'http://localhost:8080/user/search-username',
      });
    });

    it('should successfully call with valid data with Authorization header', () => {
      const usernameSearch = {
        username: 'bob',
      };

      Configuration.accessToken = accessToken;

      user.usernameSearch(usernameSearch);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: `Bearer ${accessToken}` },
        params: usernameSearch,
        url: 'http://localhost:8080/user/search-username',
      });
    });

    it('returns a rejected promise when validation fails', async () => {
      expect.assertions(2);

      try {
        await user.usernameSearch({});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toBe("data should have required property 'username'");
      }
    });
  });

  describe('.validate', () => {
    it('should successfully call with valid data', () => {
      const data = { username: 'Bob' };

      user.validate(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        data,
        url: `http://localhost:8080${HttpEndpoints.USER_VALIDATE}`,
      });
    });

    it('returns a rejected promise when validation fails', async () => {
      expect.assertions(4);

      try {
        await user.validate({});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toMatch(
          "data should have required property 'username'",
        );
        expect(e.message).toMatch(
          "data should have required property 'blockchainAddress'",
        );
        expect(e.message).toMatch(
          'data should match exactly one schema in oneOf',
        );
      }
    });
  });

  describe('.profileImage', () => {
    it('should successfully call with valid data', () => {
      const data = { imageName: 'image.png' };

      user.profileImage(data);

      expect(user.validation).toHaveBeenCalledWith(profileImageSchema, data);
      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        url: `http://localhost:8080${HttpEndpoints.USER_IMAGE}/${
          data.imageName
        }`,
        responseType: 'stream',
      });
    });

    it('returns a rejected promise when validation fails', async () => {
      expect.assertions(2);

      try {
        await user.profileImage({});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toBe(
          "data should have required property 'imageName'",
        );
      }
    });
  });

  describe('.uploadProfileImage', () => {
    const image = new Readable();

    it('should successfully call with valid data with key signature header', () => {
      const query = { walletId: '0000' };

      user.uploadProfileImage(image, query);

      expect(user.validation).toHaveBeenCalledWith(
        uploadProfileImageSchema,
        query,
      );
      expect(user.checkSignature).toHaveBeenCalledWith(
        query,
        Configuration.accessKeys.privateKey,
      );
      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        data: image,
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        params: query,
        url: `http://localhost:8080${HttpEndpoints.USER_IMAGE}`,
      });
    });

    it('should successfully call with valid data with Authorization header', () => {
      const query = { walletId: '0000' };

      Configuration.accessToken = accessToken;

      user.uploadProfileImage(image, query);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        data: image,
        headers: { Authorization: `Bearer ${accessToken}` },
        params: query,
        url: `http://localhost:8080${HttpEndpoints.USER_IMAGE}`,
      });
    });

    it('returns a rejected promise when validation fails', async () => {
      expect.assertions(2);

      try {
        await user.uploadProfileImage(image, {});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toBe("data should have required property 'walletId'");
      }
    });
  });

  describe('.uploadProfileImageFormData', () => {
    const walletId = 'wallet-id';

    it('makes a POST request with valid data with key signature header', () => {
      const data = {
        walletId,
        _boundary: '12345',
        image: {},
      };

      user.uploadProfileImageFormData(walletId, data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toBeCalledWith({
        data,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          'X-API-Signature': expect.stringMatching(/.+/),
        },
        method: 'POST',
        url: `${Configuration.accessKeys.apiUrl}${HttpEndpoints.USER_IMAGE}`,
      });
    });

    it('makes a POST request with valid data with Authorization header', () => {
      const data = {
        walletId,
        _boundary: '12345',
        image: {},
      };

      Configuration.accessToken = accessToken;

      user.uploadProfileImageFormData(walletId, data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toBeCalledWith({
        data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        },
        method: 'POST',
        url: `${Configuration.accessKeys.apiUrl}${HttpEndpoints.USER_IMAGE}`,
      });
    });

    it('returns a rejected promise when validation fails', async () => {
      expect.assertions(2);

      try {
        await user.uploadProfileImageFormData();
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toBe("data should have required property 'walletId'");
      }
    });

    it('does not include Content-Type header when `formData._boundary` does not exist', () => {
      const data = {
        walletId,
        image: new Buffer('scggdfgd'),
      };

      user.uploadProfileImageFormData(walletId, data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toBeCalledWith({
        data,
        headers: {
          'X-API-Signature': expect.stringMatching(/.+/),
        },
        method: 'POST',
        url: `${Configuration.accessKeys.apiUrl}${HttpEndpoints.USER_IMAGE}`,
      });
    });
  });

  describe('.deleteProfileImage', () => {
    it('should successfully call with valid data with key signature header', () => {
      const data = { walletId: 'wallet-id' };

      user.deleteProfileImage(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...deleteConfiguration,
        data,
        headers: {
          'X-API-Signature': expect.stringMatching(/.+/),
        },
        url: 'http://localhost:8080' + HttpEndpoints.USER_IMAGE,
      });
    });

    it('should successfully call with valid data with Authorization header', () => {
      const data = { walletId: 'wallet-id' };

      Configuration.accessToken = accessToken;

      user.deleteProfileImage(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...deleteConfiguration,
        data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        url: 'http://localhost:8080' + HttpEndpoints.USER_IMAGE,
      });
    });

    it('returns a rejected promise when validation fails', async () => {
      expect.assertions(2);

      try {
        await user.deleteProfileImage({});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toBe("data should have required property 'walletId'");
      }
    });
  });

  describe('.imageByUserId', () => {
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
        expect(e.message).toBe(
          "data should have required property 'walletId', data should have required property 'userId'",
        );
      }
    });

    it('executes a GET request based on input data with key signature header', () => {
      const data = {
        walletId: 'walletId',
        userId: 'userId',
      };

      user.imageByUserId(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        headers: {
          'X-API-Signature': expect.stringMatching(/.+/),
        },
        method: 'GET',
        url: 'http://localhost:8080/user/image-by-userid/userId',
        params: { walletId: 'walletId' },
      });
    });

    it('executes a GET request based on input data with Authorization header', () => {
      const data = {
        walletId: 'walletId',
        userId: 'userId',
      };

      Configuration.accessToken = accessToken;

      user.imageByUserId(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: 'GET',
        url: 'http://localhost:8080/user/image-by-userid/userId',
        params: { walletId: 'walletId' },
      });
    });
  });

  describe('.createOneTimePassword', () => {
    it('successfully calls with email address with key signature header', () => {
      const data = {
        email: 'foo@email.com',
        walletId: '12345',
      };

      user.createOneTimePassword(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        data,
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        url: 'http://localhost:8080/user/create-one-time-password',
      });
    });

    it('successfully calls with email address with Authorization header', () => {
      const data = {
        email: 'foo@email.com',
        walletId: '12345',
      };

      Configuration.accessToken = accessToken;

      user.createOneTimePassword(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        data,
        headers: { Authorization: `Bearer ${accessToken}` },
        url: 'http://localhost:8080/user/create-one-time-password',
      });
    });

    it('successfully calls with phone number', () => {
      const data = {
        phone: '+447321450233',
        walletId: '12345',
      };

      user.createOneTimePassword(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        data,
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        url: 'http://localhost:8080/user/create-one-time-password',
      });
    });

    it('formats phone number', () => {
      const u = {
        phone: ' +44 (7777) 123-456.',
        walletId: '12345',
      };

      user.createOneTimePassword(u);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
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
        expect(e.message).toMatch(
          /data should have required property 'walletId'/,
        );
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
        expect(e.message).toMatch(
          'data.phone should match pattern "^\\+[0-9]{6,}$"',
        );
      }
    });
  });

  describe('.validateEmail', () => {
    it('makes a POST request with key signature header', () => {
      const data = {
        walletId: 'walletId',
        email: 'foo@bar.com',
        oneTimePassword: '12345',
      };

      user.validateEmail(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        data,
        headers: {
          'X-API-Signature': expect.stringMatching(/.+/),
        },
        url: 'http://localhost:8080/user/validate-email',
      });
    });

    it('makes a POST request with Authorization header', () => {
      const data = {
        walletId: 'walletId',
        email: 'foo@bar.com',
        oneTimePassword: '12345',
      };

      Configuration.accessToken = accessToken;

      user.validateEmail(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        url: 'http://localhost:8080/user/validate-email',
      });
    });

    it('validates input data based on schema', async () => {
      expect.assertions(4);

      try {
        await user.validateEmail({});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toMatch(/data should have required property 'email'/);
        expect(e.message).toMatch(
          /data should have required property 'oneTimePassword'/,
        );
        expect(e.message).toMatch(
          /data should have required property 'walletId'/,
        );
      }
    });
  });

  describe('.validatePhone', () => {
    it('makes a POST request with formatted phone number', () => {
      const data = {
        walletId: 'walletId',
        phone: '+1 (2) 34-56',
        oneTimePassword: '54321',
      };

      user.validatePhone(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        data: { ...data, phone: '+123456' },
        headers: {
          'X-API-Signature': expect.stringMatching(/.+/),
        },
        url: 'http://localhost:8080/user/validate-phone',
      });
    });

    it('makes a POST request with Authorization header', () => {
      const data = {
        walletId: 'walletId',
        phone: '+1 (2) 34-56',
        oneTimePassword: '54321',
      };

      Configuration.accessToken = accessToken;

      user.validatePhone(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        data: { ...data, phone: '+123456' },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        url: 'http://localhost:8080/user/validate-phone',
      });
    });

    it('validates input data based on schema', async () => {
      expect.assertions(4);

      try {
        await user.validatePhone({});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toMatch(/data should have required property 'phone'/);
        expect(e.message).toMatch(
          /data should have required property 'oneTimePassword'/,
        );
        expect(e.message).toMatch(
          /data should have required property 'walletId'/,
        );
      }
    });
  });

  describe('.updateNotificationPreferences', () => {
    it('should successfully call with valid data with key signature header', () => {
      const data = { walletId: 'wallet-id' };

      user.updateNotificationPreferences(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...putConfiguration,
        data,
        headers: {
          'X-API-Signature': expect.stringMatching(/.+/),
        },
        url: 'http://localhost:8080/user/update-notification-preferences',
      });
    });

    it('should successfully call with valid data with Authorization header', () => {
      const data = { walletId: 'wallet-id' };

      Configuration.accessToken = accessToken;

      user.updateNotificationPreferences(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...putConfiguration,
        data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        url: 'http://localhost:8080/user/update-notification-preferences',
      });
    });

    it('should fail due to schema validation', async () => {
      expect.assertions(2);
      const message = "data should have required property 'walletId'";

      const inputParams = {
        newOffer: true,
        newReceipt: false,
      };

      try {
        await pSdk.user.updateNotificationPreferences(inputParams);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toEqual(message);
      }
    });
  });

  describe('.accessTokens', () => {
    it('should successfully call with valid data with key signature header', () => {
      const userInfoData = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      };

      user.accessTokens(userInfoData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        params: userInfoData,
        url: 'http://localhost:8080/user/access-tokens',
      });
    });

    it('should successfully call with valid data with Authorization header', () => {
      const userInfoData = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      };

      Configuration.accessToken = accessToken;

      user.accessTokens(userInfoData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: `Bearer ${accessToken}` },
        params: userInfoData,
        url: 'http://localhost:8080/user/access-tokens',
      });
    });

    it('returns a rejected promise when validation fails', async () => {
      expect.assertions(2);

      try {
        await user.accessTokens({});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toBe("data should have required property 'walletId'");
      }
    });
  });
});
