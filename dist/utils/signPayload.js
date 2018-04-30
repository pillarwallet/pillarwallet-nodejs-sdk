"use strict";
exports.__esModule = true;
var SignRequest = (function () {
    function SignRequest() {
    }
    SignRequest.prototype.register = function (walletCreationParams, privateKey) {
        if (walletCreationParams === null || walletCreationParams === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createWallet.');
        }
        var xAPISignature = auth.sign(walletCreationParams, privateKey, { curve: 'secp256k1' });
        if (xAPISignature === null || xAPISignature === undefined) {
            throw new Error('Required parameter xAPISignature was null or undefined when calling createWallet.');
        }
        return Requester.register(xAPISignature, walletCreationParams);
    };
    SignRequest.prototype.dumpConfig = function () {
        console.log(this);
    };
    SignRequest.prototype.testFunction = function () {
        return 'hello';
    };
    return SignRequest;
}());
exports.SignRequest = SignRequest;
//# sourceMappingURL=signPayload.js.map