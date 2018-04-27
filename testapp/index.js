const { PillarSdk } = require('../dist');

const p = new PillarSdk();
const generateKeyPair = require('../tests/glue/generateKeyPair');
// Initialise
p.dumpConfig();
const hdkey = generateKeyPair();
const myParams = {
    eth_address: '0x3eA19bddb978Db62344Ffba5d37Ba41C83C57917',
    fcmToken: 'cMctpybZfwk:APA91bFP_IarnIblW0UDSDGs_w7buoP2apxFIzI6YUOuib_FdSFPLe2ANR-OrFiaAvJ8v1zHyFTyRJBo4gf3EHpJSpfhToexCshEArkq6ho4gR3AqomxpgoF2JWf-tlJc8fB0Swrq0z7',
    public_key: hdkey.publicKey.toString('hex'),
};

// Create wallet
p.wallet.register(myParams,hdkey.privateKey)
    .then((result) => {
        console.log('THEN! p.wallet.register()');
        console.log(result);
    })
    .catch((error) => {
        console.log('ERROR! p.wallet.register()');
        console.error(error);
    });

p.asset.defaults(1,hdkey.privateKey)
    .then((result) => {
        console.log('THEN! p.wallet.register()');
        console.log(result);
    })
    .catch((error) => {
        console.log('ERROR! p.wallet.register()');
        console.error(error);
    });

console.log('After wallet register:');

// Dump again
p.dumpConfig();

console.log('Wallet ID is: ' + p.wallet.walletId);

// Try to register another wallet
// p.wallet.register();