"use strict";
exports.__esModule = true;
var wallet_1 = require("./lib/wallet");
var asset_1 = require("./lib/asset");
var PillarSdk = (function () {
    function PillarSdk(configuration) {
        this.wallet = new wallet_1.Wallet();
        this.asset = new asset_1.Asset();
        PillarSdk.config = configuration;
    }
    PillarSdk.prototype.dumpConfig = function () {
        console.log(PillarSdk);
    };
    return PillarSdk;
}());
exports.PillarSdk = PillarSdk;
//# sourceMappingURL=index.js.map