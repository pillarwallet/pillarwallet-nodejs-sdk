const { PillarSdk } = require('../dist');

const p = new PillarSdk('publicKey', 'privateKey', '');

// Initialise
p.dumpConfig();

// Create wallet
p.wallet.register();

console.log('After wallet register:');

// Dump again
p.dumpConfig();

console.log('Wallet ID is: ' + p.wallet.walletId);

// Try to register another wallet
p.wallet.register();