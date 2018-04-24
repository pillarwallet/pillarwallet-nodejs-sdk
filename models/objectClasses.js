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
var WalletCreationParams = /** @class */ (function () {
    function WalletCreationParams() {
    }
    WalletCreationParams.getAttributeTypeMap = function () {
        return WalletCreationParams.attributeTypeMap;
    };
    WalletCreationParams.discriminator = undefined;
    WalletCreationParams.attributeTypeMap = [
        {
            "name": "publicKey",
            "baseName": "public_key",
            "type": "string"
        },
        {
            "name": "ethAddress",
            "baseName": "eth_address",
            "type": "string"
        },
        {
            "name": "fcmToken",
            "baseName": "fcmToken",
            "type": "string"
        }
    ];
    return WalletCreationParams;
}());
exports.WalletCreationParams = WalletCreationParams;
var WalletCreationResponse = /** @class */ (function () {
    function WalletCreationResponse() {
    }
    WalletCreationResponse.getAttributeTypeMap = function () {
        return WalletCreationResponse.attributeTypeMap;
    };
    WalletCreationResponse.discriminator = undefined;
    WalletCreationResponse.attributeTypeMap = [
        {
            "name": "result",
            "baseName": "result",
            "type": "string"
        },
        {
            "name": "message",
            "baseName": "message",
            "type": "string"
        },
        {
            "name": "walletId",
            "baseName": "walletId",
            "type": "number"
        },
        {
            "name": "userId",
            "baseName": "userId",
            "type": "number"
        }
    ];
    return WalletCreationResponse;
}());
exports.WalletCreationResponse = WalletCreationResponse;
