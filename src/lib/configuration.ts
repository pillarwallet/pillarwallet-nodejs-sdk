/**
 * Import required classes / libraries / constants
 */
import * as Ajv from 'ajv';
import { AxiosPromise, AxiosResponse } from 'axios';
import { v4 as uuid } from 'uuid';

import { ErrorMessages } from './constants/errorMessages';
import { Authentication } from '../utils/authentication';
import { Register } from './register';
import { Requester } from '../utils/requester';
import { ProofKey } from '../utils/pkce';

let ajv: any;

export class Configuration {
  public static accessKeys: PillarSdkConfiguration = {
    privateKey: '',
    apiUrl: '',
    notificationsUrl: '',
    investmentsUrl: '',
  };

  public static uuid: string;
  private accessToken: string = '';
  private refreshToken: string = '';

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
    if (!Configuration.accessKeys.investmentsUrl) {
      Configuration.accessKeys.investmentsUrl = 'http://localhost:8082';
    }
    if (!Configuration.uuid) {
      Configuration.uuid = uuid();
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
    const xAPISignature = Authentication.sign(signParams, privateKey);

    if (!xAPISignature) {
      throw new Error(ErrorMessages.SigningError);
    }
    return xAPISignature;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }

  getAccessToken() {
    return this.accessToken;
  }

  getRefreshToken() {
    return this.refreshToken;
  }
  // TODO: We need to check it with the other endpoints and improve dependently from situation.
  /**
   * Make an Axios request based on default configuration
   * @param {object} options
   * @param {object=} options.data
   * @param {object=} options.params
   * @param {object=} options.sendParams
   * @param {object} options.schema
   * @param {any} options.defaultRequest
   * @param {url} options.url
   * @param {boolean=} options.checkSignature
   */
  async executeRequest({
    data,
    params,
    sendParams = true,
    schema,
    defaultRequest,
    url,
    checkSignature = true,
    oauth = true,
  }: {
    data?: object;
    params?: object;
    sendParams?: boolean;
    schema?: object;
    defaultRequest: any;
    url: string;
    checkSignature?: boolean;
    oauth?: boolean;
  }): Promise<AxiosResponse> {
    const payload: any =
      defaultRequest.method.toLowerCase() === 'get' ? params : data;
    if (schema) {
      try {
        this.validation(schema, payload);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    let request;

    request = {
      ...defaultRequest,
      url,
    };

    // check if method needs data to be sent or if it uses data within the url
    if (sendParams) {
      request = {
        ...defaultRequest,
        data,
        params,
        url,
      };
    }

    if (checkSignature) {
      request.headers['X-API-Signature'] = this.checkSignature(
        payload,
        Configuration.accessKeys.privateKey,
      );
    }

    if (oauth) {
      request.headers['Authorization'] = `Bearer: ${this.accessToken}`;

      const response = await Requester.execute(request);
      if (response.status === 401) {
        const token = await Register.refreshAuthToken();
        this.setAccessToken(token);
        request.headers['Authorization'] = `Bearer: ${this.accessToken}`;
      };
      return Requester.execute(request);
    };

    return Requester.execute(request)
  };
};
