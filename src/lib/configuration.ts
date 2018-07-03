/**
 * Import required classes / libraries / constants
 */
import * as Ajv from 'ajv';
import { AxiosPromise } from 'axios';

import { ErrorMessages } from './constants/errorMessages';
import { Authentication } from '../utils/authentication';
import { Requester } from '../utils/requester';

let ajv: any;

export class Configuration {
  public static accessKeys: PillarSdkConfiguration = {
    privateKey: '',
  };

  constructor() {
    ajv = new Ajv({
      allErrors: true,
    });
  }

  /**
   * Set SDK variables for Configuration.
   * @param {PillarSdkConfiguration} incomingConfiguration
   */
  initialise(incomingConfiguration: PillarSdkConfiguration) {
    Configuration.accessKeys = incomingConfiguration;
    if (!Configuration.accessKeys.apiUrl) {
      Configuration.accessKeys.apiUrl = 'http://localhost:8080';
    }
    if (!Configuration.accessKeys.notificationsUrl) {
      Configuration.accessKeys.notificationsUrl = 'http://localhost:8081';
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
    const xAPISignature = Authentication.sign(
      signParams,
      privateKey,
    );

    if (!xAPISignature) {
      throw new Error(ErrorMessages.SigningError);
    }
    return xAPISignature;
  }

  // TODO: We need to check it with the other endpoints and improve dependently from situation.
  /**
   * Make an Axios request based on default configuration
   * @param {object} data
   * @param {object} schema
   * @param {any} requestMethodConfiguration
   * @param {string} url
   * @param {boolean} checkSignature
   */
  executeRequest(
    data: object,
    schema: object,
    requestMethodConfiguration: any,
    url: string,
    checkSignature: boolean = true,
  ): AxiosPromise {
    try {
      this.validation(schema, data);
    } catch (e) {
      return Promise.reject(e);
    }

    const request = {
      ...requestMethodConfiguration,
      data,
      url,
    };

    if (checkSignature) {
      request.headers['X-API-Signature'] =
        this.checkSignature(data, Configuration.accessKeys.privateKey);
    }

    return Requester.execute(request);
  }
}
