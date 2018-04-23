"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Wallet = /** @class */ (function () {
    function Wallet() {
    }
    Wallet.getAttributeTypeMap = function () {
        return Wallet.attributeTypeMap;
    };
    Wallet.discriminator = undefined;
    Wallet.attributeTypeMap = [
        {
            "name": "publicKey",
            "baseName": "publicKey",
            "type": "string"
        },
        {
            "name": "userId",
            "baseName": "userId",
            "type": "number"
        },
        {
            "name": "ethAddress",
            "baseName": "ethAddress",
            "type": "string"
        },
        {
            "name": "fcmToken",
            "baseName": "fcmToken",
            "type": "string"
        },
        {
            "name": "signalRegistrationId",
            "baseName": "signalRegistrationId",
            "type": "string"
        },
        {
            "name": "bcxRegistered",
            "baseName": "bcxRegistered",
            "type": "boolean"
        }
    ];
    return Wallet;
}());
exports.Wallet = Wallet;
