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

## Get Started

Install the npm package:

`npm i @pillarwallet/pillarwallet-nodejs-sdk`

In your project:

`
const { PillarSdk } = require('@pillarwallet/pillarwallet-nodejs-sdk');
`

## Config

**IMPORTANT! Complete these steps to use this SDK:**

#### 1 - Create An Instance

Instantiate the Pillar SDK, then set the apiUrl(Optional) and wallet privateKey variables.

```typescript
const pillarSdk = new PillarSdk({
  apiUrl: 'http://localhost:8080',
  privateKey: '3eA19bddb978Db62344Ffba5d37Ba41C83C579173eA19bddb978Db62344Ffba5d37Ba41C83C57917',
});
```

#### 2 - Register the Wallet

To use backend services, register the wallet:

```typescript
pillarSdk.wallet.register(inputParams)
```

Register the wallet in the backend, create the UserProfile table, and register the wallet in BCX. 

```typescript
const inputParams = {
   ethAddress: '0x3eA19bddb978Db62344Ffba5d37Ba41C83C57917',
   fcmToken: 'cMctpybZfwyFTyRJBo4omxpgoF2JWf-tlJc8fB0Swrq0z7',
   publicKey: 'dfhuodhv8jdv8hsd9nvdvfh',
  }
```
## Response And Error

To get the response and error for these methods, use: 
    
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

**Wallet Update**

```typescript
const inputParams = {
 walletId: 126,
 ethAddress: "0x3948yhudfh97h3r78hf78hsdi",
 fcmToken: "dfj8hjs9dahfdbf7dsbfbds7f",
 signalRegistrationId: "dcn98adcbsdgc6sbd7csd8gds78"
  }
```

Updates ethAddress and FcmToken in the backend and sets signalRegistrationId.

```typescript
pillarSdk.wallet.update(inputParams)
```

**Asset Defaults**

```typescript
const inputParams = {
 walletId: 12,
 };
```

 Returns a list of assets that are marked as default assets.

```typescript
pillarSdk.asset.defaults(inputParams)

```

**Asset Search**

```typescript
const inputParams = {
   walletId: 123,
   query: 'search query here',
 };

```

Returns a list of assets that contain the search criteria for name, token symbol, or smart contract hexadecimal address.

```typescript
pillarSdk.asset.search(inputParams)
```

**Connection Invite**

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

**Connection Accept**

```typescript
const inputParams =
 {
   targetUserId: 1,
   walletId: 1,
   sourceUserAccessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
   targetUserAccessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
 };

```

Accepts a connection invitation from another user.

```typescript
pillarSdk.connection.accept(inputParams)
```

**Connection Reject**

```typescript
const inputParams = {
     targetUserId: 1,
     accessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
     walletId: 1
 };
```

Rejects a connection invitation from another user.

```typescript
pillarSdk.connection.reject(inputParams)

```

**Connection Cancel**

```typescript
const inputParams = {
     targetUserId: 1,
     accessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
     walletId: 1
 };
```

Cancels a connection invitation from another user.

```typescript
pillarSdk.connection.cancel(inputParams)

```

**Connection Block**

```typescript
const inputParams = {
  accessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
  walletId: 1
 };
```

Blocks a connection request from another user.

```typescript
pillarSdk.connection.block(inputParams)

```

**Connection Mute**

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

**Notification List**

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

**User Update**

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

Updates data elements on a wallet user.

```typescript
pillarSdk.user.update(inputParams);
```

**User Info**

```typescript
const inputParams = {
  walletId: 123,
};
``` 

Retrieves information on an existing wallet user.

```typescript
pillarSdk.user.info(inputParams);
```

**User Search**

```typescript
const inputParams = {
  walletId: 1,
  query: 'searchforme',
};
``` 

Provides a list of users that contain the search criteria for first or last name, and is not the current wallet user.
 Also checks if the search string term is at least two characters and if the user allows their profile to be searched.

```typescript
pillarSdk.user.search(inputParams);
```

**User Delete**

```typescript
const inputParams = {
  walletId: 123,
};
``` 

Removes a wallet user profile from the database.


 pillarSdk.user.delete(inputParams);

## Tests

Run the test:

```
npm test
```

or:

```
jest
```

## Coding Style Guide

We use the [TSLint Config Airbnb Style Guide](https://github.com/airbnb/javascript).

## Versioning

We use [Swagger](https://app.swaggerhub.com/apis/Pillar-Project7/core-wallet-backend/1.0.0) for versioning.

## License

This project is licensed under the MIT license.

## Acknowledgments

We use the [Pillar Authentication SDK](https://github.com/pillarwallet/pillar-authentication-sdk) to create signatures.
