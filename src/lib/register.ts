/**
 * Import required classes / libraries / constants
 */
import { AxiosPromise } from 'axios';
import { Configuration } from './configuration';
import { HttpEndpoints } from './constants/httpEndpoints';

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
      nonce: string;
      codeChallenge: string;
      ethAddress: string;
      fcmToken: string;
      username: string;
      uuid: string;
    },
    privateKey: string,
  ): AxiosPromise {
    // Signing Header
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
}
