"use strict";
exports.__esModule = true;
var wallet_1 = require("./lib/wallet");
var PillarSdk = (function () {
    function PillarSdk(incomingPublicKey, incomingPrivateKey) {
        this.wallet = new wallet_1.Wallet();
        this.publicKey = incomingPublicKey;
        this.privateKey = incomingPrivateKey;
    }
    PillarSdk.prototype.dumpConfig = function () {
        console.log(this);
    };
    return PillarSdk;
}());
exports.PillarSdk = PillarSdk;
//# sourceMappingURL=index.js.map