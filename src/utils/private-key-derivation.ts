const EC = require("elliptic").ec;
const keccak256 = require('js-sha3').keccak256;
const ellipticCurve =  new EC("secp256k1");

export class PrivateKeyDerivation {

  /**
   * Get the Public Key from PrivateKey
   * @param privateKey
   * @returns {any}
   */
  static getPublicKey(privateKey: any) {
    const key = ellipticCurve.keyFromPrivate(privateKey, 'hex');
    const publicKeyPoint = key.getPublic();
    const publicKey = publicKeyPoint.encode('hex');
    return publicKey;
  }

  /**
   * Get Eth Address from Public key
   * @param privateKey
   * @returns {string}
   */
  static getEthAddress(privateKey: any) {
    let publicKey = this.getPublicKey(privateKey);
    const address = keccak256(publicKey); // keccak256 hash of  publicKey
    const bufferFromAddress = Buffer.from(address, 'hex');
    const ethAddress = "0x"+bufferFromAddress.slice(-20).toString('hex');
    return ethAddress;
  }
}
