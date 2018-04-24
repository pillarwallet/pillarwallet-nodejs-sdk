"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var localVarRequest = require("request");
var Promise = require("bluebird");
var urlConstants_1 = require("./urls/urlConstants");
var objectClasses_1 = require("./models/objectClasses");
var objectSerializer_1 = require("./utils/objectSerializer");
var signPayload_1 = require("./utils/signPayload");
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
     * @param walletCreationParams request fields
     * @param privateKey input parameter JSON string
     */
    WalletApi.prototype.createWallet = function (walletCreationParams, privateKey) {
        //get signature
        var xAPISignature = signPayload_1.signPayload(objectClasses_1.WalletCreationParams, privateKey);
        var localVarPath = this.basePath + '/wallet/create';
        var localVarQueryParameters = {};
        var localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        var localVarFormParams = {};
        // verify required parameter 'body' is not null or undefined
        if (walletCreationParams === null || walletCreationParams === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createWallet.');
        }
        // verify required parameter 'xAPISignature' is not null or undefined
        if (xAPISignature === null || xAPISignature === undefined) {
            throw new Error('Required parameter xAPISignature was null or undefined when calling createWallet.');
        }
        localVarHeaderParams['X-API-Signature'] = objectSerializer_1.ObjectSerializer.serialize(xAPISignature, "string");
        var localVarUseFormData = false;
        var localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: objectSerializer_1.ObjectSerializer.serialize(walletCreationParams, "WalletCreationParams")
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
                    body = objectSerializer_1.ObjectSerializer.deserialize(body, "WalletCreationResponse");
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
