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
      fcmToken: string;
      username: string;
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
   * @description Method to authenticate when tokens are not provided in the initialise method
   * @param {string} codeVerifier
   * @returns {AxiosPromise}
   */
  static registerTokens(codeVerifier: string): AxiosPromise {
    const data = {
      publicKey: PrivateKeyDerivatives.getPublicKey(
        Configuration.accessKeys.privateKey,
      ),
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
      Configuration.accessKeys.privateKey,
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
      Configuration.accessKeys.oAuthTokens.refreshToken
    ) {
      const data = {
        refreshToken: Configuration.accessKeys.oAuthTokens.refreshToken,
      };

      const config = {
        ...postConfiguration,
        data,
        url: `${Configuration.accessKeys.apiUrl}${
          HttpEndpoints.REGISTER_REFRESH
        }`,
      };

      return axios(config);
    }

    throw new Error('Refresh Token is not assigned!');
  }
}
