import http = require('http');
import localVarRequest = require('request');
import Promise = require('bluebird');


import {BASE_URL} from  './src/urlConstants';
import {WalletCreationParams, WalletCreationResponse} from "./src/objectClasses";

export class WalletApi {
    protected _basePath = BASE_URL;
    protected defaultHeaders: any = {};
    protected _useQuerystring: boolean = false;


    set basePath(basePath: string) {
        this._basePath = basePath;
    }

    get basePath() {
        return this._basePath;
    }

    /**
     * Create a new Wallet and User on Database. And return the identification  number of each.
     * @summary create a new wallet
     * @param body request fields
     * @param xAPISignature signature over the hash of the input parameter JSON string
     */
    public createWallet(body: WalletCreationParams, xAPISignature: string): Promise<{ response:n; body: WalletCreationResponse; }> {
        const localVarPath = this.basePath + '/wallet/create';
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};

        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createWallet.');
        }

        // verify required parameter 'xAPISignature' is not null or undefined
        if (xAPISignature === null || xAPISignature === undefined) {
            throw new Error('Required parameter xAPISignature was null or undefined when calling createWallet.');
        }

        localVarHeaderParams['X-API-Signature'] = ObjectSerializer.serialize(xAPISignature, "string");

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(body, "WalletCreationParams")
        };

        // this.authentications.default.applyToRequest(localVarRequestOptions);

        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                (<any>localVarRequestOptions).formData = localVarFormParams;
            } else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise<{ response: http.ClientResponse; body: WalletCreationResponse; }>((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    body = ObjectSerializer.deserialize(body, "WalletCreationResponse");
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({response: response, body: body});
                    } else {
                        reject({response: response, body: body});
                    }
                }
            });
        });
    }
}