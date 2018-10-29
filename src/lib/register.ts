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
   * @name registerPublic
   * @description Method to register the public key and create the Nonce on the server side
   * @param {String} publicKey
   * @returns {AxiosPromise}
   */
  static registerPublic(publicKey?: String, uuid?: String): AxiosPromise {
    postConfiguration.data = {
      publicKey,
      uuid,
    };

    postConfiguration.url =
      Configuration.accessKeys.apiUrl + HttpEndpoints.REGISTER_PUBLIC;

    return Requester.execute(postConfiguration);
  }

  /**
   * @name registerWallet
   * @description Method to register new wallet
   * @param data
   * @privateKey string
   * @returns {AxiosPromise}
   *
   */
  static registerWallet(data: {}, privateKey: string): AxiosPromise {
    // Signing Header
    postConfiguration.headers[
      'X-API-Signature'
    ] = new Configuration().checkSignature(data, privateKey);
    postConfiguration.data = data;
    postConfiguration.url =
      Configuration.accessKeys.apiUrl + HttpEndpoints.REGISTER_WALLET;
    // http request

    return Requester.execute(postConfiguration);
  }
}
