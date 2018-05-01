import { Wallet } from './lib/wallet';
import { Asset } from './lib/asset';
import { Connection } from './lib/connection';

export class PillarSdk {

    static config: PillarSdkConfiguration;
    wallet: Wallet = new Wallet();
    asset: Asset = new Asset();
    connection: Connection = new Connection();

    constructor(configuration: PillarSdkConfiguration) {
        PillarSdk.config = configuration;
    }

    dumpConfig() {
        console.log(PillarSdk);
    }
}

// import {BASE_URL} from './urls/urlConstants';
// import {WalletRegisterParams, WalletCreationResponse} from "./models/objectClasses";
// import {ObjectSerializer} from "./utils/objectSerializer";
// import {signPayload} from './utils/signPayload';

// export class WalletApi {
//     protected _basePath = BASE_URL;
//     protected defaultHeaders: any = {};
//     protected _useQuerystring: boolean = false;


//     set basePath(basePath: string) {
//         this._basePath = basePath;
//     }

//     get basePath() {
//         return this._basePath;
//     }

//     /**
//      * Create a new Wallet and User on Database. And return the identification  number of each.
//      * @summary create a new wallet
//      * @param walletCreationParams request fields
//      * @param privateKey input parameter JSON string
//      */
//     public createWallet(walletCreationParams: WalletRegisterParams, privateKey: string): Promise<{ response:n; body: WalletCreationResponse; }> {
//         //get signature
//         const xAPISignature = signPayload(WalletRegisterParams,privateKey);
//         const localVarPath = this.basePath + '/wallet/create';
//         let localVarQueryParameters: any = {};
//         let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
//         let localVarFormParams: any = {};

//         // verify required parameter 'body' is not null or undefined
//         if (walletCreationParams === null || walletCreationParams === undefined) {
//             throw new Error('Required parameter body was null or undefined when calling createWallet.');
//         }

//         // verify required parameter 'xAPISignature' is not null or undefined
//         if (xAPISignature === null || xAPISignature === undefined) {
//             throw new Error('Required parameter xAPISignature was null or undefined when calling createWallet.');
//         }

//         localVarHeaderParams['X-API-Signature'] = ObjectSerializer.serialize(xAPISignature, "string");

//         let localVarUseFormData = false;

//         let localVarRequestOptions: localVarRequest.Options = {
//             method: 'PUT',
//             qs: localVarQueryParameters,
//             headers: localVarHeaderParams,
//             uri: localVarPath,
//             useQuerystring: this._useQuerystring,
//             json: true,
//             body: ObjectSerializer.serialize(walletCreationParams, "WalletRegisterParams")
//         };

//         if (Object.keys(localVarFormParams).length) {
//             if (localVarUseFormData) {
//                 (<any>localVarRequestOptions).formData = localVarFormParams;
//             } else {
//                 localVarRequestOptions.form = localVarFormParams;
//             }
//         }
//         return new Promise<{ response: http.ClientResponse; body: WalletCreationResponse; }>((resolve, reject) => {
//             localVarRequest(localVarRequestOptions, (error, response, body) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     body = ObjectSerializer.deserialize(body, "WalletCreationResponse");
//                     if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
//                         resolve({response: response, body: body});
//                     } else {
//                         reject({response: response, body: body});
//                     }
//                 }
//             });
//         });
//     }
// }