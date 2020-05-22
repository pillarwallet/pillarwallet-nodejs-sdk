/*
Copyright (C) 2019 Stiftung Pillar Project

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
/* tslint:disable object-shorthand-properties-first */
import { Configuration } from '../../lib/configuration';
import { Requester } from '../../utils/requester';
import { Register } from '../../lib/register';
import { PillarSdk } from '../..';
import { default as postConfiguration } from '../../utils/requester-configurations/post';
import { PrivateKeyDerivatives } from '../../utils/private-key-derivatives';

describe('Wallet Class', () => {
  const EC = require('elliptic').ec;
  const ecSecp256k1 = new EC('secp256k1');

  // Key pairs
  let privateKey;
  do {
    privateKey = ecSecp256k1
      .genKeyPair()
      .getPrivate()
      .toString('hex');
  } while (privateKey.length !== 64);

  let pSdk: PillarSdk;
  const accessToken = 'myAccessToken';

  const mockExecuteRequest = jest.spyOn(
    Configuration.prototype,
    'executeRequest',
  );
  const mockRequesterExecute = jest
    .spyOn(Requester, 'execute')
    .mockImplementation(() => Promise.resolve());

  beforeEach(() => {
    pSdk = new PillarSdk({});
    pSdk.setRequestTimeout(300);
  });

  afterEach(() => {
    Configuration.setAuthTokens('', '');
    mockExecuteRequest.mockClear();
    mockRequesterExecute.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('.register', () => {
    it(
      'should successfully call' + ' with valid data and Authorization header',
      () => {
        Configuration.setAuthTokens(accessToken, '');
        const walletRegistrationData = {
          fcmToken: '987qwe',
          username: 'sdfsdfs',
        };

        pSdk.wallet.register(walletRegistrationData);

        expect(Requester.execute).toHaveBeenCalledWith({
          ...postConfiguration,
          headers: { Authorization: 'Bearer myAccessToken' },
          data: walletRegistrationData,
          url: 'https://localhost:8080/wallet/register',
          timeout: 300,
        });
      },
    );

    it('validates data', async () => {
      expect.assertions(2);

      try {
        await pSdk.wallet.register({});
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toMatch(
          "data should have required property 'username'",
        );
      }
    });
  });

  describe('.registerSmartWallet', () => {
    it(
      'should successfully call' + ' with valid data and Authorization header',
      () => {
        Configuration.setAuthTokens(accessToken, '');
        const registerSmartWalletData = {
          fcmToken: '987qwe',
          walletId: 'sdfsdfs',
          privateKey,
          ethAddress: '0xabcdef1234567890abcdef123456789012345678',
        };

        pSdk.wallet.registerSmartWallet(registerSmartWalletData);

        const data = {
          ...registerSmartWalletData,
          publicKey: PrivateKeyDerivatives.getPublicKey(
            registerSmartWalletData.privateKey,
          ),
        };
        delete data.privateKey;

        expect(Requester.execute).toHaveBeenCalledWith({
          ...postConfiguration,
          headers: { Authorization: 'Bearer myAccessToken' },
          data,
          url: 'https://localhost:8080/wallet/register-smart-wallet',
          timeout: 300,
        });
      },
    );

    it('validates data', async () => {
      expect.assertions(2);

      try {
        await pSdk.wallet.register({});
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toMatch(
          "data should have required property 'username'",
        );
      }
    });
  });

  describe('.registerAuthServer', () => {
    const walletRegistrationData = {
      privateKey,
      fcmToken: '987qwe',
      username: 'sdfsdfs',
    };

    jest.spyOn(Register, 'registerKeys');
    jest.spyOn(Register, 'registerAuth');
    jest.spyOn(Register, 'registerAccess');

    afterEach(() => {
      Register.registerKeys.mockClear();
      Register.registerAuth.mockClear();
      Register.registerAccess.mockClear();
    });

    afterAll(() => {
      Register.registerKeys.mockRestore();
      Register.registerAuth.mockRestore();
      Register.registerAccess.mockRestore();
    });

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

      Register.registerKeys.mockImplementationOnce(() =>
        Promise.resolve(registerKeysResponse),
      );
      Register.registerAuth.mockImplementationOnce(() =>
        Promise.resolve(registerAuthResponse),
      );
      Register.registerAccess.mockImplementationOnce(() =>
        Promise.resolve(registerAccessResponse),
      );

      const response = await pSdk.wallet.registerAuthServer(
        walletRegistrationData,
      );

      expect(response).toEqual(registerAccessResponse);
    });

    it('creates a new UUID for each registration attempt', async () => {
      Register.registerKeys.mockImplementation(() =>
        Promise.reject(new Error('Registration failed')),
      );

      try {
        await pSdk.wallet.registerAuthServer(walletRegistrationData);
      } catch (e) {}

      try {
        await pSdk.wallet.registerAuthServer(walletRegistrationData);
      } catch (e) {}

      const [, uuidFirstCall] = Register.registerKeys.mock.calls[0];
      const [, uuidSecondCall] = Register.registerKeys.mock.calls[1];

      expect(uuidFirstCall).not.toBe(uuidSecondCall);
    });

    it('should return the respective failed response', async () => {
      expect.assertions(1);
      const registerKeysResponse = {
        status: 500,
        data: {
          message: 'Internal server error',
        },
      };
      Register.registerKeys.mockImplementationOnce(() =>
        Promise.reject(new Error(registerKeysResponse.data.message)),
      );
      Register.registerAuth.mockImplementationOnce(() => Promise.resolve('ok'));

      try {
        await pSdk.wallet.registerAuthServer(walletRegistrationData);
      } catch (error) {
        expect(error.message).toEqual(registerKeysResponse.data.message);
      }
    });

    it('should throw an error if invalid payload is sent', async () => {
      expect.assertions(1);
      const invalidWalletRegistrationData = {};
      const errMsg =
        "data should have required property 'privateKey', " +
        "data should have required property 'username', " +
        'data should match "then" schema';
      try {
        await pSdk.wallet.registerAuthServer(invalidWalletRegistrationData);
      } catch (error) {
        expect(error.message).toEqual(errMsg);
      }
    });
  });

  describe('.update', () => {
    it(
      'should successfully call' + ' with valid data and Authorization header',
      () => {
        Configuration.setAuthTokens(accessToken, '');
        const walletUpdateData = {
          walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
          fcmToken: '987qwe',
        };

        pSdk.wallet.update(walletUpdateData);

        expect(Requester.execute).toHaveBeenCalledWith({
          ...postConfiguration,
          headers: { Authorization: 'Bearer myAccessToken' },
          data: walletUpdateData,
          url: 'https://localhost:8080/wallet/update',
          timeout: 300,
        });
      },
    );

    it('validates data', async () => {
      expect.assertions(2);

      try {
        await pSdk.wallet.update({});
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toMatch(
          "data should have required property 'walletId'",
        );
      }
    });
  });

  describe('.registerAddress', () => {
    it(
      'should successfully call' + ' with valid data and Authorization header',
      () => {
        Configuration.setAuthTokens(accessToken, '');
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
          url: 'https://localhost:8080/wallet/register-address',
          timeout: 300,
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
    it(
      'should successfully call' + ' with valid data and Authorization header',
      () => {
        Configuration.setAuthTokens(accessToken, '');
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
          url: 'https://localhost:8080/wallet/unregister-address',
          timeout: 300,
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
