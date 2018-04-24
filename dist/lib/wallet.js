"use strict";
exports.__esModule = true;
var errorMessages_1 = require("./constants/errorMessages");
var Wallet = (function () {
    function Wallet(incomingWalletId) {
        this.walletId = incomingWalletId;
    }
    Wallet.prototype.register = function () {
        if (this.walletId) {
            throw new Error(errorMessages_1.ErrorMessages.WalletAlreadyRegistered);
        }
        this.walletId = Math.floor(Math.random() * Math.floor(99999)).toString();
        console.log('Wallet registered!');
        console.log("Wallet ID is now " + this.walletId);
    };
    Wallet.prototype.dumpConfig = function () {
        console.log(this);
    };
    return Wallet;
}());
exports.Wallet = Wallet;
//# sourceMappingURL=wallet.js.map