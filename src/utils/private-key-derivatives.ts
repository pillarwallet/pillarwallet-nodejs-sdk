/*
Copyright (C) 2021 Stiftung Pillar Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
const EC = require('elliptic').ec;
const ellipticCurve = new EC('secp256k1');
import * as ethUtils from 'ethereumjs-util';

export class PrivateKeyDerivatives {
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
