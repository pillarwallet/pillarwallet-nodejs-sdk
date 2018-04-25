const { PillarSdk } = require('../dist');

const p = new PillarSdk({
  publicKey: 'llololololololl',
  sdkUri: 'http://localhost:8080',
});

// Initialise
p.dumpConfig();

// Create wallet
p.wallet.register()
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