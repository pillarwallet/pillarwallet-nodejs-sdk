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
var wallet_register_1 = require("../utils/requester-configurations/wallet-register");
var wallet_update_1 = require("../utils/requester-configurations/wallet-update");
var configuration_1 = require("./configuration");
var requester_1 = require("../utils/requester");
var walletRegisterSchema = require('../schemas/wallet/register.json');
var walletUpdateSchema = require('../schemas/wallet/update.json');
var Wallet = (function (_super) {
    __extends(Wallet, _super);
    function Wallet() {
        return _super.call(this) || this;
    }
    Wallet.prototype.register = function (walletRegister) {
        this.validation(walletRegisterSchema, walletRegister);
        wallet_register_1["default"].headers['X-API-Signature'] =
            this.checkSignature(walletRegister, configuration_1.Configuration.accessKeys.privateKey);
        wallet_register_1["default"].body = walletRegister;
        return requester_1.Requester.execute(wallet_register_1["default"]);
    };
    Wallet.prototype.update = function (walletUpdate) {
        this.validation(walletUpdateSchema, walletUpdate);
        wallet_update_1["default"].headers['X-API-Signature'] =
            this.checkSignature(walletUpdate, configuration_1.Configuration.accessKeys.privateKey);
        wallet_update_1["default"].body = walletUpdate;
        return requester_1.Requester.execute(wallet_update_1["default"]);
    };
    return Wallet;
}(configuration_1.Configuration));
exports.Wallet = Wallet;
//# sourceMappingURL=wallet.js.map