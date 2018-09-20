# Pillar Wallet SDK

The Pillar Wallet SDK aims to make it easy for developers to get started using
[Pillar Wallet backend services](https://github.com/pillarwallet/platform-core).

## Contents

- [Getting started](#getting-started-sdk)
- [Config](#config)
- [Response and Error](#response-and-error)
- [Methods](#methods)
    - [Wallet Update](#wallet-update)
    - [Wallet Register Address](#wallet-register-address)
    - [Wallet Unregister Address](#wallet-unregister-address)
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
    - [Investments Deposit Request](#investments-deposit-request)
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

Instantiate the Pillar SDK, then set the apiUrl (optional), notificationsUrl (optional) and wallet privateKey variables.

```
const pillarSdk = new PillarSdk({
  apiUrl: 'http://localhost:8080',
  notificationsUrl: 'https://localhost:8081',
  privateKey: '3eA19bddb978Db62344Ffba5d37Ba41C83C579173eA19bddb978Db62344Ffba5d37Ba41C83C57917',
});
```

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| privateKey  | Hexadecimal string and 64 characters in length. | String  | Required  |
| apiUrl  | URL where API is hosted. String with URL format. e.g. "http://<url>".| String  | Optional  |
| notificationsUrl  | URL where the Notifications Service is hosted. String with URL format. e.g. "http://<url>".| String  | Optional  |

#### 2 - Register the Wallet

To use backend services, register the wallet:

```typescript
pillarSdk.wallet.register(inputParams)
```

Register the wallet in the backend, create the UserProfile table, and register the wallet in BCX(Blockchain Explorer).
Wallet can not be created without username.


```typescript
const inputParams = {
  fcmToken: 'cMctpybZfwyFTyRJBo4omxpgoF2JWf-tlJc8fB0Swrq0z7',
  username: 'bob123'
};
```


**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| fcmToken  | The Firebase Cloud Message Token of One Wallet. | String  | Required  |
| username  | The Username of One Wallet.  | String  | Required  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| message  | 'Wallet created successfully' | String  |
| walletId  | e.g. '6e081b82-dbed-4485-bdbc-a808ad911758' | UUID |
| userId  | e.g. '7e081b82-cabd-3321-aadd-b443212378bd' | UUID |

## Response And Error

To get the response and error for these methods, use:

 ```
 pillarSdk.wallet.register(
 {
   fcmToken: 'cMctpybZfwyFTyRJBo4omxpgoF2JWf-tlJc8fB0Swrq0z7',
   username: 'bob123'
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
| fcmToken  | The Firebase Cloud Message Token of One Wallet. | String  | Required  |
| walletId  | The Wallet Identifier. | UUID  | Required  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| message  | 'OK' | String  |

### Wallet Register Address

```typescript
pillarSdk.wallet.registerAddress(inputParams)
```

Register the specified blockchain address for notifications and for BCX monitoring

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| fcmToken  | The Firebase Cloud Message Token of One Wallet. | String  | Required  |
| walletId  | The Wallet Identifier. | UUID  | Required  |
| blockchainAddress  | The blockchain address of one wallet | String  | Required  |
| blockchain  | The blockchain environment | String  |  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| message  | 'Successfully registered address on BCX' | String  |

### Wallet Unregister Address

```typescript
pillarSdk.wallet.unregisterAddress(inputParams)
```

Unregister the specified blockchain address for notifications and for BCX monitoring

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | The Wallet Identifier. | UUID  | Required  |
| blockchainAddress  | The blockchain address of one wallet | String  | Required  |
| blockchain  | The blockchain environment | String  |  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| message  | 'Successfully unregistered address on BCX' | String  |

### Asset Defaults

```typescript
pillarSdk.asset.defaults(inputParams)
```

Returns a list of assets that are marked as default assets.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | The Wallet Identifier. | UUID  | Required  |

**Expected Output**

JSON collection of objects with respective values:

| Element  | Description | Type |
| ------------- | ------------- | ------------- |
| address  | The Token Address | String  |
| decimals  | The Number of Decimals | Integer  |
| description  | The Token Description | String  |
| name  | The Token Name | String  |
| symbol  | The Token Ticker Symbol | String  |
| wallpaperUrl  | One Predefined Wallpaper For Token | String  |
| iconUrl  | The Token Icon | String  |
| email  | The Token Email | String  |
| telegram  | The Token Telegram | String  |
| twitter  | The Token Twitter | String  |
| website  | The Token Website | String  |
| whitepaper  | The Token Whitepaper | String  |
| isDefault  | isDefault Flag for Token | Boolean  |
| isDefaultToken  | isDefaultToken Flag for Token | Boolean  |

### Asset Search

```typescript
pillarSdk.asset.search(inputParams)
```

Returns a list of assets that contain the search criteria for name, token symbol, or smart contract hexadecimal address.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | The Wallet Identifier. | UUID  | Required  |
| query  | Search Criteria | String  | Required  |

**Expected Output**

JSON collection of objects with respective values:

| Element  | Description | Type |
| ------------- | ------------- | ------------- |
| address  | The Token Address | String  |
| decimals  | The Number of Decimals | Integer  |
| description  | The Token Description | String  |
| name  | The Token Name | String  |
| symbol  | The Token Ticker Symbol | String  |
| wallpaperUrl  | One Predefined Wallpaper For Token | String  |
| iconUrl  | The Token Icon | String  |
| email  | The Token Email | String  |
| telegram  | The Token Telegram | String  |
| twitter  | The Token Twitter | String  |
| website  | The Token Website | String  |
| whitepaper  | The Token Whitepaper | String  |
| isDefault  | isDefault Flag for Token | Boolean  |
| isDefaultToken  | isDefaultToken Flag for Token | Boolean  |

### Asset List

```typescript
pillarSdk.asset.list(inputParams)
```

Returns the full list of assets.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | The Wallet Identifier. | UUID  | Required  |

**Expected Output**

JSON collection of objects with respective values:

| Element  | Description | Type |
| ------------- | ------------- | ------------- |
| address  | The Token Address | String  |
| decimals  | The Number of Decimals | Integer  |
| description  | The Token Description | String  |
| name  | The Token Name | String  |
| symbol  | The Token Ticker Symbol | String  |
| wallpaperUrl  | One Predefined Wallpaper For Token | String  |
| iconUrl  | The Token Icon | String  |
| email  | The Token Email | String  |
| telegram  | The Token Telegram | String  |
| twitter  | The Token Twitter | String  |
| website  | The Token Website | String  |
| whitepaper  | The Token Whitepaper | String  |
| isDefault  | isDefault Flag for Token | Boolean  |
| isDefaultToken  | isDefaultToken Flag for Token | Boolean  |

### Connection Invite

```typescript
pillarSdk.connection.invite(inputParams)
```

Creates a connection invitation for a user to create a relationship with another contact.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| targetuserId  | The Contact User Identifier. | UUID  | Required  |
| accessKey  | The Access Key. | String  | Required  |
| walletId  | The Wallet Identifier. | UUID  | Required  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| message  | 'Connection invitation was successfully sent' | String  |

### Connection Accept

```typescript
pillarSdk.connection.accept(inputParams)
```

Accepts a connection invitation from another user.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| targetuserId  | The Contact User Identifier. | UUID  | Required  |
| walletId  | The Wallet Identifier. | UUID  | Required  |
| sourceUserAccessKey  | Source User Access Key. | String  | Required  |
| targetUserAccessKey  | Target User Access Key. | String  | Required  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| message  | 'Connection invitation accepted' | String  |

### Connection Reject

```typescript
pillarSdk.connection.reject(inputParams)
```

Rejects a connection invitation from another user.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| targetuserId  | The Contact User Identifier. | UUID  | Required  |
| accessKey  | The Access Key. | String  | Required  |
| walletId  | The Wallet Identifier. | UUID  | Required  |


**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| message  | 'Connection invitation rejected' | String  |

### Connection Cancel

```typescript
pillarSdk.connection.cancel(inputParams)
```

Cancels a connection invitation from another user.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| targetuserId  | The Contact User Identifier. | UUID  | Required  |
| accessKey  | The Access Key. | String  | Required  |
| walletId  | The Wallet Identifier. | UUID  | Required  |


**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| message  | 'Connection canceled' | String  |

### Connection Block

```typescript
pillarSdk.connection.block(inputParams)
```

Blocks a connection request from another user.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| accessKey  | The Access Key. | String  | Required  |
| walletId  | The Wallet Identifier. | UUID  | Required  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| message  | 'Connection blocked' | String  |

### Connection Mute

```typescript
pillarSdk.connection.mute(inputParams)
```

Mutes future communication from another contact.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| accessKey  | The Access Key. | String  | Required  |
| walletId  | The Wallet Identifier. | UUID  | Required  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| message  | 'Connection muted' | String  |

### Notification List

```typescript
pillarSdk.notification.list(inputParams);
```

Provides a list of notifications for a specific wallet user.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | The Wallet Identifier.  | UUID  | Required  |
| fromTimestamp  | Stamp of Date/Time | String (ISO 8601 timestamp format)  |  |
| type | The notification type | String | |
| fetchLatest | A flag for fetching latest notification | Boolean | |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |

JSON Notifications with respective values::

| Name  | Description | Type |
| ------------- | ------------- | ------------- |
| type  | The User Identifier. | UUID  |
| meta | The Sources keys support the payload  | |
| payload | The payload of one notification |
| createdAt | The unix timestamp of one notification  | |

### Investments Deposit Request

```typescript
pillarSdk.investments.depositRequest(inputParams);
```

Request deposit account information/credentials from service provider.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | The Wallet Identifier.  | UUID  | Required  |
| currency | The Currency ticker symbols | String | Required |
| serviceProvider | The ICO providers | String | |

**Expected Output**

JSON Investments with respective values::

| Name  | Description | Type |
| ------------- | ------------- | ------------- |
| account  | Account number | Number  |
| iban | International bank account number  | String |
| bic | A bank identifier code | String |
| reference | Reference of bank transfer | String |
| beneficiary | The person or entity who will receive a payment | String |
| bankName |  The name of the bank | String |
| currency | The Currency ticker symbols  | String |

### User Update

```typescript
pillarSdk.user.update(inputParams);
```

Updates data elements on a wallet user.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | The Wallet Identifier. | UUID  | Required  |
| firstName  | The User's First Name | String  | Optional  |
| lastName  | The User's Last Name | String  | Optional  |
| country  | The User's Country Or Residence | String  | Optional  |
| state  | The User's State Of Residence | String  | Optional  |
| city  | The User's City of Residence | String  | Optional  |
| email  | The User's Email Address | String  | Optional  |
| phone  | The User's Phone Number | String  | Optional  |
| tagline  | The User's profile tagline | String  | Optional  |
| taglineStatus  | Whether the user has completed a tagline for their profile | Boolean  | Optional  |
| userSearchable  | Whether the user's profile is searchable in the address book | Boolean  | Optional  |
| profileImage  | The Profile Image of the user | String(Url)  | Optional  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| message  | 'User was successfully updated' | String  |

JSON collection of objects with respective values:

| Element  | Description | Type |
| ------------- | ------------- | ------------- |
| id  | The User Identifier | UUID  |
| username  | The Username | String  |
| firstName  | The User's First Name | String  |
| lastName  | The User's Last Name  | String  |
| email  | The User's Email Address | String  |
| isEmailVerified  | Flag to Determine If Email Address Is Verified | Boolean |
| emailOneTimePassword  | Five Digit One Time Password | String |
| phone  |  The User's Phone | String |
| isPhoneVerified  | Flag to Determine If Phone Number Is Verified | String
| phoneOneTimePassword  | Five Digit One Time Password | Boolean |
| country  | The user's country or residence | String |
| state  | The user's state of residence | String |
| city  | The user's city of residence | String |
| email  | The user's email address | String |
| phone  | The user's phone number | String |
| tagline  | The user's profile tagline | String |
| taglineStatus  | Whether the user has completed a tagline for their profile | Boolean |
| userSearchable  | Whether the user's profile is searchable in the address book | Boolean |
| profileImage  | The profile image of the user | String(Url) |
| pending  | Check if still waiting for verification | Boolean |

### User Info

```typescript
pillarSdk.user.info(inputParams);
```

Retrieves information on an existing wallet user.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | The Wallet Identifier. | UUID  | Required  |


**Expected Output**

JSON collection of objects with respective values:

| Element  | Description | Type |
| ------------- | ------------- | ------------- |
| id  | The User Identifier | UUID  |
| username  | The Username | String  |
| firstName  | The User's First Name | String  |
| lastName  | The User's Last Name  | String  |
| email  | The User's Email Address | String  |
| isEmailVerified  | Flag to Determine If Email Address Is Verified | Boolean |
| phone  |  The User's Phone | String |
| isPhoneVerified  | Flag to Determine If Phone Number Is Verified | String
| country  | The user's country or residence | String |
| state  | The user's state of residence | String |
| city  | The user's city of residence | String |
| email  | The user's email address | String |
| tagline  | The user's profile tagline | String |
| taglineStatus  | Whether the user has completed a tagline for their profile | Boolean |
| userSearchable  | Whether the user's profile is searchable in the address book | Boolean |
| profileImage  | The profile image of the user | String(Url) |

### User Search

```typescript
pillarSdk.user.search(inputParams);
```

Provides a list of users that contain the search criteria for first or last name, and is not the current wallet user.
 Also checks if the search string term is at least two characters and if the user allows their profile to be searched.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | The Wallet Identifier.| UUID  | Required  |
| query  | The Search String | String  | Required  |


**Expected Output**

| Element  | Description | Type |
| ------------- | ------------- | ------------- |
| id  | The User Identifier | UUID  |
| username  | The Username | String  |
| firstName  | The User's First Name | String  |
| lastName  | The User's Last Name  | String  |
| country  | The user's country or residence | String |
| state  | The user's state of residence | String |
| city  | The user's city of residence | String |
| profileImage  | The profile image of the user | String(Url) |

### User Delete

```
 pillarSdk.user.delete(inputParams);
```

Removes a wallet user profile from the database.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | The Wallet Identifier. | UUID  | Required  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| message  | 'User was successfully deleted' | String  |

### User Username Search

```typescript
pillarSdk.user.usernameSearch(inputParams);
```

Retrieve the userId of an existing wallet user or return not-found.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| username  | Wallet Username | String  | Required  |

**Expected Output**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| userId  | The User Identifier | UUID  | Required  |

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
