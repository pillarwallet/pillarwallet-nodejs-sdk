"use strict";
exports.__esModule = true;
var requester_1 = require("../utils/requester");
var wallet_register_1 = require("../utils/requester-configurations/wallet-register");
var wallet_update_1 = require("../utils/requester-configurations/wallet-update");
var Wallet = (function () {
    function Wallet() {
    }
    Wallet.prototype.register = function (walletRegister, privateKey) {
        var xAPISignature = requester_1.Requester.sign(walletRegister, privateKey);
        if (xAPISignature === null || xAPISignature === undefined) {
            throw new Error('Required parameter xAPISignature was null or undefined when calling createWallet.');
        }
        wallet_register_1["default"].headers['X-API-Signature'] = xAPISignature;
        wallet_register_1["default"].body = walletRegister;
        return requester_1.Requester.execute(wallet_register_1["default"]);
    };
    Wallet.prototype.update = function (walletUpdate, privateKey) {
        var xAPISignature = requester_1.Requester.sign(walletUpdate, privateKey);
        if (xAPISignature === null || xAPISignature === undefined) {
            throw new Error('Required parameter xAPISignature was null or undefined when calling createWallet.');
        }
        wallet_update_1["default"].headers['X-API-Signature'] = xAPISignature;
        wallet_update_1["default"].body = walletUpdate;
        return requester_1.Requester.execute(wallet_update_1["default"]);
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