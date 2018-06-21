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
    const publicKeyBuffer = ethUtils.privateToPublic(privateKeyBuffer);

    // Typeguarding.
    if (publicKeyBuffer instanceof Buffer) {
      return publicKeyBuffer.toString('hex');
    }

    // If the 'publicKeyBuffer' was not a Buffer, throw a
    // new TypeError
    throw new TypeError('"publicKeyBuffer" was expected to be a Buffer.');
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
    const addressBuffer = ethUtils.privateToAddress(privateKeyBuffer);

    // Typeguarding.
    if (addressBuffer instanceof Buffer) {
      return `0x${addressBuffer.toString('hex')}`;
    }

    // If the 'addressBuffer' was not a Buffer, throw a
    // new TypeError
    throw new TypeError('"publicKeyBuffer" was expected to be a Buffer.');
  }
}
