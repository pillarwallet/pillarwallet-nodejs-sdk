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

  jest
    .spyOn(Requester, 'execute')
    .mockResolvedValue({ status: 200, data: 'success' });

  beforeEach(() => {
    Requester.execute.mockClear();
  });

  afterAll(() => {
    Requester.execute.mockRestore();
    jest.restoreAllMocks();
  });

  describe('registerKeys', () => {
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
      expect(response.data).toEqual('success');
    });
  });

  describe('registerAuth', () => {
    const data = {
      uuid: uuIdv4,
      code: Configuration.accessKeys.verifier,
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
      expect(response.data).toEqual('success');
    });
  });
});
