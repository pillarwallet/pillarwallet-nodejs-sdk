const pk = require('../../utils/private-key-derivatives');
const EC = require('elliptic').ec;
const ecSecp256k1 = new EC('secp256k1');
const keys = ecSecp256k1.genKeyPair();

const privateKey = keys.getPrivate().toString('hex').substring(0, 64);
const publicKey = pk.PrivateKeyDerivatives.getPublicKey(privateKey).toString();
const ethAddress = pk.PrivateKeyDerivatives.getEthAddress(privateKey).toString();

module.exports = {
  privateKey,
  publicKey,
  ethAddress,
};
