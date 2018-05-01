"use strict";
exports.__esModule = true;
var wallet_1 = require("./lib/wallet");
var asset_1 = require("./lib/asset");
var user_1 = require("./lib/user");
var notification_1 = require("./lib/notification");
var PillarSdk = (function () {
    function PillarSdk(configuration) {
        this.wallet = new wallet_1.Wallet();
        this.asset = new asset_1.Asset();
        this.user = new user_1.User();
        this.notification = new notification_1.Notification();
        PillarSdk.config = configuration;
    }
    PillarSdk.prototype.dumpConfig = function () {
        console.log(PillarSdk);
    };
    return PillarSdk;
}());
exports.PillarSdk = PillarSdk;
//# sourceMappingURL=index.js.map