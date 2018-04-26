"use strict";
exports.__esModule = true;
var request = require("request-promise");
var httpEndpoints_1 = require("../lib/constants/httpEndpoints");
var Requester = (function () {
    function Requester() {
    }
    Requester.invoke = function (signature, payload) {
        return request(httpEndpoints_1.HttpEndpoints.BASE + httpEndpoints_1.HttpEndpoints.WALLET_REGISTER, {
            method: 'POST',
            headers: { 'X-API-Signature': signature },
            body: payload,
            json: true
        });
    };
    return Requester;
}());
exports.Requester = Requester;
//# sourceMappingURL=requester.js.map