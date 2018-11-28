import { Configuration } from '../../lib/configuration';
import { Requester } from '../../utils/requester';
import { Register } from '../../lib/register';
import { PillarSdk } from '../..';
import { default as postConfiguration } from '../../utils/requester-configurations/post';
const keys = require('../utils/generateKeyPair');

describe('Wallet Class', () => {
  let pSdk: PillarSdk;

  const mockExecuteRequest = jest.spyOn(
    Configuration.prototype,
    'executeRequest',
  );
  const mockRequesterExecute = jest
    .spyOn(Requester, 'execute')
    .mockImplementation(() => Promise.resolve());

  beforeEach(() => {
    pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
      privateKey: keys.privateKey,
    });
  });

  afterEach(() => {
    Configuration.accessToken = '';
    mockExecuteRequest.mockClear();
    mockRequesterExecute.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('.register', () => {
    it('should successfully call with valid data', () => {
      const walletRegistrationData = {
        fcmToken: '987qwe',
        username: 'sdfsdfs',
      };

      pSdk.wallet.register(walletRegistrationData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        data: walletRegistrationData,
        url: 'http://localhost:8080/wallet/register',
      });
    });

    it(
      'when accessToken is set, should successfully call' +
        ' with valid data with Authorization header',
      () => {
        Configuration.accessToken = 'myAccessToken';
        const walletRegistrationData = {
          fcmToken: '987qwe',
          username: 'sdfsdfs',
        };

        pSdk.wallet.register(walletRegistrationData);

        expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
        expect(Requester.execute).toHaveBeenCalledWith({
          ...postConfiguration,
          headers: { Authorization: 'Bearer myAccessToken' },
          data: walletRegistrationData,
          url: 'http://localhost:8080/wallet/register',
        });
      },
    );

    it('validates data', async () => {
      expect.assertions(3);

      try {
        await pSdk.wallet.register({});
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toMatch(
          "data should have required property 'fcmToken'",
        );
        expect(e.message).toMatch(
          "data should have required property 'username'",
        );
      }
    });
  });

  describe('.registerAuthServer', () => {
    it('should return the expected response', async () => {
      const registerKeysResponse = {
        status: 200,
        data: {
          expiresAt: '2011-06-14T04:12:36Z',
          nonce: 'string',
        },
      };
      const registerAuthResponse = {
        status: 200,
        data: {
          authorizationCode: 'Authorisation code',
          expiresAt: '2011-06-14T04:12:36Z',
        },
      };
      const registerAccessResponse = {
        status: 200,
        data: {
          accessToken: 'myAccessToken',
          accessTokenExpiresAt: '2011-06-14T04:12:36Z',
          fcmToken: 'myFcmToken',
          refreshToken: 'myRefreshToken',
          refreshTokenExpiresAt: '2011-06-14T04:12:36Z',
          userId: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
          walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
        },
      };
      jest
        .spyOn(Register, 'registerKeys')
        .mockImplementationOnce(() => Promise.resolve(registerKeysResponse));
      jest
        .spyOn(Register, 'registerAuth')
        .mockImplementationOnce(() => Promise.resolve(registerAuthResponse));
      jest
        .spyOn(Register, 'registerAccess')
        .mockImplementationOnce(() => Promise.resolve(registerAccessResponse));
      const walletRegistrationData = {
        privateKey: keys.privateKey,
        fcmToken: '987qwe',
        username: 'sdfsdfs',
      };
      const response = await pSdk.wallet.registerAuthServer(
        walletRegistrationData,
      );

      expect(response).toEqual(registerAccessResponse);

      Register.registerAccess.mockRestore();
      Register.registerAuth.mockRestore();
      Register.registerKeys.mockRestore();
    });

    it('should return the respective failed response', async () => {
      expect.assertions(1);
      const registerKeysResponse = {
        status: 500,
        data: {
          message: 'Internal server error',
        },
      };
      jest
        .spyOn(Register, 'registerKeys')
        .mockImplementationOnce(() =>
          Promise.reject(new Error(registerKeysResponse.data.message)),
        );
      jest
        .spyOn(Register, 'registerAuth')
        .mockImplementationOnce(() => Promise.resolve('ok'));
      const walletRegistrationData = {
        privateKey: keys.privateKey,
        fcmToken: '987qwe',
        username: 'sdfsdfs',
      };

      try {
        await pSdk.wallet.registerAuthServer(walletRegistrationData);
      } catch (error) {
        expect(error.message).toEqual(registerKeysResponse.data.message);
      }
    });

    it('should throw an error if invalid payload is sent', async () => {
      expect.assertions(1);
      const walletRegistrationData = {};
      const errMsg =
        "data should have required property 'privateKey', data should have required property 'fcmToken', " +
        "data should have required property 'username'";
      try {
        await pSdk.wallet.registerAuthServer(walletRegistrationData);
      } catch (error) {
        expect(error.message).toEqual(errMsg);
      }
    });
  });

  describe('.update', () => {
    it('should successfully call with valid data', () => {
      const walletUpdateData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        fcmToken: '987qwe',
      };

      pSdk.wallet.update(walletUpdateData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        data: walletUpdateData,
        url: 'http://localhost:8080/wallet/update',
      });
    });

    it(
      'when accessToken is set, should successfully call' +
        ' with valid data with Authorization header',
      () => {
        Configuration.accessToken = 'myAccessToken';
        const walletUpdateData = {
          walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
          fcmToken: '987qwe',
        };

        pSdk.wallet.update(walletUpdateData);

        expect(Requester.execute).toHaveBeenCalledWith({
          ...postConfiguration,
          headers: { Authorization: 'Bearer myAccessToken' },
          data: walletUpdateData,
          url: 'http://localhost:8080/wallet/update',
        });
      },
    );

    it('validates data', async () => {
      expect.assertions(3);

      try {
        await pSdk.wallet.update({});
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toMatch(
          "data should have required property 'walletId'",
        );
        expect(e.message).toMatch(
          "data should have required property 'fcmToken'",
        );
      }
    });
  });

  describe('.registerAddress', () => {
    it('should successfully call with valid data', () => {
      const walletRegisterAddressData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        blockchain: 'ethereum',
        blockchainAddress: '0x3eA19bddb978Db62344Ffba5d37Ba41C83C57917',
        fcmToken: 'sdcxxczdsds',
      };

      pSdk.wallet.registerAddress(walletRegisterAddressData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { 'X-API-Signature': expect.stringMatching(/.+/) },
        data: walletRegisterAddressData,
        url: 'http://localhost:8080/wallet/register-address',
      });
    });

    it(
      'when accessToken is set, should successfully call' +
        ' with valid data with Authorization header',
      () => {
        Configuration.accessToken = 'myAccessToken';
        const walletRegisterAddressData = {
          walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
          blockchain: 'ethereum',
          blockchainAddress: '0x3eA19bddb978Db62344Ffba5d37Ba41C83C57917',
          fcmToken: 'sdcxxczdsds',
        };

        pSdk.wallet.registerAddress(walletRegisterAddressData);

        expect(Requester.execute).toHaveBeenCalledWith({
          ...postConfiguration,
          headers: { Authorization: 'Bearer myAccessToken' },
          data: walletRegisterAddressData,
          url: 'http://localhost:8080/wallet/register-address',
        });
      },
    );

    it('should thrown error due to invalid data (schema validation)', async () => {
      expect.assertions(2);
      const message = "data should have required property 'walletId'";
      const inputParams = {
        blockchain: 'ethereum',
        blockchainAddress: '0x3eA19bddb978Db62344Ffba5d37Ba41C83C57917',
        fcmToken: 'sdcxxczdsds',
      };

      try {
        await pSdk.wallet.registerAddress(inputParams);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toEqual(message);
      }
    });
  });

  describe('.unregisterAddress', () => {
    it('should successfully call with valid data', () => {
      const walletUnregisterAddressData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        blockchain: 'ethereum',
        blockchainAddress: '0x3eA19bddb978Db62344Ffba5d37Ba41C83C57917',
      };

      pSdk.wallet.unregisterAddress(walletUnregisterAddressData);

      expect(Configuration.prototype.executeRequest).toHaveBeenCalledTimes(1);
      expect(Requester.execute).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { 'X-API-Signature': expect.anything() },
        data: walletUnregisterAddressData,
        url: 'http://localhost:8080/wallet/unregister-address',
      });
    });

    it(
      'when accessToken is set, should successfully call' +
        ' with valid data with Authorization header',
      () => {
        Configuration.accessToken = 'myAccessToken';
        const walletUnregisterAddressData = {
          walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
          blockchain: 'ethereum',
          blockchainAddress: '0x3eA19bddb978Db62344Ffba5d37Ba41C83C57917',
        };

        pSdk.wallet.unregisterAddress(walletUnregisterAddressData);

        expect(Requester.execute).toHaveBeenCalledWith({
          ...postConfiguration,
          headers: { Authorization: 'Bearer myAccessToken' },
          data: walletUnregisterAddressData,
          url: 'http://localhost:8080/wallet/unregister-address',
        });
      },
    );

    it('should thrown error due to invalid data (schema validation) ', async () => {
      expect.assertions(2);
      const message = "data should have required property 'walletId'";
      const inputParams = {
        blockchain: 'ethereum',
        blockchainAddress: '0x3eA19bddb978Db62344Ffba5d37Ba41C83C57917',
      };

      try {
        await pSdk.wallet.unregisterAddress(inputParams);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toEqual(message);
      }
    });
  });
});
