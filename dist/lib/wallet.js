"use strict";
exports.__esModule = true;
var requester_1 = require("../utils/requester");
var wallet_register_1 = require("../utils/requester-configurations/wallet-register");
var wallet_update_1 = require("../utils/requester-configurations/wallet-update");
var errorMessages_1 = require("./constants/errorMessages");
var Wallet = (function () {
    function Wallet() {
    }
    Wallet.prototype.register = function (walletRegister, privateKey) {
        if (!walletRegister.publicKey || !walletRegister.fcmToken || !walletRegister.ethAddress) {
            throw new TypeError(errorMessages_1.ErrorMessages.MissingOrInvalidData);
        }
        var xAPISignature = requester_1.Requester.sign(walletRegister, privateKey);
        if (!xAPISignature) {
            throw new Error(errorMessages_1.ErrorMessages.SigningError);
        }
        wallet_register_1["default"].headers['X-API-Signature'] = xAPISignature;
        wallet_register_1["default"].body = walletRegister;
        return requester_1.Requester.execute(wallet_register_1["default"]);
    };
    Wallet.prototype.update = function (walletUpdate, privateKey) {
        if (!walletUpdate.walletId ||
            !walletUpdate.fcmToken ||
            !walletUpdate.ethAddress ||
            !walletUpdate.signalRegistrationId) {
            throw new TypeError(errorMessages_1.ErrorMessages.MissingOrInvalidData);
        }
        var xAPISignature = requester_1.Requester.sign(walletUpdate, privateKey);
        if (!xAPISignature) {
            throw new Error(errorMessages_1.ErrorMessages.SigningError);
        }
        wallet_update_1["default"].headers['X-API-Signature'] = xAPISignature;
        wallet_update_1["default"].body = walletUpdate;
        return requester_1.Requester.execute(wallet_update_1["default"]);
    };
    return Wallet;
}());
exports.Wallet = Wallet;
//# sourceMappingURL=wallet.js.map