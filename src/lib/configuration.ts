import * as Ajv from 'ajv';
import {ErrorMessages} from "./constants/errorMessages";
import {Authentication} from "../utils/authentication";

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
    if(!Configuration.accessKeys.apiUrl)
      Configuration.accessKeys.apiUrl = 'localhost:8080';
  }

  /**
   * Validate data using schema
   * Schema will be compiled and cached
   * @param {Object} schema
   * @param data
   */
  validation(schema: Object, data: any){
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
  checkSignature(signParams: Object,privateKey: string){
    const xAPISignature = Authentication.sign(
      signParams,
      privateKey
    );

    if (!xAPISignature) {
      throw new Error(ErrorMessages.SigningError);
    }
    return xAPISignature;
  }
}
