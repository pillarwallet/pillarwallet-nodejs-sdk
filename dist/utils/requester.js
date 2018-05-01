"use strict";
exports.__esModule = true;
var request = require("request-promise");
var auth = require('@pillarwallet/plr-auth-sdk');
var Requester = (function () {
    function Requester() {
    }
    Requester.sign = function (SignParams, privateKey) {
        return auth.sign(SignParams, privateKey, { curve: 'secp256k1' });
    };
    Requester.execute = function (incomingRequestOptions) {
        return request(incomingRequestOptions);
    };
    return Requester;
}());
exports.Requester = Requester;
//# sourceMappingURL=requester.js.map