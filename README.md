# Pillar Wallet SDK

The Pillar Wallet SDK aims to make it easy for developers to get started using
[Pillar Wallet backend services](https://github.com/pillarwallet/platform-core).

## Contents

- [Getting started](#getting-started-sdk)
- [Config](#config)
- [Response and Error](#response-and-error)
- [Methods](#methods)
    - [Wallet Update](#wallet-update)
    - [Wallet Register Auth Server](#wallet-register-auth-server)
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
    - [Connection Disconnect](#connection-disconnect)
    - [Connection Count](#connection-count)
    - [Connection Map Identity Keys](#connection-map-identity-keys)
    - [Notification List](#notification-list)
    - [Investments ICO List](#investments-ico-list)
    - [Investments Deposit Request](#investments-deposit-request)
    - [User Create One Time Password](#user-create-one-time-password)
    - [User Delete](#user-delete)
    - [User Delete Profile Image](#user-delete-profile-image)
    - [User Info](#user-info)
    - [User Image by User Id](#user-image-by-user-id)
    - [User Info By Id](#user-info-by-id)
    - [User Profile Image](#user-profile-image)
    - [User Search](#user-search)
    - [User Update](#user-update)
    - [User Upload Profile Image](#user-upload-profile-image)
    - [User Update Notification Preferences](#user-update-notification-preferences)
    - [User Username Search](#user-username-search)
    - [User Validate](#user-validate)
    - [User Validate Email](#user-validate-email)
    - [User Validate Phone](#user-validate-phone)
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

Instantiate the Pillar SDK, then set the apiUrl (optional) and notificationsUrl (optional).

```
const pillarSdk = new PillarSdk({
  apiUrl: 'https://localhost:8080',
  notificationsUrl: 'https://localhost:8081',
  investmentsUrl: 'https://localhost:8082',
});
```

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| apiUrl  | URL where API is hosted. String with URL format. e.g. "http://<url>".| String  | Optional  |
| notificationsUrl  | URL where the Notifications Service is hosted. String with URL format. e.g. "http://<url>".| String  | Optional  |
| investmentsUrl  | URL where the Investments Service is hosted. String with URL format. e.g. "http://<url>".| String  | Optional  |

#### 2 - Register the Wallet

To use backend services, register the wallet:

```typescript
pillarSdk.wallet.registerAuthServer(inputParams)
```

Register the wallet in the backend, create the UserProfile table, and register the wallet in BCX(Blockchain Explorer).
Wallet can not be created without username.


```typescript
const inputParams = {
  fcmToken: 'cMctpybZfwyFTyRJBo4omxpgoF2JWf-tlJc8fB0Swrq0z7',
  privateKey: '3eA19bddb978Db62344Ffba5d37Ba41C83C579173eA19bddb978Db62344Ffba5d37Ba41C83C57917',
  username: 'bob123',
};
```


**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| fcmToken  | The Firebase Cloud Message Token of One Wallet. | String  | Required  |
| privateKey  | Hexadecimal string and 64 characters in length. | String  | Required  |
| username  | The Username of One Wallet.  | String  | Required  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| accessToken | eg. 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiVlx1MDAxNcKbwoNUwoonbFPCu8KhwrYiLCJpYXQiOjE0NDQyNjI1NDMsImV4cCI6MTQ0NDI2MjU2M30.MldruS1PvZaRZIJR4legQaauQ3_DYKxxP2rFnD37Ip4' | String |
| accessTokenExpiresAt | 'YYYY-mm-ddTHH:MM:ssZ' | String |
| refreshToken | eg. 'fdb8fdbecf1d03ce5e6125c067733c0d51de209c' | String |,
| refreshTokenExpiresAt | 'YYYY-mm-ddTHH:MM:ssZ' | String |
| fcmToken  | eg. 'cMctpybZfwk:APA9arnIbla0UDSDGs_w7buoP2apxFIzI6YUdSFPLe2ANR-OrFiaAvJ' | String  |
| walletId  | e.g. '6e081b82-dbed-4485-bdbc-a808ad911758' | UUID |
| userId  | e.g. '7e081b82-cabd-3321-aadd-b443212378bd' | UUID |

## Response And Error

To get the response and error for these methods, use:

 ```javascript
 try {
  const response = await pillarSdk.wallet.registerAuthServer({
    fcmToken: 'cMctpybZfwyFTyRJBo4omxpgoF2JWf-tlJc8fB0Swrq0z7',
    privateKey: '3eA19bddb978Db62344Ffba5d37Ba41C83C579173eA19bddb978Db62344Ffba5d37Ba41C83C57917',
    username: 'bob123'
  });
  // Use successful response
 } catch (e) {
  // Handle unsuccessful response
 }
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

### Wallet Register Auth Server

```typescript
pillarSdk.wallet.registerAuthServer(inputParams)
```

Register the wallet in the backend, authentication server(OAuth),
create the UserProfile table, and register the wallet in BCX(Blockchain Explorer).
Wallet can not be created without username.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| privateKey  | Hexadecimal string and 64 characters in length. | String  | Required  |
| fcmToken  | The Firebase Cloud Message Token of One Wallet. | String  | Required  |
| username  | The Username of One Wallet.  | String  | Required  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| accessToken | eg. 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiVlx1MDAxNcKbwoNUwoonbFPCu8KhwrYiLCJpYXQiOjE0NDQyNjI1NDMsImV4cCI6MTQ0NDI2MjU2M30.MldruS1PvZaRZIJR4legQaauQ3_DYKxxP2rFnD37Ip4' | String |
| accessTokenExpiresAt | 'YYYY-mm-ddTHH:MM:ssZ' | String |
| refreshToken | eg. 'fdb8fdbecf1d03ce5e6125c067733c0d51de209c' | String |,
| refreshTokenExpiresAt | 'YYYY-mm-ddTHH:MM:ssZ' | String |
| fcmToken  | eg. 'cMctpybZfwk:APA9arnIbla0UDSDGs_w7buoP2apxFIzI6YUdSFPLe2ANR-OrFiaAvJ' | String  |
| walletId  | e.g. '6e081b82-dbed-4485-bdbc-a808ad911758' | UUID |
| userId  | e.g. '7e081b82-cabd-3321-aadd-b443212378bd' | UUID |

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
| socialMedia  | The token's social media. | Array  |
| telegram  | The Token Telegram | String  |
| twitter  | The Token Twitter | String  |
| website  | The Token Website | String  |
| whitepaper  | The Token Whitepaper | String  |
| isDefault  | isDefault Flag for Token | Boolean  |
| icos  | Ico details of one Token. | Array  |

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
| socialMedia  | The token's social media. | Array  |
| telegram  | The Token Telegram | String  |
| twitter  | The Token Twitter | String  |
| website  | The Token Website | String  |
| whitepaper  | The Token Whitepaper | String  |
| isDefault  | isDefault Flag for Token | Boolean  |
| icos  | Ico details of one Token. | Array  |

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
| socialMedia  | The token's social media. | Array  |
| telegram  | The Token Telegram | String  |
| twitter  | The Token Twitter | String  |
| website  | The Token Website | String  |
| whitepaper  | The Token Whitepaper | String  |
| isDefault  | isDefault Flag for Token | Boolean  |
| icos  | Ico details of one Token. | Array  |

### Connection Invite

```typescript
pillarSdk.connection.invite(inputParams)
```

Creates a connection invitation for a user to create a relationship with another contact.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| targetUserId  | The Contact User Identifier. | UUID  | Required  |
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
| targetUserId  | The Contact User Identifier. | UUID  | Required  |
| walletId  | The Wallet Identifier. | UUID  | Required  |
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
| targetUserId  | The Contact User Identifier. | UUID  | Required  |
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
| targetUserId  | The Contact User Identifier. | UUID  | Required  |
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

Blocks/unblocks a connection request from another user.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| accessKey  | The Access Key. | String  | Required  |
| walletId  | The Wallet Identifier. | UUID  | Required  |
| targetUserId  | The Contact User Identifier. | UUID  | Required  |
| block  | True/false to block/unblock the connection. | Boolean  | Required  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| message  | 'Connection blocked/accepted' | String  |

### Connection Mute

```typescript
pillarSdk.connection.mute(inputParams)
```

Mutes/unmutes future communication from another contact.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| accessKey  | The Access Key. | String  | Required  |
| walletId  | The Wallet Identifier. | UUID  | Required  |
| targetUserId  | The Contact User Identifier. | UUID  | Required  |
| mute  | True/false to mute/unmute the connection. | Boolean  | Required  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| message  | 'Connection status is updated to muted/accepted' | String  |

### Connection Disconnect

```typescript
pillarSdk.connection.disconnect(inputParams)
```

Disconnects a connection between two users.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| targetUserId  | The Contact User Identifier. | UUID  | Required  |
| sourceUserAccessKey  | Source User Access Key. | String  | Required  |
| targetUserAccessKey  | Target User Access Key. | String  | Required  |
| walletId  | The Wallet Identifier. | UUID  | Required  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| message  | 'Connection is successfully disconnected' | String  |

### Connection Count

```typescript
pillarSdk.connection.count(inputParams)
```

Returns the number of connections a user has

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | The Wallet Identifier. | UUID  | Required  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| userId  | The User Identifier | String  |
| currentConnectionsCount  | The number of connections with sourceIdentityKey | Number  |
| oldConnectionsCount  | The number of connections without sourceIdentityKey | Number  |


### Connection Map Identity Keys

```typescript
pillarSdk.connection.mapIdentityKeys(inputParams)
```

Returns an array of user's connection mapped by identity keys

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | The Wallet Identifier. | UUID  | Required  |
| identityKeys  | The Identity Keys of a user. | Array  | Required  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | A list of connections | Array  |

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

### Investments ICO List

```typescript
pillarSdk.investments.icoList(inputParams);
```

Fetch a list of ICOs for a given user.

**Input Parameters**

| Name | Description | Type | Required |
| ---- | ----------- | ---- | -------- |
| userId | The User's ID | String | Required |

**Expected Output**

| Name | Description | Type |
| ---- | ----------- | ---- |
| result | 'success' | String |
| data | List of ICOs | [[Asset](#asset)] |

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

### User Create One Time Password

```typescript
pillarSdk.user.createOneTimePassword(inputParams);
```

Create a one-time password for email or phone,
store it on the user record,
then send an email or SMS to the wallet user.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| email  | The user's email address. | String  | one of email/phone field is required |
| phone  | The phone associated of one user | String  | one of email/phone field is required|
| walletId  | The Wallet Identifier. | UUID  | Required  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| message  | 'One-time password sent.' | String  |
| walletId  | The Wallet Identifier. | UUID  | Required  |

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
| phone  | The user's phone number | String |
| tagline  | The user's profile tagline | String |
| taglineStatus  | Whether the user has completed a tagline for their profile | Boolean |
| userSearchable  | Whether the user's profile is searchable in the address book | Boolean |
| profileImage  | The profile image of the user | String(Url) |
| icoService  | Information related to the user's account with a service provider for ICOs. | Object |
| status  | The user status in the system. | String |

### User Update Notification Preferences

```typescript
pillarSdk.user.updateNotificationPreferences(inputParams);
```

Update notification preferences for given user.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | The Wallet Identifier. | UUID  | Required  |
| newOffer  | Activate/Deactivate notification when user receives offers | Boolean  | Optional  |
| newReceipt  | Activate/Deactivate notification when user receives receipt | Boolean  | Optional  |
| paymentConfirmation  | Activate/Deactivate notification when payment is confirmed | Boolean  | Optional  |
| paymentStatusUpdate  | Activate/Deactivate notification whenever the status of payment changes | Boolean  | Optional  |
| profileUpdate  | Activate/Deactivate notification when user profile where updated | Boolean  | Optional  |
| fundsDeposit  | Activate/Deactivate notification when funds were deposited in user account | Boolean  | Optional  |
| transactionEvent  | Activate/Deactivate notification for user transactions | Boolean  | Optional  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| message  | 'Notification preferences were successfully created' | String  |

JSON object with respective values:

| Element  | Description | Type |
| ------------- | ------------- | ------------- |
| userId  | The User Identifier | UUID  |
| newOffer  | Activate/Deactivate notification when user receives offers | Boolean  | Optional  |
| newReceipt  | Activate/Deactivate notification when user receives receipt | Boolean  | Optional  |
| paymentConfirmation  | Activate/Deactivate notification when payment is confirmed | Boolean  | Optional  |
| paymentStatusUpdate  | Activate/Deactivate notification whenever the status of payment changes | Boolean  | Optional  |
| profileUpdate  | Activate/Deactivate notification when user profile where updated | Boolean  | Optional  |
| fundsDeposit  | Activate/Deactivate notification when funds were deposited in user account | Boolean  | Optional  |
| transactionEvent  | Activate/Deactivate notification for user transactions | Boolean  | Optional  |

### User Image by User Id

```typescript
 pillarSdk.user.imageByUserId(inputParams);
```

Get user's profile image using user's ID

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | The Wallet Identifier. | UUID  | Required  |
| userId  | The User Identifier | UUID  | Required  |

**Expected Output**

Redirects to an hosted image.

### User Upload Profile Image

```typescript
 pillarSdk.user.uploadProfileImage(inputParams);
```

Saves or updates user's profile image.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | The Wallet Identifier. | UUID  | Required  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| message  | 'Profile image was successfully uploaded' | String  |
| profileImage  | Image Url | String  |

### User Profile Image

```typescript
 pillarSdk.user.profileImage(inputParams);
```

Get user's profile image.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| imageName  | The User Image Identifier. | String  | Required  |

**Expected Output**

Redirects to an hosted image.

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

### User Info by Id

```typescript
 pillarSdk.user.infoById(inputParams);
```

Provides the user data by the target user id and users access keys

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | The Wallet Identifier. | UUID  | Required  |
| userAccessKey  | The current user access key | string  | Required  |
| targetUserAccessKey  | The current user access key | string  | Required  |

**Expected Output**

| Name  | Output | Type |
| ------------- | ------------- | ------------- |
| ethAddress  | The ethereum Address of target user | String  |
| id  | The target user Identifier | UUID  |
| username  | The target user Username | String  |
| firstName  | The target user's First Name | String  |
| lastName  | The target user's Last Name  | String  |
| country  | The target user's country or residence | String |
| state  | The target user's state of residence | String |
| city  | The target user's city of residence | String |
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

```typescript
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

### User Delete Profile Image

```typescript
 pillarSdk.user.deleteProfileImage(inputParams);
```

Removes user profile Image from the database.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | The Wallet Identifier. | UUID  | Required  |

**Expected Output**

HTTP status 204: No Content

### User Username Search

```typescript
pillarSdk.user.usernameSearch(inputParams);
```

Retrieve the userId of an existing wallet user or return not-found.
Returns an error message if the username is Inappropriate.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| username  | Wallet Username | String  | Required  |

**Expected Output**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| userId  | The User Identifier | UUID  | Required  |

**Expected Output for Inappropriate username**

| Name  | Value |
| ------------- | ------------- |
| error  | Bad Request |
| message  | Inappropriate username |
| statusCode  | 400 |

### User Validate

```typescript
pillarSdk.user.validate(inputParams);
```

Retrieve the id of an validated wallet user.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| username  | Wallet Username | String  | One of username/blockchainAddress required |
| blockchainAddress  | User's blockchainAddress | String  | One of username/blockchainAddress required |

**Expected Output**

| Name  | Description | Type |
| ------------- | ------------- | ------------- |
| id  | The wallet Identifier | UUID  |
| username  | The Username | String  |
| walletId  | The wallet Identifier | UUID  |

### User Validate Email

```typescript
pillarSdk.user.validateEmail(inputParams);
```

Validate a one-time password sent via email.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | The wallet Identifier | UUID | Required |
| email  | User's email | String  | Required |
| oneTimePassword  | User's one time password | String  | Required |

**Expected Output**

| Name  | Description | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| message  | 'Email validated.' | String  |
| userId  | The user Identifier | UUID |

### User Validate Phone

```typescript
pillarSdk.user.validatePhone(inputParams);
```

Validate a one-time password sent via SMS.

**Input Parameters**

| Name  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| walletId  | The wallet Identifier | UUID | Required |
| phone  | User's phone | String  | Required |
| oneTimePassword  | User's one time password | String  | Required |

**Expected Output**

| Name  | Description | Type |
| ------------- | ------------- | ------------- |
| result  | 'success' | String  |
| message  | 'Phone validated.' | String  |
| userId  | The user Identifier | UUID |

## Types

### Asset

| Name | Description | Type |
| ---- | ----------- | ---- |
| id | Asset ID | UUID |
| name | Asset name | String |
| symbol | Asset symbol | String |
| address | Ethereum address of the Asset | String |
| decimals | The number of decimals of the Asset | Number |
| description | Asset description | String |
| wallpaperUrl | Asset wallpaper URL | String (URL) |
| iconUrl | Icon URL | String (URL) |
| email | Contact email address for Asset | String (Email) |
| socialMedia | A list of social media services | [[SocialMedia](#socialmedia)] |
| website | Website address of Asset | String (URL) |
| whitepaper | Asset whitepaper | String (URL) |
| isDefault | Default token ??? | Boolean |
| icos | List of ICO phases | [[ICO](#ico)] |

### SocialMedia

| Name | Description | Type |
| ---- | ----------- | ---- |
| service | The social network service | String |
| username | The social network account | String |

### ICO

| Name | Description | Type |
| ---- | ----------- | ---- |
| icoStatus | 'PENING', 'ACTIVE', 'CLOSED' | String |
| icoPhase | The phase of the ICO | String |
| icoAddress | The smart contract address of the ICO | String |
| minimumContribution | The minimum contribution in the base currency needed to invest in the ICO | Number |
| maximumContribution | The maximum contribution in the base currency allowed to invest in the ICO | Number |
| baseCurrency | The currency of the ICO | String |
| unitPrice | The price per unit in the base currency | Number |
| totalSupply | The total number of units available | Number |
| totalLocked | The total number of units reserved and purchased | Number |
| supportedCurrencies | A comma separated list of accepted currencies | String |
| icoStartingBlockNumber | The ICO's starting block number | Number |
| plannedOpeningDate | The planned opening date of the ICO | Date |
| icoEndingBlockNumber | The ICO's ending block number | Number |
| plannedClosingDate | The planned closing date of the ICO | Date |
| nationalityRestriction | Indicates if there's a nationality restriction | Boolean |
| nivauraProjectId | The ICO ID in the ICO Service | Number |
| links | ICO related links | [[ICOLink](#icolink)] |

### ICOLink

| Name | Description | Type |
| ---- | ----------- | ---- |
| name | The name of the resource, i.e. Whitepaper | String |
| url | The link to the resource | String (URL) |

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
