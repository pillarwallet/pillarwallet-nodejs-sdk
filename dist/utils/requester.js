"use strict";
exports.__esModule = true;
var request = require("request-promise");
var auth = require('@pillarwallet/plr-auth-sdk');
var Requester = (function () {
    function Requester() {
    }
    Requester.sign = function (SignParams, privateKey) {
        try {
            var signature = auth.sign(SignParams, privateKey);
            return signature;
        }
        catch (e) {
            return null;
        }
    };
    Requester.execute = function (incomingRequestOptions) {
        return request(incomingRequestOptions);
    };
    return Requester;
}());
exports.Requester = Requester;
//# sourceMappingURL=requester.js.map