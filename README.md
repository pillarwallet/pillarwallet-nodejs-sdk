# Pillar Wallet SDK

The Pillar Wallet SDK aims to make it easy for developers to get started using
[Pillar Wallet backend services](https://github.com/pillarwallet/core-wallet-backend).

## Contents

- [Getting started](#getting-started-sdk)
- [Config](#config)
- [Response and Error](#response-and-error)
- [Methods](#methods)
    - [Wallet Update](#wallet-update)
    - [Asset Defaults](#asset-defaults)
    - [Asset Search](#asset-search)
    - [Asset List](#asset-list)
    - [Connection Invite](#connection-invite)
    - [Connection Accept](#connection-accept)
    - [Connection Reject](#connection-reject)
    - [Connection Cancel](#connection-cancel)
    - [Connection Block](#connection-block)
    - [Connection Mute](#connection-mute)
    - [Notification List](#notification-list)
    - [User Update](#user-update)
    - [User Info](#user-info)
    - [User Search](#user-search)
    - [User Delete](#user-delete)
    - [User Username Search](#user-username-search)
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

## A quick note on versioning

During the pipeline process, we need to automatically ensure that our version number is unique. To do this, we replace the last patch digit of the package.json's version setting with the current circle CI build number. It's a bit of a hack but it means we don't need to think about the version number before committing + pushing.

For example, if you give us version=2.3.1, and this is picked up by circle's 492nd build job, your package is published as version=2.3.492

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

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| privateKey  | hexadecimal string and 64 characters length. | String  | Required  |
| apiUrl  | Uri where api is hosted. String with uri format. e.g. "http://<uri>".| String  | Optional  |

#### 2 - Register the Wallet

To use backend services, register the wallet:

```typescript
pillarSdk.wallet.register(inputParams)
```

Register the wallet in the backend, create the UserProfile table, and register the wallet in BCX.
ICO Wallet can not be created without phone.


```typescript
const inputParams = {
  fcmToken: 'cMctpybZfwyFTyRJBo4omxpgoF2JWf-tlJc8fB0Swrq0z7',
  phone: '+447342234889'
};
```

- Input
  - fcmToken : String
  - phone : String (Optional)

**Expected Output**
  - result : 'success'(String),
  - message : 'Wallet created successfully.'(String),
  - walletId : UUID,
  - userId : UUID

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

### Wallet Update

```typescript
pillarSdk.wallet.update(inputParams)
```

Updates Fcm Token in the backend.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| fcmToken  | copy tbd | String  | Required  |
| walletId  | copy tbd | UUID  | Required  |

**Expected Output**
  - result : 'success'(String),
  - message : 'OK'(String)

### Asset Defaults

```typescript
pillarSdk.asset.defaults(inputParams)
```

Returns a list of assets that are marked as default assets.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | copy tbd | UUID  | Required  |

**Expected Output**
| Element  | Description | Type |
| ------------- | ------------- | ------------- |
| address  | copy tbd | Text  |
| decimals  | copy tbd | Integer  |
| description  | copy tbd | Text  |

  JSON collection of objects with respective values:
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

### Asset Search

```typescript
pillarSdk.asset.search(inputParams)
```
Returns a list of assets that contain the search criteria for name, token symbol, or smart contract hexadecimal address.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | copy tbd | UUID  | Required  |
| query  | copy tbd | String  | Required  |

**Expected Output**
  JSON collection of objects with respective values:
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

### Asset List

```typescript
pillarSdk.asset.list(inputParams)
```
Returns a list of assets that contain the search criteria for name, token symbol, or smart contract hexadecimal address.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | copy tbd | UUID  | Required  |
| query  | copy tbd | String  | Required  |

**Expected Output**
  JSON collection of objects with respective values:
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

### Connection Invite

```typescript
pillarSdk.connection.invite(inputParams)
```

Creates a connection invitation for a user to create a relationship with another contact.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| targetuserId  | copy tbd | UUID  | Required  |
| accessKey  | copy tbd | String  | Required  |
| walletId  | copy tbd | UUID  | Required  |

**Expected Output**
  - result : 'success'(String)
  - message : 'Connection invitation was successfully sent'(String)

### Connection Accept

```typescript
pillarSdk.connection.accept(inputParams)
```

Accepts a connection invitation from another user.
**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| targetuserId  | copy tbd | UUID  | Required  |
| walletId  | copy tbd | UUID  | Required  |
| sourceUserAccessKey  | copy tbd | String  | Required  |
| targetUserAccessKey  | copy tbd | String  | Required  |

**Expected Output**
  - result : 'success'(String)
  - message : 'Connection invitation accepted'(String)

### Connection Reject

```typescript
pillarSdk.connection.reject(inputParams)
```

Rejects a connection invitation from another user.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| targetuserId  | copy tbd | UUID  | Required  |
| accessKey  | copy tbd | String  | Required  |
| walletId  | copy tbd | UUID  | Required  |


**Expected Output**
  - result : 'success'(String)
  - message : 'Connection invitation rejected'(String)

### Connection Cancel

```typescript
pillarSdk.connection.cancel(inputParams)
```

Cancels a connection invitation from another user.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| targetuserId  | copy tbd | UUID  | Required  |
| accessKey  | copy tbd | String  | Required  |
| walletId  | copy tbd | UUID  | Required  |


**Expected Output**
  - result : 'success'(String)
  - message : 'Connection canceled'(String)

### Connection Block

```typescript
pillarSdk.connection.block(inputParams)
```

Blocks a connection request from another user.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| accessKey  | copy tbd | String  | Required  |
| walletId  | copy tbd | UUID  | Required  |

**Expected Output**
  - result : 'success'(String)
  - message : 'Connection blocked'(String)

### Connection Mute

```typescript
pillarSdk.connection.mute(inputParams)
```

Mutes future communication from another contact.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| accessKey  | copy tbd | String  | Required  |
| walletId  | copy tbd | UUID  | Required  |

**Expected Output**
  - result : 'success'(String)
  - message : 'Connection muted'(String)

### Notification List

```typescript
pillarSdk.notification.list(inputParams);
```

Provides a list of notifications for a specific wallet user.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | copy tbd | UUID  | Required  |
| fromTimestamp  | copy tbd | String (ISO 8601 timestamp format)  | Required  |

**Expected Output**
  - result : 'success'(String)
  - Notifications
    - userId : UUID
    - message: Text

### User Update

```typescript
pillarSdk.user.update(inputParams);
```

Updates data elements on a wallet user.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | The user's wallet ID | UUID  | Required  |
| firstName  | The user's first name | String  | Required  |
| lastName  | The user's last name | String  | Required  |
| country  | The user's country or residence | String  | Required  |
| state  | The user's state of residence | String  | Required  |
| city  | The user's city of residence | String  | Required  |
| email  | The user's email address | String  | Required  |
| phone  | The user's phone number | String  | Required  |
| tagline  | The user's profile tagline | String  | Required  |
| taglineStatus  | Whether the user has completed a tagline for their profile | Boolean  | Required  |
| userSearchable  | Whether the user's profile is searchable in the address book | Boolean  | Required  |
| profileImage  | The profile image of the user | String(Url)  | Required  |
| status  | The online status of the user | ('pending|OTP-verified|active')  | Required  |
| verificationService | The service used to verify the wallet user (as an investor? exhange user?)| String  | Required  |
| verificationStatus  | copy tbd | String  | Required  |
| verificationReference  | copy tbd | String  | Required  |
| investorClassification  | The user's designated investor classification| String  | Required  |

**Expected Output**
  - result : 'success'(String),
  - message : 'User was successfully updated'(String),
  - Payload JSON object
    - ethAddress : String
    - fcmToken : String
    - signalRegistrationId : String
    - id : String
    - firstName : String
    - lastName : String
    - country : String
    - state : String
    - city : String
    - email : String
    - phone : String
    - tagline : Text
    - taglineStatus : Boolean
    - userSearchable : Boolean
    - profileImage : Text(Url)

### User Info

```typescript
pillarSdk.user.info(inputParams);
```

Retrieves information on an existing wallet user.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | copy tbd | UUID  | Required  |


**Expected Output**
  - Payload JSON object
    - ethAddress : String
    - fcmToken : String
    - signalRegistrationId : String
    - id : String
    - firstName : String
    - lastName : String
    - country : String
    - state : String
    - city : String
    - email : String
    - phone : String
    - tagline : Text
    - taglineStatus : Boolean
    - userSearchable : Boolean
    - profileImage : Text(Url)

### User Search

```typescript
pillarSdk.user.search(inputParams);
```

Provides a list of users that contain the search criteria for first or last name, and is not the current wallet user.
 Also checks if the search string term is at least two characters and if the user allows their profile to be searched.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | copy tbd | UUID  | Required  |
| query  | copy tbd | String  | Required  |


**Expected Output**
  - user : JSON object
  - id : String
  - firstName : String
  - lastName : String
  - country : String
  - state : String
  - city : String
  - profileImage : Text(Url)       

### User Delete

```
 pillarSdk.user.delete(inputParams);
```

Removes a wallet user profile from the database.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | copy tbd | UUID  | Required  |

**Expected Output**
    - result : 'success'(String),
    - message : 'User was successfully deleted'(String),
    - user : JSON object
      - ethAddress : Text
      - fcmToken : Text
      - signalRegistrationId : Text

### User Username Search

```typescript
pillarSdk.user.usernameSearch(inputParams);
```

Provides a list of users that contain the search criteria for first or last name, and is not the current wallet user.
Also checks if the search string term is at least two characters and if the user allows their profile to be searched.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | copy tbd | UUID  | Required  |
| query  | copy tbd | String  | Required  |

**Expected Output**
  - user : JSON object
  - id : String
  - firstName : String
  - lastName : String
  - country : String
  - state : String
  - city : String
  - profileImage : Text(Url)  

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

We use [Swagger](https://app.swaggerhub.com/apis/Pillar-Project7/core-wallet-backend) for versioning.

## License

This project is licensed under the MIT license.


## Acknowledgments

We use the [Pillar Authentication SDK](https://github.com/pillarwallet/pillar-authentication-sdk) to create signatures.
