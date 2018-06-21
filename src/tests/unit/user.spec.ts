import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

beforeEach(() => {
  this.pSdk = new PillarSdk({
    privateKey: 'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
  });
});

describe('The User Class: Update method', () => {
  it('should successfully call with valid data', () => {
    const userUpdateData =
      {
        walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
        username: 'bob123',
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
        profileImage: 'http://photo1.jpg',
        status: 'pending|OTP-verified|active',
        verificationService: 'Nivaura',
        verificationStatus: 'approved',
        verificationReference: 'x1234y44',
        investorClassification: 'sophisticated',
      };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.user.update(userUpdateData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          data: userUpdateData,
          url: 'http://localhost:8080/user/update',
        }),
    );
  });

});

describe('The User Class: Info method', () => {
  it('should successfully call with valid data', () => {
    const userInfoData = {
      walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      username: 'bob',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.user.info(userInfoData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          params: userInfoData,
          url: 'http://localhost:8080/user/info',
        }),
    );
  });

});

describe('The User Class: Search method', () => {
  it('should successfully call with valid data', () => {
    const userSearchData = {
      walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      query: 'searchforme',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.user.search(userSearchData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          params: userSearchData,
          url: 'http://localhost:8080/user/search',
        }),
    );
  });

});

describe('The User Class: Delete method', () => {
  it('should successfully call with valid data', () => {
    const userInfoData = {
      walletId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.user.delete(userInfoData);

    expect(spy).toHaveBeenCalledWith(
    expect.objectContaining(
      {
        headers: { 'X-API-Signature': expect.anything() },
        data: userInfoData,
        url: 'http://localhost:8080/user/delete',
      }),
  );
  });
});

describe('The User Class: Create Verification User method', () => {
  it('should successfully call with valid data', () => {
    const userCreate =
      {
        verificationReference: 'xy90483278',
      };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.user.createVerifiedUser(userCreate);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          data: userCreate,
          url: 'http://localhost:8080/user/create-verified-user',
        }),
    );
  });
});

describe('The User Class: Create One Time Password method', () => {
  it('should successfully call with valid data', () => {
    const userCreate =
      {
        phone: '+447321450233',
        function: 'new',
        isVerifiedUser: false,
      };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.user.createOneTimePassword(userCreate);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          data: userCreate,
          url: 'http://localhost:8080/user/create-one-time-password',
        }),
    );
  });
});

describe('The User Class: Validate Phone method', () => {
  it('should successfully call with valid data', () => {
    const userValidatePhone =
      {
        oneTimePassword: '12345',
        phone: '+447711112222',
      };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.user.userValidatePhone(userValidatePhone);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          data: userValidatePhone,
          url: 'http://localhost:8080/user/validate-phone',
        }),
    );
  });
});

describe('The User Class: Validate Email method', () => {
  it('should successfully call with valid data', () => {
    const userValidateEmail =
      {
        oneTimePassword: '12345',
        email: 'bob@bob.com',
      };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.user.userValidateEmail(userValidateEmail);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          data: userValidateEmail,
          url: 'http://localhost:8080/user/validate-email',
        }),
    );
  });
});

describe('The User Class: Update Notifications Preferences method', () => {
  it('should successfully call with valid data', () => {
    const updateNotificationPreferences = {
      userId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      newOffer: false,
      newReceipt: false,
      paymentConfirmation: false,
      paymentStatusUpdate: false,
      profileUpdate: false,
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.user.updateNotificationPreferences(updateNotificationPreferences);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          data: updateNotificationPreferences,
          url: 'http://localhost:8080/user/update-notification-preferences',
        }),
    );
  });
});

describe('The User Class: Username Search method', () => {
  it('should successfully call with valid data', () => {
    const usernameSearch = {
      username: 'bob',
    };

    const spy = jest.spyOn(Requester, 'execute');
    this.pSdk.user.usernameSearch(usernameSearch);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        {
          headers: { 'X-API-Signature': expect.anything() },
          params: usernameSearch,
          url: 'http://localhost:8080/user/username-search',
        }),
    );
  });
});
