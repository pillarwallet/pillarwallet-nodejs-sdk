"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var localVarRequest = require("request");
var Promise = require("bluebird");
var urlConstants_1 = require("./src/urlConstants");
var WalletApi = /** @class */ (function () {
    function WalletApi() {
        this._basePath = urlConstants_1.BASE_URL;
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
    /**
     * Create a new Wallet and User on Database. And return the identification  number of each.
     * @summary create a new wallet
     * @param body request fields
     * @param xAPISignature signature over the hash of the input parameter JSON string
     */
    WalletApi.prototype.createWallet = function (body, xAPISignature) {
        var localVarPath = this.basePath + '/wallet/create';
        var localVarQueryParameters = {};
        var localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        var localVarFormParams = {};
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createWallet.');
        }
        // verify required parameter 'xAPISignature' is not null or undefined
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
            body: ObjectSerializer.serialize(body, "WalletCreationParams")
        };
        // this.authentications.default.applyToRequest(localVarRequestOptions);
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
exports.WalletApi = WalletApi;
