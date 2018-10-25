/**
 * Import required classes / libraries / constants
 */
import { AxiosPromise } from 'axios';
import { Configuration } from './configuration';
import { Requester } from '../utils/requester';
import { HttpEndpoints } from './constants/httpEndpoints';
import { v4 as uuid } from 'uuid';

/**
 * Import HTTP Request Configurations
 */
import { default as postConfiguration } from '../utils/requester-configurations/post';

export class Register extends Configuration {
  constructor() {
    super();
  }

  /**
   * @name registerPublic
   * @description Method to register the public key and create the Nonce on the server side
   * @param {String} uuid
   * @param {String} publicKey
   * @returns {AxiosPromise}
   */
  registerPublic(publicKey: String): AxiosPromise {
    postConfiguration.data = {
      publicKey,
      uuid: uuid(),
    };

    postConfiguration.url =
      Configuration.accessKeys.apiUrl + HttpEndpoints.REGISTER_PUBLIC;

    return Requester.execute(postConfiguration);
  }
}
