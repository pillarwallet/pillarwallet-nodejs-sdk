const pk = require('../../utils/private-key-derivatives');
module.exports = {
  privateKey: '3a1076bf45ab87712ad64ccb3b10217737f7faacbf1232e88fdd9a537d8fe266',
  publicKey: pk.PrivateKeyDerivatives.getPublicKey('3a1076bf45ab87712ad64ccb3b10217737f7faacbf1232e88fdd9a537d8fe266').toString(),
  ethAddress: pk.PrivateKeyDerivatives.getEthAddress('3a1076bf45ab87712ad64ccb3b10217737f7faacbf1232e88fdd9a537d8fe266').toString(),
};
