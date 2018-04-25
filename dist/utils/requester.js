"use strict";
exports.__esModule = true;
var request = require("request-promise");
var httpEndpoints_1 = require("../lib/constants/httpEndpoints");
var auth = require('@pillarwallet/plr-auth-sdk');
var Requester = (function () {
    function Requester() {
    }
    Requester.invoke = function () {
        return request(httpEndpoints_1.HttpEndpoints.BASE + httpEndpoints_1.HttpEndpoints.WALLET_CREATE, {
            method: 'PUT'
        });
    };
    return Requester;
}());
exports.Requester = Requester;
//# sourceMappingURL=requester.js.map