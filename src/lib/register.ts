/**
 * Import required classes / libraries / constants
 */
import { HttpEndpoints } from './constants/httpEndpoints';
import axios, { AxiosPromise } from 'axios';
import { Configuration } from './configuration';

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
      checkSignature: false,
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
    const config = { ...postConfiguration };
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
      checkSignature: false,
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
    const config = { ...postConfiguration };

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
      checkSignature: false,
    });
  }

  /**
   * @name refreshAuthToken
   * @description Method to refresh accessToken once refreshToken is not expired.
   * @returns {AxiosPromise}
   */
  static refreshAuthToken() {
    const data = {
      refreshToken: Configuration.refreshToken,
    };

    const config = {
      ...postConfiguration,
      data,
      headers: {
        Authorization: '',
      },
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.REGISTER_REFRESH
      }`,
    };

    config.headers['Authorization'] = `Bearer: ${Configuration.accessToken}`;

    return axios(config);
  }
}
