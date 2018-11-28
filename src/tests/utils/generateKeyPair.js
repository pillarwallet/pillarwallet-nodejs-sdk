const pk = require('../../utils/private-key-derivatives');
const EC = require('elliptic').ec;
const ecSecp256k1 = new EC('secp256k1');
const keys = ecSecp256k1.genKeyPair();

let privateKey = keys.getPrivate().toString('hex');

if(privateKey.length !== 64 ) {
  privateKey = '97ddae0f3a25b92268175400149d65d6887b9cefaf28ea2c078e05cdc15a3c0a';
}
const publicKey = pk.PrivateKeyDerivatives.getPublicKey(privateKey).toString();
const ethAddress = pk.PrivateKeyDerivatives.getEthAddress(privateKey).toString();

module.exports = {
  privateKey,
  publicKey,
  ethAddress,
};
