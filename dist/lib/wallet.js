"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var requester_1 = require("../utils/requester");
var wallet_register_1 = require("../utils/requester-configurations/wallet-register");
var wallet_update_1 = require("../utils/requester-configurations/wallet-update");
var errorMessages_1 = require("./constants/errorMessages");
var configuration_1 = require("./configuration");
var Ajv = require("ajv");
var walletRegisterSchema = require('../schemas/wallet/register.json');
var walletUpdateSchema = require('../schemas/wallet/update.json');
var ajv;
var Wallet = (function (_super) {
    __extends(Wallet, _super);
    function Wallet() {
        var _this = _super.call(this) || this;
        ajv = new Ajv({
            allErrors: true
        });
        return _this;
    }
    Wallet.prototype.register = function (walletRegister) {
        var valid = ajv.validate(walletRegisterSchema, walletRegister);
        if (!valid && ajv.errors) {
            throw new TypeError(ajv.errorsText(ajv.errors));
        }
        if (!walletRegister.publicKey || !walletRegister.fcmToken || !walletRegister.ethAddress) {
            throw new TypeError(errorMessages_1.ErrorMessages.MissingOrInvalidData);
        }
        var xAPISignature = requester_1.Requester.sign(walletRegister, configuration_1.Configuration.accessKeys.privateKey);
        if (!xAPISignature) {
            throw new Error(errorMessages_1.ErrorMessages.SigningError);
        }
        wallet_register_1["default"].headers['X-API-Signature'] = xAPISignature;
        wallet_register_1["default"].body = walletRegister;
        return requester_1.Requester.execute(wallet_register_1["default"]);
    };
    Wallet.prototype.update = function (walletUpdate) {
        var valid = ajv.validate(walletUpdateSchema, walletUpdate);
        if (!valid && ajv.errors) {
            throw new TypeError(ajv.errorsText(ajv.errors));
        }
        if (!walletUpdate.walletId ||
            !walletUpdate.fcmToken ||
            !walletUpdate.ethAddress ||
            !walletUpdate.signalRegistrationId) {
            throw new TypeError(errorMessages_1.ErrorMessages.MissingOrInvalidData);
        }
        var xAPISignature = requester_1.Requester.sign(walletUpdate, configuration_1.Configuration.accessKeys.privateKey);
        if (!xAPISignature) {
            throw new Error(errorMessages_1.ErrorMessages.SigningError);
        }
        wallet_update_1["default"].headers['X-API-Signature'] = xAPISignature;
        wallet_update_1["default"].body = walletUpdate;
        return requester_1.Requester.execute(wallet_update_1["default"]);
    };
    return Wallet;
}(configuration_1.Configuration));
exports.Wallet = Wallet;
//# sourceMappingURL=wallet.js.map