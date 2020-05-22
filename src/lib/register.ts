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
import { HttpEndpoints } from './constants/httpEndpoints';
import axios, { AxiosPromise } from 'axios';
import { v4 as uuidV4 } from 'uuid';

import { Configuration } from './configuration';
import { ProofKey } from '../utils/pkce';
import { PrivateKeyDerivatives } from '../utils/private-key-derivatives';

/**
 * Import HTTP Request Configurations
 */
import { default as postConfiguration } from '../utils/requester-configurations/post';
import { default as getConfiguration } from '../utils/requester-configurations/get';

/**
 * Import Validation Schemas
 */
const registerApproveExternalLoginSchema = require('../schemas/register/approveExternalLogin.json');

export class Register {
  /**
   * @name registerKeys
   * @description Method to register the public key and access id on the server side
   * @param {string} publicKey
   * @param {string} uuid
   * @returns {AxiosPromise}
   */
  static registerKeys(publicKey: string, uuid: string): AxiosPromise {
    // data of payload
    const data = {
      publicKey,
      uuid,
    };

    // request
    return new Configuration().executeRequest({
      data,
      defaultRequest: postConfiguration,
      url: `${Configuration.accessKeys.apiUrl}${HttpEndpoints.REGISTER_KEYS}`,
      auth: false,
    });
  }

  /**
   * @name registerAuth
   * @description Method to register new wallet
   * @param {object} data
   * @param {string} privateKey
   * @returns {AxiosPromise}
   */
  static registerAuth(
    data: {
      codeChallenge: string;
      ethAddress: string;
      fcmToken?: string;
      recovery?: {
        accountAddress: string;
        deviceAddress: string;
      };
      username?: string;
      uuid: string;
      nonce: string;
    },
    privateKey: string,
  ): AxiosPromise {
    const config = {
      ...postConfiguration,
      headers: { 'X-API-Signature': '' },
    };
    const header = { ...data };
    const payload = { ...data };

    // removing Access id from header signature
    delete header.uuid;

    // delete nonce from payload
    delete payload.nonce;

    // Signing
    config.headers['X-API-Signature'] = new Configuration().checkSignature(
      header,
      privateKey,
    );

    return new Configuration().executeRequest({
      data: payload,
      defaultRequest: config,
      url: `${Configuration.accessKeys.apiUrl}${HttpEndpoints.REGISTER_AUTH}`,
      auth: false,
    });
  }

  /**
   * @name registerAccess
   * @description Method to send code verifier and UUID.
   * @param {object} data
   * @param {string} privateKey
   * @returns {AxiosPromise}
   */
  static registerAccess(
    data: {
      codeVerifier: string;
      uuid: string;
      authorizationCode: string;
    },
    privateKey: string,
  ): AxiosPromise {
    const header = { ...data };
    const payload = { ...data };
    const config = {
      ...postConfiguration,
      headers: { 'X-API-Signature': '' },
    };

    // deleting authorizationCode from payload
    delete payload.authorizationCode;

    // Signing Header
    config.headers['X-API-Signature'] = new Configuration().checkSignature(
      header,
      privateKey,
    );

    // HTTP request
    return new Configuration().executeRequest({
      data: payload,
      defaultRequest: config,
      url: `${Configuration.accessKeys.apiUrl}${HttpEndpoints.REGISTER_ACCESS}`,
      auth: false,
    });
  }

  /**
   * @name registerTokens
   * @description Method to authenticate when refresh token expires
   * @param {string} codeVerifier
   * @returns {AxiosPromise}
   */

  static registerTokens(
    codeVerifier: string,
    privateKey: string,
  ): AxiosPromise {
    const data = {
      publicKey: PrivateKeyDerivatives.getPublicKey(privateKey),
      uuid: uuidV4(),
      codeChallenge: ProofKey.codeChallengeGenerator(codeVerifier),
      codeVerifier: codeVerifier.toString(),
    };

    const header = { ...data };
    const payload = { ...data };
    const config = {
      ...postConfiguration,
      headers: { 'X-API-Signature': '' },
    };

    // Signing Header
    config.headers['X-API-Signature'] = new Configuration().checkSignature(
      header,
      privateKey,
    );

    // HTTP request
    return new Configuration().executeRequest({
      data: payload,
      defaultRequest: config,
      url: `${Configuration.accessKeys.apiUrl}${HttpEndpoints.REGISTER_TOKENS}`,
      auth: false,
    });
  }

  /**
   * @name refreshAuthToken
   * @description Method to refresh accessToken.
   * @returns {AxiosPromise}
   */
  static refreshAuthToken() {
    if (
      Configuration.accessKeys.oAuthTokens &&
      Configuration.accessKeys.oAuthTokens.refreshToken &&
      Configuration.accessKeys.username
    ) {
      const data = {
        refreshToken: Configuration.accessKeys.oAuthTokens.refreshToken,
        username: Configuration.accessKeys.username,
      };

      const config = {
        ...postConfiguration,
        data,
        url: `${Configuration.accessKeys.apiUrl}${
          HttpEndpoints.REGISTER_REFRESH
        }`,
        timeout: Configuration.accessKeys.requestTimeout,
      };

      return axios(config);
    }

    throw new Error('Refresh Token is not assigned!');
  }

  /**
   * @name approveExternalLogin
   * @desc Method to authenticate a login token
   * @param {RegisterApproveExternalLogin} params
   * @returns {AxiosPromise}
   */
  approveExternalLogin(params: RegisterApproveExternalLogin): AxiosPromise {
    return new Configuration().executeRequest({
      params,
      defaultRequest: getConfiguration,
      schema: registerApproveExternalLoginSchema,
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.REGISTER_APPROVE_EXTERNAL_LOGIN
      }`,
    });
  }
}
