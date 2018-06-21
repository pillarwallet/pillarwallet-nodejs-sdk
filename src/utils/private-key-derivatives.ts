import * as ethUtils from 'ethereumjs-util';

export class PrivateKeyDerivatives {
  /**
   * Get the Public Key from PrivateKey
   * @param privateKey
   * @returns {any}
   */
  static getPublicKey(privateKey: any) {
    // First, convert the incoming private key to a buffer
    // as required by the ethereumjs-utils library.
    const privateKeyBuffer = Buffer.from(privateKey, 'hex');

    // Next, run the privateToPublic method to derive
    // the public key from the private key.
    return ethUtils.privateToPublic(privateKeyBuffer);
  }

  /**
   * Get Eth Address from Public key
   * @param privateKey
   * @returns {string}
   */
  static getEthAddress(privateKey: any) {
    // First, convert the incoming private key to a buffer
    // as required by the ethereumjs-utils library.
    const privateKeyBuffer = Buffer.from(privateKey, 'hex');

    // Next, run the privateToPublic method to derive
    // the public key from the private key.
    return ethUtils.privateToAddress(privateKeyBuffer);
  }
}
