const { PillarSdk } = require('../dist');
const generateKeyPair = require('../tests/glue/generateKeyPair');

const PSDK = new PillarSdk();
const hdkey = generateKeyPair();

PSDK.connection.invite({
  targetUserId: 1,
  accessKey: 'hello',
  walletId: 1
}, hdkey.privateKey)
.then((result) => {
  console.log('PSDK.connection.invite RESULT!');
  console.log(result);
}).catch((error) => {
  console.log('PSDK.connection.invite ERROR!');
  console.error(error.message);
});

PSDK.connection.accept({
  targetUserId: 1,
  walletId: 1,
  sourceUserAccessKey: 'hello',
  targetUserAccessKey: 'hello',
}, hdkey.privateKey)
.then((result) => {
  console.log('PSDK.connection.accept RESULT!');
  console.log(result);
}).catch((error) => {
  console.log('PSDK.connection.accept ERROR!');
  console.error(error.message);
});

PSDK.connection.reject({
  targetUserId: 1,
  accessKey: 'hello',
  walletId: 1
}, hdkey.privateKey)
.then((result) => {
  console.log('PSDK.connection.reject RESULT!');
  console.log(result);
}).catch((error) => {
  console.log('PSDK.connection.reject ERROR!');
  console.error(error.message);
});

PSDK.connection.cancel({
  targetUserId: 1,
  accessKey: 'hello',
  walletId: 1
}, hdkey.privateKey)
.then((result) => {
  console.log('PSDK.connection.cancel RESULT!');
  console.log(result);
}).catch((error) => {
  console.log('PSDK.connection.cancel ERROR!');
  console.error(error.message);
});

PSDK.connection.cancel({
  targetUserId: 1,
  accessKey: 'hello',
  walletId: 1
}, hdkey.privateKey)
.then((result) => {
  console.log('PSDK.connection.cancel RESULT!');
  console.log(result);
}).catch((error) => {
  console.log('PSDK.connection.cancel ERROR!');
  console.error(error.message);
});

PSDK.connection.block({
  accessKey: 'hello',
  walletId: 1
}, hdkey.privateKey)
.then((result) => {
  console.log('PSDK.connection.block RESULT!');
  console.log(result);
}).catch((error) => {
  console.log('PSDK.connection.block ERROR!');
  console.error(error.message);
});

PSDK.connection.mute({
  accessKey: 'hello',
  walletId: 1
}, hdkey.privateKey)
.then((result) => {
  console.log('PSDK.connection.mute RESULT!');
  console.log(result);
}).catch((error) => {
  console.log('PSDK.connection.mute ERROR!');
  console.error(error.message);
});