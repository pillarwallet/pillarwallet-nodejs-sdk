import { Register } from '../../lib/register';
import { Requester } from '../../utils/requester';
import { Configuration } from '../../lib/configuration';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
jest.mock('axios');

describe.only('Register Class', () => {
  Configuration.accessKeys.apiUrl = 'http://localhost:8080';
  const publicKey = 'myPub';
  const privateKey = 'myPrivateKey';
  const uuIdv4 = uuid();

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('registerKeys', () => {
    const regKeysResponse = {
      status: 200,
      data: {
        expiresAt: '2011-06-14T04:12:36Z',
        nonce: '4321',
      },
    };

    it('should send http request containing publicKey and identifier', () => {
      jest.spyOn(Requester, 'execute').mockResolvedValue('');
      Register.registerKeys(publicKey, uuIdv4);
      expect(Requester.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          data: {
            publicKey,
            uuid: uuIdv4,
          },
          url: 'http://localhost:8080/register/keys',
        }),
      );
    });

    it('expects response to resolve with data', async () => {
      jest.spyOn(Requester, 'execute').mockResolvedValue(regKeysResponse);
      const response = await Register.registerKeys(publicKey, uuIdv4);
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(regKeysResponse.data);
    });
  });

  describe('registerAuth', () => {
    const regAuthResponse = {
      status: 200,
      data: {
        authorizationCode: 'Authorisation code',
        expiresAt: '2011-06-14T04:12:36Z',
      },
    };

    const data = {
      nonce: '4344132',
      uuid: uuIdv4,
      codeChallenge: '323423423443423432432432',
      ethAddress: 'OneEthAddress',
      fcmToken: 'OneFcmToken',
      username: 'OneUserName',
    };

    it('should send http request containing data and privateKey', () => {
      jest.spyOn(Requester, 'execute').mockResolvedValue('');
      const regAuthData = { ...data };
      delete regAuthData.nonce;
      Register.registerAuth(data, privateKey);
      expect(Requester.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          data: regAuthData,
          url: 'http://localhost:8080/register/auth',
        }),
      );
    });

    it('expects response to resolve with data', async () => {
      jest.spyOn(Requester, 'execute').mockResolvedValue(regAuthResponse);
      const response = await Register.registerAuth(data, privateKey);
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(regAuthResponse.data);
    });
  });

  describe('registerAccess', () => {
    const regAccessResponse = {
      status: 200,
      data: {
        accessToken: 'myAccessToken',
        accessTokenExpiresAt: 'YYYY-mm-ddTHH:MM:ssZ',
        fcmToken: 'myFcmToken',
        refreshToken: 'myRefreshToken',
        refreshTokenExpiresAt: 'YYYY-mm-ddTHH:MM:ssZ',
        userId: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      },
    };
    const data = {
      authorizationCode: 'myauthorizationCode',
      codeVerifier: 'oneCodeVerifier',
      uuid: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    };

    it('should send http request containing data and privateKey', () => {
      jest.spyOn(Requester, 'execute').mockResolvedValue('');
      const regAccessData = { ...data };
      delete regAccessData.authorizationCode;
      Register.registerAccess(data, privateKey);
      expect(Requester.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          data: regAccessData,
          url: 'http://localhost:8080/register/access',
        }),
      );
    });

    it('expects response to resolve with data', async () => {
      jest.spyOn(Requester, 'execute').mockResolvedValue(regAccessResponse);
      const response = await Register.registerAccess(data, privateKey);
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(regAccessResponse.data);
    });
  });

  describe.only('refreshAuthToken', async () => {
    const refreshAuthTokenResponse = {
      status: 200,
      data: {
        accessToken: 'myAccessToken',
        accessTokenExpiresAt: 'YYYY-mm-ddTHH:MM:ssZ',
        refreshToken: 'myRefreshToken',
        refreshTokenExpiresAt: 'YYYY-mm-ddTHH:MM:ssZ',
      },
    };

    it('expects response to resolve with data', async () =>{
      axios.mockResolvedValue(refreshAuthTokenResponse);
      const response = await Register.refreshAuthToken();
      console.log(response);
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(refreshAuthTokenResponse.data);
    });
  })
});
