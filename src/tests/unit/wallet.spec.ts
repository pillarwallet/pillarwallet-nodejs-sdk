import { Requester } from '../../utils/requester';
import { Register } from '../../lib/register';
import { PillarSdk } from '../..';
const keys = require('../utils/generateKeyPair');

describe('Wallet Class', () => {
  let pSdk: PillarSdk;

  beforeEach(() => {
    pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
      privateKey: keys.privateKey,
    });
    jest
      .spyOn(Requester, 'execute')
      .mockImplementationOnce(() => Promise.resolve());
  });

  afterEach(() => {
    Requester.execute.mockRestore();
  });

  describe('The Wallet Class: register method', () => {
    it('should successfully call with valid data', () => {
      const walletRegistrationData = {
        fcmToken: '987qwe',
        username: 'sdfsdfs',
      };

      pSdk.wallet.register(walletRegistrationData);

      expect(Requester.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { 'X-API-Signature': expect.anything() },
          data: walletRegistrationData,
          url: 'http://localhost:8080/wallet/register',
        }),
      );
    });
  });

  describe('The Wallet Class: registerAuthServer method', () => {
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
        publicKey: keys.publicKey,
        ethAddress: '0x0000000000000000000000000000000000000000',
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
        publicKey: keys.publicKey,
        ethAddress: '0x0000000000000000000000000000000000000000',
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
        "data should have required property 'privateKey', data should have required property 'publicKey', " +
        "data should have required property 'ethAddress', data should have required property 'fcmToken', " +
        "data should have required property 'username'";
      try {
        await pSdk.wallet.registerAuthServer(walletRegistrationData);
      } catch (error) {
        expect(error.message).toEqual(errMsg);
      }
    });
  });

  describe('The Wallet Class: update method', () => {
    it('should successfully call with valid data', () => {
      const walletUpdateData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        fcmToken: '987qwe',
      };

      pSdk.wallet.update(walletUpdateData);

      expect(Requester.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { 'X-API-Signature': expect.anything() },
          data: walletUpdateData,
          url: 'http://localhost:8080/wallet/update',
        }),
      );
    });
  });

  describe('The Wallet Class: registerAddress method', () => {
    it('should successfully call with valid data', () => {
      const walletRegisterAddressData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        blockchain: 'ethereum',
        blockchainAddress: '0x3eA19bddb978Db62344Ffba5d37Ba41C83C57917',
        fcmToken: 'sdcxxczdsds',
      };

      pSdk.wallet.registerAddress(walletRegisterAddressData);

      expect(Requester.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { 'X-API-Signature': expect.anything() },
          data: walletRegisterAddressData,
          url: 'http://localhost:8080/wallet/register-address',
        }),
      );
    });

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

  describe('The Wallet Class: unregisterAddress method', () => {
    it('should successfully call with valid data', () => {
      const walletUnregisterAddressData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        blockchain: 'ethereum',
        blockchainAddress: '0x3eA19bddb978Db62344Ffba5d37Ba41C83C57917',
      };

      pSdk.wallet.unregisterAddress(walletUnregisterAddressData);

      expect(Requester.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { 'X-API-Signature': expect.anything() },
          data: walletUnregisterAddressData,
          url: 'http://localhost:8080/wallet/unregister-address',
        }),
      );
    });

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
