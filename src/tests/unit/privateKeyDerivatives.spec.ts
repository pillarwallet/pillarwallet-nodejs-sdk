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
import * as ethUtils from 'ethereumjs-util';
import { PrivateKeyDerivatives } from '../../utils/private-key-derivatives';

/**
 * This private key has been provided by the Wallet App team for testing.
 * The resulting ethereum address for the private key below is:
 * 0x0DE189164d58dd58BE7d18C389B5623EBb1db9d3
 *
 * It's important to note that the above expected ethereum address has a
 * checksum built into it by way of capitalisation. Ethereum addresses are
 * NOT case-sensitive, though. Checksumming by way of capitalisation was
 * just a technical afterthought.
 *
 * Read: https://ethereum.stackexchange.com/a/19048
 */
const privateKey =
  'bcfeaffa34e87c0ebc201d63896665f21588ad01cc1822874d12d96c5b8c9d35';
const expectedEthereumAddress = '0x0DE189164d58dd58BE7d18C389B5623EBb1db9d3';

describe('The Private Key Derivatives Class: getPublicKey method', () => {
  it('should successfully derive the public key from a private key', () => {
    const publicKey = PrivateKeyDerivatives.getPublicKey(privateKey).substring(
      2,
    );
    const publicKeyBuffer = Buffer.from(publicKey, 'hex');

    expect(ethUtils.isValidPublic(publicKeyBuffer)).toBe(true);
  });

  it('should successfully derive the ethereum address from a public key', () => {
    let ethereumAddressString = '';
    const publicKey = PrivateKeyDerivatives.getPublicKey(privateKey).substring(
      2,
    );
    const publicKeyBuffer = Buffer.from(publicKey, 'hex');
    const ethereumAddressBuffer = ethUtils.pubToAddress(publicKeyBuffer, true);

    // Typeguard
    if (ethereumAddressBuffer instanceof Buffer) {
      // Otherwise the following line will warn
      ethereumAddressString = ethereumAddressBuffer.toString('hex');
    }

    expect(ethUtils.isValidAddress(`0x${ethereumAddressString}`)).toBe(true);
    expect(ethUtils.isValidPublic(publicKeyBuffer)).toBe(true);
  });

  it('should successfully derive the GIVEN ethereum address from the GIVEN public key', () => {
    let ethereumAddressString = '';
    const publicKey = PrivateKeyDerivatives.getPublicKey(privateKey).substring(
      2,
    );
    const publicKeyBuffer = Buffer.from(publicKey, 'hex');
    const ethereumAddressBuffer = ethUtils.pubToAddress(publicKeyBuffer, true);

    // Typeguarding...
    if (ethereumAddressBuffer instanceof Buffer) {
      // Otherwise the following line will warn.
      ethereumAddressString = ethereumAddressBuffer.toString('hex');
    }

    expect(ethUtils.isValidAddress(`0x${ethereumAddressString}`)).toBe(true);
    // Lowercased the expected ethereum address. See notes at the top of the file.
    expect(`0x${ethereumAddressString}`).toBe(
      expectedEthereumAddress.toLowerCase(),
    );
    expect(ethUtils.isValidPublic(publicKeyBuffer)).toBe(true);
  });

  it('should NOT successfully derive the public key from an invalid private key', () => {
    const privateKey =
      'abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcaaa';
    const privateKeyBuffer = Buffer.from(privateKey, 'hex');

    expect(ethUtils.isValidPrivate(privateKeyBuffer)).toBe(false);
  });
});
