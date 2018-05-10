const { PrivateKeyDerivation } = require("../dist/utils/private-key-derivation");
const { PillarSdk } = require('../dist');
const generateKeyPair = require('./glue/generateKeyPair');
// Initialise
const hdkey = generateKeyPair();

const p = new PillarSdk({
  privateKey: hdkey.privateKey
});

// const myParams = {
//     ethAddress: '0x3eA19bddb978Db62344Ffba5d37Ba41C83C57917',
//     fcmToken: 'cMctpybZfwk:APA91bFP_IarnIblW0UDSDGs_w7buoP2apxFIzI6YUOuib_FdSFPLe2ANR-OrFiaAvJ8v1zHyFTyRJBo4gf3EHpJSpfhToexCshEArkq6ho4gR3AqomxpgoF2JWf-tlJc8fB0Swrq0z7',
//     publicKey: hdkey.publicKey.toString('hex'),
// };

//PrivateKeyDerivation.getPublicKey( hdkey.privateKey.toString('hex') );

PrivateKeyDerivation.getEthAddress( hdkey.privateKey.toString('hex') );
