"use strict";
exports.__esModule = true;
var requester_1 = require("../utils/requester");
var Wallet = (function () {
    function Wallet(incomingWalletId) {
        this.walletId = incomingWalletId;
    }
    Wallet.prototype.register = function (walletCreationParams, privateKey) {
        if (walletCreationParams === null || walletCreationParams === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createWallet.');
        }
        var xAPISignature = requester_1.Requester.sign(walletCreationParams, privateKey);
        if (xAPISignature === null || xAPISignature === undefined) {
            throw new Error('Required parameter xAPISignature was null or undefined when calling createWallet.');
        }
        return requester_1.Requester.register(xAPISignature, walletCreationParams);
    };
    Wallet.prototype.dumpConfig = function () {
        console.log(this);
    };
    Wallet.prototype.testFunction = function () {
        return 'hello';
    };
    return Wallet;
}());
exports.Wallet = Wallet;
//# sourceMappingURL=wallet.js.map