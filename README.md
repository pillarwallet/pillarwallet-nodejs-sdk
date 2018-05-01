# Pillar Wallet SDK 

The Pillar Wallet aims to make it easy for developers to get started using Pillar.

## Getting started quickly

Run:

`npm i @pillarwallet/pillarwallet-nodejs-sdk`

In your project:

`const { PillarSdk } = require('@pillarwallet/pillarwallet-nodejs-sdk');`

Instantiate an instance of the Pillar SDK:

`const pSdk = new PillarSdk();`

You're now ready to use the Pillar SDK.

**All methods return promises.**

### Methods

Asset Defaults
```
pSdk.asset.defaults({
  walletId: 123
}, myPrivateKeyVariable)
.then((result) => {
  // Successful response!
  console.log(result);
})
.catch((error) => {
  // Unsuccessful response.
  console.error(error);
});
```

Asset Search
```
pSdk.asset.search({
  walletId: 123,
  query: 'search query here'
}, myPrivateKeyVariable)
.then((result) => {
  // Successful response!
  console.log(result);
})
.catch((error) => {
  // Unsuccessful response.
  console.error(error);
});
```

Connection Invite
```
pSdk.connection.invite({

}, myPrivateKeyVariable)
.then((result) => {
  // Successful response!
  console.log(result);
})
.catch((error) => {
  // Unsuccessful response.
  console.error(error);
});
```

Connection Accept

Connection Reject

Connection Cancel

Connection Block

Connection Mute

Notification List

User Update

User Info

User Search

User Delete

Wallet Register

Wallet Update