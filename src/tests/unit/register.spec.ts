import { Register } from '../../lib/register';
import { Requester } from '../../utils/requester';
import { Configuration } from '../../lib/configuration';
import { v4 as uuid } from 'uuid';

jest.mock('../../lib/configuration');

describe('Register Class', () => {
  Configuration.accessKeys.apiUrl = 'http://localhost:8080';
  Configuration.accessKeys.verifier = 'oneCodeVerifier';
  const publicKey = 'myPub';
  const privateKey = 'myPrivateKey';
  const uuIdv4 = uuid();

  afterEach(() => {
    Requester.execute.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe.only('registerKeys', () => {
    const regKeysResponse = {
      status: 200,
      data: {
        expiresAt: '2011-06-14T04:12:36Z',
        nonce: '4321',
      },
    };

    beforeEach(() => {
      jest.spyOn(Requester, 'execute').mockResolvedValue(regKeysResponse);
    });

    it('should send http request containing publicKey and identifier', () => {
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
      const response = await Register.registerKeys(publicKey, uuIdv4);
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(regKeysResponse.data);
    });
  });

  describe.only('registerAuth', () => {
    const regAuthResponse = {
      status: 200,
      data: {
        authorizationCode: 'Authorisation code',
        expiresAt: '2011-06-14T04:12:36Z',
      },
    };

    beforeEach(() => {
      jest.spyOn(Requester, 'execute').mockResolvedValue(regAuthResponse);
    });

    const data = {
      nonce: '4344132',
      uuid: uuIdv4,
      codeChallenge: Configuration.accessKeys.verifier,
      ethAddress: 'OneEthAddress',
      fcmToken: 'OneFcmToken',
      username: 'OneUserName',
    };

    it('should send http request containing data and privateKey', () => {
      Register.registerAuth(data, privateKey);
      expect(Requester.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          data,
          url: 'http://localhost:8080/register/auth',
        }),
      );
    });

    it('expects response to resolve with data', async () => {
      const response = await Register.registerAuth(data, privateKey);
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(regAuthResponse.data);
    });
  });
});
