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
   * @param {String} publicKey
   * @returns {AxiosPromise}
   */
  static registerKeys(publicKey?: String, uuid?: String): AxiosPromise {
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
   * @param data
   * @privateKey string
   * @returns {AxiosPromise}
   *
   */
  static registerAuth(data: {}, privateKey: string): AxiosPromise {
    // Signing Header
    postConfiguration.headers[
      'X-API-Signature'
    ] = new Configuration().checkSignature(data, privateKey);
    postConfiguration.data = data;
    postConfiguration.url =
      Configuration.accessKeys.apiUrl + HttpEndpoints.REGISTER_AUTH;
    // http request

    return Requester.execute(postConfiguration);
  }

  /**
   * @name registerAuth
   * @description Method to Send code verfifer and UUID.
   * @param data
   * @privateKey string
   * @returns {AxiosPromise}
   *
   */
  static registerAccess(data: {}, privateKey: string): AxiosPromise {
    // Signing Header
    postConfiguration.headers[
      'X-API-Signature'
    ] = new Configuration().checkSignature(data, privateKey);
    postConfiguration.data = data;
    postConfiguration.url =
      Configuration.accessKeys.apiUrl + HttpEndpoints.REGISTER_ACCESS;
    // http request

    return Requester.execute(postConfiguration);
  }
}
