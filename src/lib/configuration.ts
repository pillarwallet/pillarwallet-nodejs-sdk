/**
 * Import required classes / libraries / constants
 */
import * as Ajv from 'ajv';
import { AxiosPromise } from 'axios';

import { ErrorMessages } from './constants/errorMessages';
import { Authentication } from '../utils/authentication';
import { HttpEndpoints } from './constants/httpEndpoints';
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
  executeRequest(
    data: any,
    schema: Object,
    requestMethodConfiguration: any,
    httpEndpoint: HttpEndpoints,
    checkSignature: boolean = true,
  ): AxiosPromise {
    this.validation(schema, data);

    if (checkSignature) {
      requestMethodConfiguration.headers['X-API-Signature'] =
        this.checkSignature(data, Configuration.accessKeys.privateKey);
    }
    requestMethodConfiguration.data = data;
    requestMethodConfiguration.url = Configuration.accessKeys.apiUrl + httpEndpoint;

    return Requester.execute(requestMethodConfiguration);
  }
}
