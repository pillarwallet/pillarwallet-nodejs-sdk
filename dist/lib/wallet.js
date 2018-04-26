"use strict";
exports.__esModule = true;
var requester_1 = require("../utils/requester");
var auth = require('@pillarwallet/plr-auth-sdk');
var Wallet = (function () {
    function Wallet(incomingWalletId) {
        this.walletId = incomingWalletId;
    }
    Wallet.prototype.register = function (walletCreationParams, privateKey) {
        console.log(walletCreationParams);
        if (walletCreationParams === null || walletCreationParams === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createWallet.');
        }
        var xAPISignature = auth.sign(walletCreationParams, privateKey, 'secp256k1');
        if (xAPISignature === null || xAPISignature === undefined) {
            throw new Error('Required parameter xAPISignature was null or undefined when calling createWallet.');
        }
        return requester_1.Requester.invoke(xAPISignature, walletCreationParams);
    };
    Wallet.prototype.dumpConfig = function () {
        console.log(this);
    };
    return Wallet;
}());
exports.Wallet = Wallet;
//# sourceMappingURL=wallet.js.map