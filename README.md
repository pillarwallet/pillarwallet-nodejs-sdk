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

```
const pillarSdk = new PillarSdk({
  apiUrl: 'http://localhost:8080',
  privateKey: '3eA19bddb978Db62344Ffba5d37Ba41C83C579173eA19bddb978Db62344Ffba5d37Ba41C83C57917',
});
```
- Input
    -apiUrl(Optional) : string with uri format. e.g. "http://<uri>".
    -privateKey : hexadecimal string and 64 characters length.

#### 2 - Register the Wallet

To use backend services, register the wallet:

```typescript
pillarSdk.wallet.register(inputParams)
```

Register the wallet in the backend, create the UserProfile table, and register the wallet in BCX. 


```typescript
const inputParams = {
   fcmToken: 'cMctpybZfwyFTyRJBo4omxpgoF2JWf-tlJc8fB0Swrq0z7',
 }
```

- Input
    -fcmToken : string
    
- Expected Output
    - result : 'success'(String),
    - message : 'Wallet created successfully.'(String),
    - walletId : Integer
    - userId: Integer

## Response And Error

To get the response and error for these methods, use: 
    
 ```
 pillarSdk.wallet.register(
 {
   fcmToken: 'cMctpybZfwyFTyRJBo4omxpgoF2JWf-tlJc8fB0Swrq0z7',
  })
 .then((response) => {
   // Successful response!
   result = response.result;
   message = response.message;
   walletId = response.walletId;
   userId = response.userId;
 })
 .catch((error) => {
   // Unsuccessful response.
   name = error.name;
   status = error.statusCode; 
   message = error.message;
   error = error.error;
 });
 ```
 
## Methods

**IMPORTANT! All methods return promises.**

**Wallet Update**

```typescript
pillarSdk.wallet.update(inputParams)
```

Updates FcmToken in the backend.

```typescript
const inputParams = {
 walletId: 126,
 fcmToken: "dfj8hjs9dahfdbf7dsbfbds7f",
  }
```

- Input
    -fcmToken : String
    - walletId : Integer
- Expected Output
    - result : 'success'(String),
    - message : 'OK'(String)

**Asset Defaults**

```typescript
pillarSdk.asset.defaults(inputParams)
```

Returns a list of assets that are marked as default assets.

```typescript
const inputParams = {
 walletId: 12,
 };
```

- Input
    - walletId : Integer
- Expected Output
    JSON Collection of Objects with respective Values
    - address: Text,
    - decimals: Integer,
    - description: Text,
    - name: Text,
    - symbol: Text,
    - wallpaperUrl: Text,
    - iconUrl: Text,
    - email: Text,
    - telegram: Text,
    - twitter: Text,
    - website: Text,
    - whitepaper: Text,
    - isDefault: 1 (Boolean).

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

- Input
    - walletId : Integer
    - query : String
- Expected Output
    JSON Collection of Objects with respective Values
    - address: Text,
    - decimals: Integer,
    - description: Text,
    - name: Text,
    - symbol: Text,
    - wallpaperUrl: Text,
    - iconUrl: Text,
    - email: Text,
    - telegram: Text,
    - twitter: Text,
    - website: Text,
    - whitepaper: Text,
    - isDefault: Boolean.

**Connection Invite**

```typescript
pillarSdk.connection.invite(inputParams)
```

Creates a connection invitation for a user to create a relationship with another contact.

```typescript
const inputParams = {
  targetUserId: 1,
  accessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
  walletId: 1
};
```

**Connection Accept**

```typescript
pillarSdk.connection.accept(inputParams)
```

Accepts a connection invitation from another user.

```typescript
const inputParams =
 {
   targetUserId: 1,
   walletId: 1,
   sourceUserAccessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
   targetUserAccessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
 };

```

**Connection Reject**

```typescript
pillarSdk.connection.reject(inputParams)

```

Rejects a connection invitation from another user.

```typescript
const inputParams = {
     targetUserId: 1,
     accessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
     walletId: 1
 };
```

**Connection Cancel**

```typescript
pillarSdk.connection.cancel(inputParams)

```

Cancels a connection invitation from another user.

```typescript
const inputParams = {
     targetUserId: 1,
     accessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
     walletId: 1
 };
```

**Connection Block**

```typescript
pillarSdk.connection.block(inputParams)

```

Blocks a connection request from another user.

```typescript
const inputParams = {
  accessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
  walletId: 1
 };
```

**Connection Mute**

```typescript
pillarSdk.connection.mute(inputParams)

```

Mutes future communication from another contact.

```typescript
const inputParams = {
  accessKey: 'djhfjkasckbnscjuhdh89suhdnjsd',
  walletId: 1
 };
```

**Notification List**

```typescript
pillarSdk.notification.list(inputParams);
```

Provides a list of notifications for a specific wallet user.

```typescript
const inputParams = {
  walletId: 1,
  fromTimestamp: '2016-05-24T15:54:14.876Z',
};
```

- Input
    - walletId : Integer
    - fromTimestamp : String (ISO 8601 timestamp format)
- Expected Output
    - result : 'success'(String)
    - Notification
        - userId : Integer
        - message: Text
    
**User Update**

```typescript
pillarSdk.user.update(inputParams);
```

Updates data elements on a wallet user.

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
  taglineStatus: true ,
  userSearchable: true ,
  profileImage: 'http://homer.jpg',
};
``` 

- Input
    - walletId : Integer
    - firstName : String
    - lastName : String
    - country : String
    - state : String
    - city : String
    - email : String
    - phone : String
    - tagline : String
    - taglineStatus : Boolean
    - userSearchable : Boolean
    - profileImage : String(Url)
- Expected Output
     - result : 'success'(String),
     - message : 'User was successfully updated'(String),
     - Payload JSON Object
             - ethAddress : String
             - fcmToken : String
             - signalRegistrationId : String
             - id : Integer
             - firstName : String
             - lastName : String
             - country : String
             - state : String
             - city : String
             - email : String
             - phone : String
             - tagline : Boolean
             - taglineStatus : Boolean
             - userSearchable : Boolean
             - profileImage : String(Url)

**User Info**

```typescript
pillarSdk.user.info(inputParams);
```

Retrieves information on an existing wallet user.

```typescript
const inputParams = {
  walletId: 123,
};
```

- Input
    - walletId : Integer
- Expected Output
    - Payload JSON Object
        - ethAddress : String
        - fcmToken : String
        - signalRegistrationId : String
        - id : Integer
        - firstName : String
        - lastName : String
        - country : String
        - state : String
        - city : String
        - email : String
        - phone : String
        - tagline : Boolean
        - taglineStatus : Boolean
        - userSearchable : Boolean
        - profileImage : String(Url)
        
**User Search**

```typescript
pillarSdk.user.search(inputParams);
```

Provides a list of users that contain the search criteria for first or last name, and is not the current wallet user.
 Also checks if the search string term is at least two characters and if the user allows their profile to be searched.

```typescript
const inputParams = {
  walletId: 1,
  query: 'searchforme',
};
```

- Input
    - walletId : Integer
    - query : String
- Expected Output
    - result : 'success'(String),
    - message : 'User was successfully deleted'(String),
    - user : JSON Object
        - id : Integer
        - firstName : String
        - lastName : String
        - country : String
        - state : String
        - city : String
        - profileImage : String(Url)
        

**User Delete**

```
 pillarSdk.user.delete(inputParams);
```

Removes a wallet user profile from the database.

```typescript
const inputParams = {
  walletId: 123,
};
```
- Input
    - walletId : Integer
- Expected Output
    - result : 'success'(String),
    - message : 'User was successfully deleted'(String),
    - user : JSON Object
        - ethAddress : String
        - fcmToken : String
        - signalRegistrationId : String
        
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
