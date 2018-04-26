export class WalletRegisterParams {
    'publicKey': string;
    'ethAddress': string;
    'fcmToken': string;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
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
        }    ];

    static getAttributeTypeMap() {
        return WalletRegisterParams.attributeTypeMap;
    }
}