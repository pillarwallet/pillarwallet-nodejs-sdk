"use strict";
exports.__esModule = true;
var request = require("request-promise");
var auth = require('@pillarwallet/plr-auth-sdk');
var httpEndpoints_1 = require("../lib/constants/httpEndpoints");
var Requester = (function () {
    function Requester() {
    }
    Requester.sign = function (SignParams, privateKey) {
        return auth.sign(SignParams, privateKey, { curve: 'secp256k1' });
    };
    Requester.register = function (signature, payload) {
        return request(httpEndpoints_1.HttpEndpoints.BASE + httpEndpoints_1.HttpEndpoints.WALLET_REGISTER, {
            method: 'POST',
            headers: { 'X-API-Signature': signature },
            body: payload,
            json: true
        });
    };
    Requester.defaults = function (signature, walletId) {
        return request(httpEndpoints_1.HttpEndpoints.BASE + httpEndpoints_1.HttpEndpoints.ASSET_DEFAULT, {
            method: 'GET',
            headers: { 'X-API-Signature': signature },
            qs: {
                walletId: walletId
            }
        });
    };
    return Requester;
}());
exports.Requester = Requester;
//# sourceMappingURL=requester.js.map