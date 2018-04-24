"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var secp256k1_1 = require("secp256k1");
var ethereumjs_util_1 = require("ethereumjs-util");
function signPayload(payload, privateKey) {
    var hash = ethereumjs_util_1.default(JSON.stringify(payload));
    var sigObj = secp256k1_1.default.sign(hash, new Buffer(privateKey, "hex"));
    var signature = sigObj.signature.toString("hex");
    return signature;
}
exports.signPayload = signPayload;
