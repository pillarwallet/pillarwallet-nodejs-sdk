// export class Wallet {
//     'publicKey': string;
//     'userId': number;
//     'ethAddress': string;
//     'fcmToken': string;
//     'signalRegistrationId': string;
//     'bcxRegistered': boolean;

//     static discriminator = undefined;

//     static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
//         {
//             "name": "publicKey",
//             "baseName": "publicKey",
//             "type": "string"
//         },
//         {
//             "name": "userId",
//             "baseName": "userId",
//             "type": "number"
//         },
//         {
//             "name": "ethAddress",
//             "baseName": "ethAddress",
//             "type": "string"
//         },
//         {
//             "name": "fcmToken",
//             "baseName": "fcmToken",
//             "type": "string"
//         },
//         {
//             "name": "signalRegistrationId",
//             "baseName": "signalRegistrationId",
//             "type": "string"
//         },
//         {
//             "name": "bcxRegistered",
//             "baseName": "bcxRegistered",
//             "type": "boolean"
//         }    ];

//     static getAttributeTypeMap() {
//         return Wallet.attributeTypeMap;
//     }
// }

// export class WalletCreationParams {
//     'publicKey': string;
//     'ethAddress': string;
//     'fcmToken': string;

//     static discriminator = undefined;

//     static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
//         {
//             "name": "publicKey",
//             "baseName": "public_key",
//             "type": "string"
//         },
//         {
//             "name": "ethAddress",
//             "baseName": "eth_address",
//             "type": "string"
//         },
//         {
//             "name": "fcmToken",
//             "baseName": "fcmToken",
//             "type": "string"
//         }    ];

//     static getAttributeTypeMap() {
//         return WalletCreationParams.attributeTypeMap;
//     }
// }

// export class WalletCreationResponse {
//     'result': string;
//     'message': string;
//     'walletId': number;
//     'userId': number;

//     static discriminator = undefined;

//     static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
//         {
//             "name": "result",
//             "baseName": "result",
//             "type": "string"
//         },
//         {
//             "name": "message",
//             "baseName": "message",
//             "type": "string"
//         },
//         {
//             "name": "walletId",
//             "baseName": "walletId",
//             "type": "number"
//         },
//         {
//             "name": "userId",
//             "baseName": "userId",
//             "type": "number"
//         }    ];

//     static getAttributeTypeMap() {
//         return WalletCreationResponse.attributeTypeMap;
//     }
// }