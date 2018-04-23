export class Wallet {
    'publicKey': string;
    'userId': number;
    'ethAddress': string;
    'fcmToken': string;
    'signalRegistrationId': string;
    'bcxRegistered': boolean;

    static discriminator = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
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
        }    ];

    static getAttributeTypeMap() {
        return Wallet.attributeTypeMap;
    }
}