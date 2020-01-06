/*
Copyright (C) 2019 Stiftung Pillar Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/**
 * Import required classes / libraries / constants
 */
import * as Ajv from 'ajv';
import { AxiosResponse } from 'axios';

import { ErrorMessages } from './constants/errorMessages';
import { Authentication } from '../utils/authentication';
import { Requester } from '../utils/requester';

let ajv: any;

export class Configuration {
  // TODO: make config name not `accessKeys`?
  public static accessKeys: PillarSdkConfiguration = {
    updateOAuthFn: undefined,
    tokensFailedCallbackFn: undefined,
    oAuthTokens: { accessToken: '', refreshToken: '' },
    apiUrl: '',
    notificationsUrl: '',
    investmentsUrl: '',
    username: undefined,
    network: undefined,
    requestTimeout: 0,
  };

  constructor() {
    ajv = new Ajv({
      allErrors: true,
    });
  }

  static setAuthTokens(accessToken: string, refreshToken: string) {
    Configuration.accessKeys.oAuthTokens = {
      accessToken,
      refreshToken,
    };
    if (
      Configuration.accessKeys.oAuthTokens &&
      Configuration.accessKeys.oAuthTokens.accessToken &&
      Configuration.accessKeys.oAuthTokens.refreshToken &&
      Configuration.accessKeys.updateOAuthFn
    ) {
      // Callback function to frontEnd
      Configuration.accessKeys.updateOAuthFn({
        ...Configuration.accessKeys.oAuthTokens,
      });
    }
  }

  /**
   * @name setRequestTimeout
   * @description Sets the timeout config used for axios requests.
   *
   * @param timeout the request timeout config value
   */
  setRequestTimeout(timeout: number) {
    Configuration.accessKeys.requestTimeout = timeout;
  }

  /**
   * @name setUsername
   * @description Sets the username for this instance. Please
   * note that refreshing a token will not work until this is
   * set.
   *
   * @param incomingUsername the incoming username
   *
   * @returns incomingUsername
   */
  setUsername(incomingUsername: string) {
    Configuration.accessKeys.username = incomingUsername;
    return incomingUsername;
  }

  /**
   * @name setNetwork
   * @description Sets what network the API should use.
   *
   * @param network the network, supported values are: "mainnet" and "rinkeby"
   */
  setNetwork(network: string) {
    Configuration.accessKeys.network = network;
  }

  /**
   * Return an object with accessToken and refreshToken
   */
  getTokens() {
    if (Configuration.accessKeys.oAuthTokens) {
      return { ...Configuration.accessKeys.oAuthTokens };
    }
    return null;
  }

  /**
   * Set SDK variables for Configuration.
   * @param {PillarSdkConfiguration} incomingConfiguration
   */
  initialise(incomingConfiguration: PillarSdkConfiguration) {
    Configuration.accessKeys = incomingConfiguration;
    if (!Configuration.accessKeys.apiUrl) {
      Configuration.accessKeys.apiUrl = 'https://localhost:8080';
    }
    if (!Configuration.accessKeys.notificationsUrl) {
      Configuration.accessKeys.notificationsUrl = 'http://localhost:8081';
    }
    if (!Configuration.accessKeys.investmentsUrl) {
      Configuration.accessKeys.investmentsUrl = 'http://localhost:8082';
    }
  }

  /**
   * Validate data using schema
   * Schema will be compiled and cached
   * @param {Object} schema
   * @param data
   */
  validation(schema: Object, data: any) {
    const valid = ajv.validate(schema, data);
    if (!valid && ajv.errors) {
      throw new TypeError(ajv.errorsText(ajv.errors));
    }
  }

  /**
   * Check Error and returns Signature
   * @param {Object} signParams
   * @param {string} privateKey
   * @returns {string}
   */
  checkSignature(signParams: Object, privateKey: string) {
    const xAPISignature = Authentication.sign(signParams, privateKey);

    if (!xAPISignature) {
      throw new Error(ErrorMessages.SigningError);
    }
    return xAPISignature;
  }

  // TODO: We need to check it with the other endpoints and improve dependently from situation.
  /**
   * Make an Axios request based on default configuration
   * @param {object} options
   * @param {object=} options.data
   * @param {object=} options.params
   * @param {object=} options.sendParams
   * @param {object} options.schema
   * @param {any} options.defaultRequest
   * @param {url} options.url
   * @param {boolean=} options.auth
   */
  async executeRequest({
    data,
    params,
    sendParams = true,
    schema,
    defaultRequest,
    url,
    auth = true,
  }: {
    data?: object;
    params?: object;
    sendParams?: boolean;
    schema?: object;
    defaultRequest: any;
    url: string;
    auth?: boolean;
  }): Promise<AxiosResponse> {
    const payload: any =
      defaultRequest.method.toLowerCase() === 'get' ? params : data;
    if (schema) {
      try {
        this.validation(schema, payload);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    let request;

    request = {
      ...defaultRequest,
      url,
      headers: { ...defaultRequest.headers },
      timeout: Configuration.accessKeys.requestTimeout,
    };

    // check if method needs data to be sent or if it uses data within the url
    if (sendParams) {
      request.data = data;
      request.params = params;
    }

    if (Configuration.accessKeys.network) {
      request.headers['Network'] = Configuration.accessKeys.network;
    }

    if (auth) {
      if (
        Configuration.accessKeys.oAuthTokens &&
        Configuration.accessKeys.oAuthTokens.accessToken
      ) {
        request.headers['Authorization'] = `Bearer ${
          Configuration.accessKeys.oAuthTokens.accessToken
        }`;
      }
    }

    return Requester.execute(request);
  }
}
