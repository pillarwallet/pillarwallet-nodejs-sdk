import * as localVarRequest from 'request';
import * as Promise from 'bluebird';
import { BASE_URL } from './urls/urlConstants';
import { WalletCreationParams } from "./models/objectClasses";
import { ObjectSerializer } from "./utils/objectSerializer";
import { signPayload } from './utils/signPayload';
var WalletApi = (function () {
    function WalletApi() {
        this._basePath = BASE_URL;
        this.defaultHeaders = {};
        this._useQuerystring = false;
    }
    Object.defineProperty(WalletApi.prototype, "basePath", {
        get: function () {
            return this._basePath;
        },
        set: function (basePath) {
            this._basePath = basePath;
        },
        enumerable: true,
        configurable: true
    });
    WalletApi.prototype.createWallet = function (walletCreationParams, privateKey) {
        var xAPISignature = signPayload(WalletCreationParams, privateKey);
        var localVarPath = this.basePath + '/wallet/create';
        var localVarQueryParameters = {};
        var localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        var localVarFormParams = {};
        if (walletCreationParams === null || walletCreationParams === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createWallet.');
        }
        if (xAPISignature === null || xAPISignature === undefined) {
            throw new Error('Required parameter xAPISignature was null or undefined when calling createWallet.');
        }
        localVarHeaderParams['X-API-Signature'] = ObjectSerializer.serialize(xAPISignature, "string");
        var localVarUseFormData = false;
        var localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(walletCreationParams, "WalletCreationParams")
        };
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise(function (resolve, reject) {
            localVarRequest(localVarRequestOptions, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                else {
                    body = ObjectSerializer.deserialize(body, "WalletCreationResponse");
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    };
    return WalletApi;
}());
export { WalletApi };
//# sourceMappingURL=index.js.map