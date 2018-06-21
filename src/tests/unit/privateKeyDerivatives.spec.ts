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
const privateKey = 'bcfeaffa34e87c0ebc201d63896665f21588ad01cc1822874d12d96c5b8c9d35';
const expectedEthereumAddress = '0x0DE189164d58dd58BE7d18C389B5623EBb1db9d3';

describe('The Private Key Derivatives Class: getPublicKey method', () => {
  it('should successfully derive the public key from a private key', () => {
    const publicKey = PrivateKeyDerivatives.getPublicKey(privateKey);

    expect(ethUtils.isValidPublic(publicKey)).toBe(true);
  });

  it('should successfully derive the ethereum address from a public key', () => {
    let ethereumAddressString = '';
    const publicKey = PrivateKeyDerivatives.getPublicKey(privateKey);
    const ethereumAddressBuffer = ethUtils.pubToAddress(publicKey, true);

    // Typeguard
    if (ethereumAddressBuffer instanceof Buffer) {
      // Otherwise the following line will warn
      ethereumAddressString = ethereumAddressBuffer.toString('hex');
    }

    expect(ethUtils.isValidAddress(`0x${ethereumAddressString}`)).toBe(true);
    expect(ethUtils.isValidPublic(publicKey)).toBe(true);
  });

  it('should successfully derive the GIVEN ethereum address from the GIVEN public key', () => {
    let ethereumAddressString = '';
    const publicKey = PrivateKeyDerivatives.getPublicKey(privateKey);
    const ethereumAddressBuffer = ethUtils.pubToAddress(publicKey, true);

    // Typeguarding...
    if (ethereumAddressBuffer instanceof Buffer) {
      // Otherwise the following line will warn.
      ethereumAddressString = ethereumAddressBuffer.toString('hex');
    }

    expect(ethUtils.isValidAddress(`0x${ethereumAddressString}`)).toBe(true);
    // Lowercased the expected ethereum address. See notes at the top of the file.
    expect(`0x${ethereumAddressString}`).toBe(expectedEthereumAddress.toLowerCase());
    expect(ethUtils.isValidPublic(publicKey)).toBe(true);
  });

  it('should NOT successfully derive the public key from an invalid private key', () => {
    const privateKey = 'abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcaaa';
    const privateKeyBuffer = Buffer.from(privateKey, 'hex');

    expect(ethUtils.isValidPrivate(privateKeyBuffer)).toBe(false);
  });
});
