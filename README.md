# Pillar Wallet SDK 

The Pillar Wallet SDK aims to make it easy for developers to get started using Pillar Wallet backend services.

## Getting Started

Install npm package:

`npm i @pillarwallet/pillarwallet-nodejs-sdk`

In your project:

`const { PillarSdk } = require('@pillarwallet/pillarwallet-nodejs-sdk');`

Instantiate an instance of the Pillar SDK:

`const pSdk = new PillarSdk();`

#### Config

Here you can set the Api Url and Wallet privateKey for future use.

```
const pSdk = new PillarSdk({
  apiUrl: 'http://localhost:8080',
  privateKey: '123',
});
```

In order to use Backend services, you shall first register Wallet.
As explained bellow:

### First Registration

**IMPORTANT! All methods return promises.**

* Getting Response and error

    For every method presented here, it is possible 
to get the response and error doing:
    
 ```
 pSdk.wallet.register(
 {
   ethAddress: '0x3eA19bddb978Db62344Ffba5d37Ba41C83C57917',
   fcmToken: 'cMctpybZfwyFTyRJBo4omxpgoF2JWf-tlJc8fB0Swrq0z7',
   publicKey: 'dfhuodhv8jdv8hsd9nvdvfh',
  }, myPrivateKeyVariable)
 .then((response) => {
   // Successful response!
 })
 .catch((error) => {
   // Unsuccessful response.
 });
 ```

* Wallet Register

Input Parameters

```
const inputParams = {
   ethAddress: '0x3eA19bddb978Db62344Ffba5d37Ba41C83C57917',
   fcmToken: 'cMctpybZfwyFTyRJBo4omxpgoF2JWf-tlJc8fB0Swrq0z7',
   publicKey: 'dfhuodhv8jdv8hsd9nvdvfh',
  }
```

 Method to Register the wallet in the Backend, create the UserProfile Table and register in BCX.
For every request, one wallet privatekey<myPrivateKeyVariable> should be passed as argument.

```
pSdk.wallet.register(inputParams, <myPrivateKeyVariable>)
```

### Methods

* Wallet Update

Input Parameters

```
const inputParams = {
 walletId: 123456,
 ethAddress: "0x3948yhudfh97h3r78hf78hsdi",
 fcmToken: "dfj8hjs9dahfdbf7dsbfbds7f",
 signalRegistrationId: "dcn98adcbsdgc6sbd7csd8gds78"
  }
```

 Method to update ethAddress and FcmToken in the Backend and to set signalRegistrationId, create the UserProfile
 Table and register in BCX.For every request, one wallet privatekey<myPrivateKeyVariable> should be passed as argument.

```
pSdk.wallet.update(inputParams, <myPrivateKeyVariable>)
```

* Asset Defaults

```
const inputParams = {
 walletId: '1',
 };
```

 Method asset defaults returns a list of assets that are marked as default assets.

```
pSdk.asset.defaults(inputParams, <myPrivateKeyVariable>)

```

* Asset Search

```
const inputParams = {
   walletId: 123,
   query: 'search query here',
 };

```

Method asset defaults returns a list of assets that contain the search criteria which would be the name, 
token symbol or smartcontract hexadecimal.

```
pSdk.asset.search(inputParams, <myPrivateKeyVariable>)
```

* Connection Invite

```
const inputParams = {
  targetUserId: 1,
  accessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
  walletId: 1
};
```

Creates a connection invitation for a user to create a relationship with another contact.

```
pSdk.connection.invite(inputParams, <myPrivateKeyVariable>)
```

* Connection Accept

```
const inputParams =
 {
   targetUserId: 1,
   walletId: 1,
   sourceUserAccessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
   targetUserAccessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
 };

```

Creates a connection invitation for a user to create a relationship with another contact

```
pSdk.connection.accept(inputParams, <myPrivateKeyVariable>)
```

* Connection Reject

```
const inputParams = {
     targetUserId: 1,
     accessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
     walletId: 1
 };
```

Reject a connection invitation from another user

```
pSdk.connection.reject(inputParams, <myPrivateKeyVariable>)

```

* Connection Cancel

```
const inputParams = {
     targetUserId: 1,
     accessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
     walletId: 1
 };
```

Cancels a connection invitation that a user previously initiated

```
pSdk.connection.reject(inputParams, <myPrivateKeyVariable>)

```

* Connection Block

```
const inputParams = {
  accessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
  walletId: 1
 };
```

Blocks a connection request from another user

```
pSdk.connection.reject(inputParams, <myPrivateKeyVariable>)

```

* Connection Mute

```
const inputParams = {
  accessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
  walletId: 1
 };
```

Mutes a connection request from another user

```
pSdk.connection.mute(inputParams, <myPrivateKeyVariable>)

```

* Notification List

```
const inputParams = {
  walletId: 1,
  fromTimestamp: '1525263620',
};
```

Provides a list of notifications for a specific wallet user.

```
pSdk.notification.list(inputParams, <myPrivateKeyVariable>);
```

* User Update

```
const inputParams = {
  walletId: 123,
  firstName: 'Homer',
  lastName: 'Simpson',
  email: 'chunkylover69@aol.com',
  phone: '911',
  country: 'United States',
  state: 'NA',
  city: 'Springfield',
  tagline: 'Tagline',
  taglineStatus: 'Busy',
  userSearchable: 'dunno',
  profileImage: 'http://homer.jpg',
};
``` 

Updates data elements on an existing wallet user.

```
pSdk.user.update(inputParams, <myPrivateKeyVariable>y);
```

* User Info

```
const inputParams = {
  walletId: 123,
};
``` 

Retrieve information on an existing wallet user

```
pSdk.user.info(inputParams, <myPrivateKeyVariable>);
```

* User Search

```
const inputParams = {
  walletId: 1,
  query: 'searchforme',
};
``` 

Provides a list of users that contain the search criteria in either their first name or last name, and is not the current wallet user. 
Also it performs a check if the search string term is at least 2 characters and if the user allows their profile to be searched.

```
pSdk.user.search(inputParams, <myPrivateKeyVariable>);
```

* User Delete

```
const inputParams = {
  walletId: 123,
};
``` 

Remove an existing wallet user profile from the database

```
pSdk.user.delete(inputParams, <myPrivateKeyVariable>);
```

## Running the tests

Run the tests

```
npm test
```

or

```
jest
```


### Coding style Guide

We are using TSLint Config Airbnb for Style Guide.
You can find more details [here](https://github.com/airbnb/javascript).

## Versioning

We use [Swagger](https://app.swaggerhub.com/apis/Pillar-Project7/core-wallet-backend/1.0.0) for versioning.

## License

This project is licensed under the MIT License.

## Acknowledgments

* We are using Pillar Authentication SDK to create Signatures. You can find more detais here : [plr-auth-sdk](https://github.com/pillarwallet/pillar-authentication-sdk)
