/**
 * Import required classes / libraries / constants
 */
import { AxiosPromise } from 'axios';
import { Configuration } from './configuration';
import { Requester } from '../utils/requester';
import { HttpEndpoints } from './constants/httpEndpoints';

/**
 * Import HTTP Request Configurations
 */
import { default as postConfiguration } from '../utils/requester-configurations/post';

export class Register {
  /**
   * @name registerKeys
   * @description Method to register the public key and create the Nonce on the server side
   * @param {string} publicKey
   * @param {string} uuid
   * @returns {AxiosPromise}
   */
  static registerKeys(publicKey: string, uuid: string): AxiosPromise {
    postConfiguration.data = {
      publicKey,
      uuid,
    };

    postConfiguration.url =
      Configuration.accessKeys.apiUrl + HttpEndpoints.REGISTER_KEYS;

    return Requester.execute(postConfiguration);
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
    const uuid = data.uuid;
    // removing Access id from signature
    delete data.uuid;
    // Signing
    postConfiguration.headers[
      'X-API-Signature'
    ] = new Configuration().checkSignature(data, privateKey);
    // delete nonce
    delete data.nonce;
    // adding Access id to payload.
    data.uuid = uuid;
    postConfiguration.data = data;
    postConfiguration.url =
      Configuration.accessKeys.apiUrl + HttpEndpoints.REGISTER_AUTH;
    // http request

    return Requester.execute(postConfiguration);
  }
}
