/*
Copyright (C) 2021 Stiftung Pillar Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
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
const userInfoByIdSchema = require('../../schemas/user/infoById.json');
const imageByUserIdSchema = require('../../schemas/user/imageByUserId.json');

describe('User Class', () => {
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
    pSdk = new PillarSdk({});
    pSdk.setRequestTimeout(300);
    jest.spyOn(user, 'validation');
    jest
      .spyOn(user, 'checkSignature')
      .mockImplementationOnce(() => 'signature');
  });

  afterEach(() => {
    Configuration.setAuthTokens('', '');
    mockRequesterExecute.mockClear();
    configRequestSpy.mockClear();
  });

  describe('.update', () => {
    it('should successfully call with valid data and Authorization header', () => {
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
        betaProgramParticipant: true,
      };

      Configuration.setAuthTokens(accessToken, '');

      user.update(userUpdateData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { Authorization: `Bearer ${accessToken}` },
        data: userUpdateData,
        url: 'https://localhost:8080/user/update',
        timeout: 300,
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
    it('should successfully call with valid data and Authorization header', () => {
      const userInfoData = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      };

      Configuration.setAuthTokens(accessToken, '');

      user.info(userInfoData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: `Bearer ${accessToken}` },
        params: userInfoData,
        url: 'https://localhost:8080/user/info',
        timeout: 300,
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

  describe('.infoSmartWallet', () => {
    it('should successfully call with valid data and Authorization header', () => {
      const userInfoData = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      };

      Configuration.setAuthTokens(accessToken, '');

      user.infoSmartWallet(userInfoData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: `Bearer ${accessToken}` },
        params: userInfoData,
        url: 'https://localhost:8080/user',
        timeout: 300,
      });
    });

    it('returns a rejected promise when validation fails', async () => {
      expect.assertions(2);

      try {
        await user.infoSmartWallet({});
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

    it('should successfully call requester execute with valid data and Authorization header', () => {
      Configuration.setAuthTokens(accessToken, '');

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
        timeout: 300,
      });
    });
  });

  describe('.search', () => {
    it('should successfully call with valid data and Authorization header', () => {
      const userSearchData = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
        query: 'searchform',
      };

      Configuration.setAuthTokens(accessToken, '');

      user.search(userSearchData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: userSearchData,
        url: 'https://localhost:8080/user/search',
        timeout: 300,
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
    it('should successfully call with valid data and Authorization header', () => {
      const userInfoData = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      };

      Configuration.setAuthTokens(accessToken, '');

      user.delete(userInfoData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...deleteConfiguration,
        headers: { Authorization: `Bearer ${accessToken}` },
        data: userInfoData,
        url: 'https://localhost:8080/user/delete',
        timeout: 300,
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
    it('should successfully call with valid data and Authorization header', () => {
      const usernameSearch = {
        username: 'bob',
      };

      Configuration.setAuthTokens(accessToken, '');

      user.usernameSearch(usernameSearch);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: `Bearer ${accessToken}` },
        params: usernameSearch,
        url: 'https://localhost:8080/user/search-username',
        timeout: 300,
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
        url: `https://localhost:8080${HttpEndpoints.USER_VALIDATE}`,
        timeout: 300,
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
        url: `https://localhost:8080${HttpEndpoints.USER_IMAGE}/${
          data.imageName
        }`,
        responseType: 'stream',
        timeout: 300,
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

    it('should successfully call with valid data and Authorization header', () => {
      const query = { walletId: '0000' };

      Configuration.setAuthTokens(accessToken, '');

      user.uploadProfileImage(image, query);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        data: image,
        headers: { Authorization: `Bearer ${accessToken}` },
        params: query,
        url: `https://localhost:8080${HttpEndpoints.USER_IMAGE}`,
        timeout: 300,
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

    it('makes a POST request with valid data and Authorization header', () => {
      const data = {
        walletId,
        _boundary: '12345',
        image: {},
      };

      Configuration.setAuthTokens(accessToken, '');

      user.uploadProfileImageFormData(walletId, data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toBeCalledWith({
        data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        },
        method: 'POST',
        params: undefined,
        url: `${Configuration.accessKeys.apiUrl}${HttpEndpoints.USER_IMAGE}`,
        httpsAgent: expect.any(Object),
        timeout: 300,
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

      Configuration.setAuthTokens(accessToken, '');

      user.uploadProfileImageFormData(walletId, data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toBeCalledWith({
        data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: 'POST',
        params: undefined,
        url: `${Configuration.accessKeys.apiUrl}${HttpEndpoints.USER_IMAGE}`,
        httpsAgent: expect.any(Object),
        timeout: 300,
      });
    });
  });

  describe('.deleteProfileImage', () => {
    it('should successfully call with valid data and Authorization header', () => {
      const data = { walletId: 'wallet-id' };

      Configuration.setAuthTokens(accessToken, '');

      user.deleteProfileImage(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...deleteConfiguration,
        data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        url: 'https://localhost:8080' + HttpEndpoints.USER_IMAGE,
        timeout: 300,
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

    it('executes a GET request based on input data with Authorization header', () => {
      const data = {
        walletId: 'walletId',
        userId: 'userId',
      };

      Configuration.setAuthTokens(accessToken, '');

      user.imageByUserId(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        data: undefined,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: 'GET',
        url: 'https://localhost:8080/user/image-by-userid/userId',
        params: { walletId: 'walletId' },
        httpsAgent: expect.any(Object),
        timeout: 300,
      });
    });
  });

  describe('.createOneTimePassword', () => {
    it('successfully calls with walletId and Authorization header', () => {
      const data = {
        walletId: '12345',
      };

      Configuration.setAuthTokens(accessToken, '');

      user.createOneTimePassword(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        data,
        headers: { Authorization: `Bearer ${accessToken}` },
        url: 'https://localhost:8080/user/create-one-time-password',
        timeout: 300,
      });
    });

    it('throws an error when user data is missing', async () => {
      try {
        await user.createOneTimePassword({});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toMatch(
          /data should have required property 'walletId'/,
        );
      }
    });
  });

  describe('.validateEmail', () => {
    it('makes a POST request with Authorization header', () => {
      const data = {
        walletId: 'walletId',
        oneTimePassword: '12345',
      };

      Configuration.setAuthTokens(accessToken, '');

      user.validateEmail(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        data,
        headers: { Authorization: `Bearer ${accessToken}` },
        url: 'https://localhost:8080/user/validate-email',
        timeout: 300,
      });
    });

    it('validates input data based on schema', async () => {
      expect.assertions(3);

      try {
        await user.validateEmail({});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
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
    it('makes a POST request with formatted phone number and Authorization header', () => {
      const data = {
        walletId: 'walletId',
        oneTimePassword: '54321',
      };

      Configuration.setAuthTokens(accessToken, '');

      user.validatePhone(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        data,
        headers: { Authorization: `Bearer ${accessToken}` },
        url: 'https://localhost:8080/user/validate-phone',
        timeout: 300,
      });
    });

    it('makes a POST request with Authorization header', () => {
      const data = {
        walletId: 'walletId',
        oneTimePassword: '54321',
      };

      Configuration.setAuthTokens(accessToken, '');

      user.validatePhone(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        url: 'https://localhost:8080/user/validate-phone',
        timeout: 300,
      });
    });

    it('validates input data based on schema', async () => {
      expect.assertions(3);

      try {
        await user.validatePhone({});
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
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
    it('should successfully call with valid data and Authorization header', () => {
      const data = { walletId: 'wallet-id' };

      Configuration.setAuthTokens(accessToken, '');

      user.updateNotificationPreferences(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...putConfiguration,
        data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        url: 'https://localhost:8080/user/update-notification-preferences',
        timeout: 300,
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
    it('should successfully call with valid data and Authorization header', () => {
      const userInfoData = {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      };

      Configuration.setAuthTokens(accessToken, '');

      user.accessTokens(userInfoData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: `Bearer ${accessToken}` },
        params: userInfoData,
        url: 'https://localhost:8080/user/access-tokens',
        timeout: 300,
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

  describe('.mapContactsAddresses', () => {
    it('should successfully call with valid data and Authorization header', () => {
      const data = { walletId: 'wallet-id', contacts: [] };

      Configuration.setAuthTokens(accessToken, '');

      user.mapContactsAddresses(data);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        url: 'https://localhost:8080/user/map-contacts-addresses',
        timeout: 300,
      });
    });

    it('should fail due to schema validation', async () => {
      expect.assertions(2);
      const message = "data should have required property 'walletId'";

      const inputParams = {
        contacts: [],
      };

      try {
        await pSdk.user.mapContactsAddresses(inputParams);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toEqual(message);
      }
    });
  });
});
