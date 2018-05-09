# Pillar Wallet SDK 

The Pillar Wallet SDK aims to make it easy for developers to get started using 
[Pillar Wallet backend services](https://github.com/pillarwallet/core-wallet-backend).

## Contents

- [Getting started](#getting-started-sdk)
- [Config](#config)
- [Response and Error](#response-and-error)
- [Methods](#methods)
- [Tests](#tests)
- [Coding Style Guide](#coding-style-guide)
- [Versioning](#versioning)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started Sdk

Install npm package:

`npm i @pillarwallet/pillarwallet-nodejs-sdk`

In your project:

`
const { PillarSdk } = require('@pillarwallet/pillarwallet-nodejs-sdk');
`

## Config

**IMPORTANT! First, you should take these 2 following steps to use this SDK:**

#### 1- Create An Instance

Instantiate an instance of the Pillar SDK, you can set the Api Url 
and Wallet privateKey variables.

```typescript
const pillarSdk = new PillarSdk({
  apiUrl: 'http://localhost:8080',
  privateKey: '3eA19bddb978Db62344Ffba5d37Ba41C83C579173eA19bddb978Db62344Ffba5d37Ba41C83C57917',
});
```

In order to use Backend services, you shall first register Wallet.
As explained bellow:

#### 2- First Registration

```typescript
pillarSdk.wallet.register(inputParams)
```

Method to Register the wallet in the Backend, create the UserProfile Table and register in BCX.
Input Parameters

```typescript
const inputParams = {
   ethAddress: '0x3eA19bddb978Db62344Ffba5d37Ba41C83C57917',
   fcmToken: 'cMctpybZfwyFTyRJBo4omxpgoF2JWf-tlJc8fB0Swrq0z7',
   publicKey: 'dfhuodhv8jdv8hsd9nvdvfh',
  }
```
## Response And Error

For every method presented here, it is possible to get the response and error doing:
    
 ```typescript
 pillarSdk.wallet.register(
 {
   ethAddress: '0x3eA19bddb978Db62344Ffba5d37Ba41C83C57917',
   fcmToken: 'cMctpybZfwyFTyRJBo4omxpgoF2JWf-tlJc8fB0Swrq0z7',
   publicKey: 'dfhuodhv8jdv8hsd9nvdvfh',
  })
 .then((response) => {
   // Successful response!
 })
 .catch((error) => {
   // Unsuccessful response.
 });
 ```

## Methods

**IMPORTANT! All methods return promises.**

* Wallet Update

Input Parameters

```typescript
const inputParams = {
 walletId: 126,
 ethAddress: "0x3948yhudfh97h3r78hf78hsdi",
 fcmToken: "dfj8hjs9dahfdbf7dsbfbds7f",
 signalRegistrationId: "dcn98adcbsdgc6sbd7csd8gds78"
  }
```

Method to update ethAddress and FcmToken in the Backend and to set signalRegistrationId.

```typescript
pillarSdk.wallet.update(inputParams)
```

* Asset Defaults

```typescript
const inputParams = {
 walletId: 12,
 };
```

 Method asset defaults returns a list of assets that are marked as default assets.

```typescript
pillarSdk.asset.defaults(inputParams)

```

* Asset Search

```typescript
const inputParams = {
   walletId: 123,
   query: 'search query here',
 };

```

Method asset defaults returns a list of assets that contain the search criteria which would be the name, 
token symbol or smartcontract hexadecimal address.

```typescript
pillarSdk.asset.search(inputParams)
```

* Connection Invite

```typescript
const inputParams = {
  targetUserId: 1,
  accessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
  walletId: 1
};
```

Creates a connection invitation for a user to create a relationship with another contact.

```typescript
pillarSdk.connection.invite(inputParams)
```

* Connection Accept

```typescript
const inputParams =
 {
   targetUserId: 1,
   walletId: 1,
   sourceUserAccessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
   targetUserAccessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
 };

```

Accept a connection invitation from another user

```typescript
pillarSdk.connection.accept(inputParams)
```

* Connection Reject

```typescript
const inputParams = {
     targetUserId: 1,
     accessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
     walletId: 1
 };
```

Reject a connection invitation from another user

```typescript
pillarSdk.connection.reject(inputParams)

```

* Connection Cancel

```typescript
const inputParams = {
     targetUserId: 1,
     accessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
     walletId: 1
 };
```

Cancels a connection invitation that a user previously initiated

```typescript
pillarSdk.connection.cancel(inputParams)

```

* Connection Block

```typescript
const inputParams = {
  accessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
  walletId: 1
 };
```

Blocks a connection request from another user

```typescript
pillarSdk.connection.block(inputParams)

```

* Connection Mute

```typescript
const inputParams = {
  accessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
  walletId: 1
 };
```

Mutes future communication from another contact.

```typescript
pillarSdk.connection.mute(inputParams)

```

* Notification List

```typescript
const inputParams = {
  walletId: 1,
  fromTimestamp: '1525263620',
};
```

Provides a list of notifications for a specific wallet user.

```typescript
pillarSdk.notification.list(inputParams);
```

* User Update

```typescript
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

```typescript
pillarSdk.user.update(inputParams);
```

* User Info

```typescript
const inputParams = {
  walletId: 123,
};
``` 

Retrieve information on an existing wallet user

```typescript
pillarSdk.user.info(inputParams);
```

* User Search

```typescript
const inputParams = {
  walletId: 1,
  query: 'searchforme',
};
``` 

Provides a list of users that contain the search criteria in either their first name or last name,
and is not the current wallet user. Also it performs a check if the search string term is at least 2 
characters and if the user allows their profile to be searched.

```typescript
pillarSdk.user.search(inputParams);
```

* User Delete

```typescript
const inputParams = {
  walletId: 123,
};
``` 

Remove an existing wallet user profile from the database


 pillarSdk.user.delete(inputParams);

## Tests

Run the test

```
npm test
```

or

```
jest
```

## Coding style Guide

We are using TSLint Config Airbnb for Style Guide.
You can find more details [here](https://github.com/airbnb/javascript).

## Versioning

We use [Swagger](https://app.swaggerhub.com/apis/Pillar-Project7/core-wallet-backend/1.0.0) for versioning.

## License

This project is licensed under the MIT License.

## Acknowledgments

* We are using Pillar Authentication SDK to create Signatures. You can find more detais here : 
    [plr-auth-sdk](https://github.com/pillarwallet/pillar-authentication-sdk)
