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
const pk = require('../../utils/private-key-derivatives');
const EC = require('elliptic').ec;
const ecSecp256k1 = new EC('secp256k1');

const generatePrivateKey = () => {
  let privateKey;
  do {
    privateKey = ecSecp256k1
      .genKeyPair()
      .getPrivate()
      .toString('hex');
  } while (privateKey.length !== 64);

  return privateKey;
}

let privateKey = generatePrivateKey();
const publicKey = pk.PrivateKeyDerivatives.getPublicKey(privateKey).toString();
const ethAddress = pk.PrivateKeyDerivatives.getEthAddress(privateKey).toString();

module.exports = {
  privateKey,
  publicKey,
  ethAddress,
  generatePrivateKey,
};
