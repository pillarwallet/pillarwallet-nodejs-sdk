import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

beforeEach(() => {
  this.pSdk = new PillarSdk({
    privateKey: 'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
  });
});

describe('The Wallet Class: Register method', () => {
  it('should successfully call with valid data', () => {
    const walletRegistrationData = {
      fcmToken: '987qwe',
      username: 'sdfsdfs',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.wallet.register(walletRegistrationData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          data: walletRegistrationData,
          url: 'http://localhost:8080/wallet/register',
        }),
    );
  });
});

describe('The Wallet Class: Update method', () => {
  it('should successfully call with valid data', () => {
    const walletUpdateData = {
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      fcmToken: '987qwe',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.wallet.update(walletUpdateData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          data: walletUpdateData,
          url: 'http://localhost:8080/wallet/update',
        }),
    );
  });
});
