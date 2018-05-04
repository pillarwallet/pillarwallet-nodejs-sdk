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
var wallet_1 = require("./lib/wallet");
var asset_1 = require("./lib/asset");
var connection_1 = require("./lib/connection");
var user_1 = require("./lib/user");
var notification_1 = require("./lib/notification");
var configuration_1 = require("./lib/configuration");
var Ajv = require("ajv");
var pillarSdkConstructorSchema = require('../src/schemas/pillarsdk-constructor.json');
var ajv;
var PillarSdk = (function (_super) {
    __extends(PillarSdk, _super);
    function PillarSdk(incomingConfiguration) {
        var _this = _super.call(this) || this;
        _this.wallet = new wallet_1.Wallet();
        _this.asset = new asset_1.Asset();
        _this.connection = new connection_1.Connection();
        _this.user = new user_1.User();
        _this.notification = new notification_1.Notification();
        _this.configuration = new configuration_1.Configuration();
        ajv = new Ajv({
            allErrors: true
        });
        require('ajv-keywords')(ajv, 'instanceof');
        var valid = ajv.validate(pillarSdkConstructorSchema, incomingConfiguration);
        if (!valid && ajv.errors) {
            throw new TypeError(ajv.errorsText(ajv.errors));
        }
        _this.configuration.initialise(incomingConfiguration);
        return _this;
    }
    return PillarSdk;
}(configuration_1.Configuration));
exports.PillarSdk = PillarSdk;
//# sourceMappingURL=index.js.map