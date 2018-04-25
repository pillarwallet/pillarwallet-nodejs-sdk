"use strict";
exports.__esModule = true;
var wallet_1 = require("./lib/wallet");
var PillarSdk = (function () {
    function PillarSdk(configuration) {
        this.wallet = new wallet_1.Wallet();
        PillarSdk.config = configuration;
    }
    PillarSdk.prototype.dumpConfig = function () {
        console.log(PillarSdk);
    };
    return PillarSdk;
}());
exports.PillarSdk = PillarSdk;
//# sourceMappingURL=index.js.map