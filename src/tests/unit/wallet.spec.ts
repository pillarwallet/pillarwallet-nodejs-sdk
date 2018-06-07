import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

beforeEach(() => {
  this.pSdk = new PillarSdk({
    privateKey: 'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
  });
});

describe.only('The Wallet Class: Register method', () => {
  it('should successfully call with valid data', () => {
    const walletRegistrationData = {
      fcmToken: '987qwe',
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
          body: walletUpdateData,
          url: 'http://localhost:8080/wallet/update',
        }),
    );
  });
});

describe('The Wallet Class: Validate method', () => {
  it('should successfully call with valid data', () => {
    const walletValidateData = {
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      ethAddress: '0xc1912fee45d61c87cc5ea59dae31190fffff232b',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.wallet.validate(walletValidateData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          qs: walletValidateData,
          url: 'http://localhost:8080/wallet/validate-wallet',
        }),
    );
  });
});

describe('The Wallet Class: Register Address method', () => {
  it('should successfully call with valid data', () => {
    const registerAddressData = {
      walletId: 'd85b4694-9255-44f1-b110-ed7ab7e7e42a',
      blockchain: 'ethereum',
      blockchainAddress: '0xc1912fee45d61c87cc5ea59dae31190fffff232b',
      fcmToken: 'dfj8hjs9dahfdbf7dsbfbds7f',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.wallet.registerAddress(registerAddressData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          body: registerAddressData,
          url: 'http://localhost:8080/wallet/registerAddress',
        }),
    );
  });

});

describe('The Wallet Class: Unregister Address method', () => {
  it('should successfully call with valid data', () => {
    const unregisterAddressData = {
      walletId: 'd85b4694-9255-44f1-b110-ed7ab7e7e42a',
      blockchain: 'ethereum',
      blockchainAddress: '0xc1912fee45d61c87cc5ea59dae31190fffff232b',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.wallet.unregisterAddress(unregisterAddressData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          body: unregisterAddressData,
          url: 'http://localhost:8080/wallet/unregisterAddress',
        }),
    );
  });

});
