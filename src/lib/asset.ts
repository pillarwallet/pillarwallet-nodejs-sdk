import { Requester } from '../utils/requester';
import { RequestPromise } from 'request-promise';
import { default as defaultsConfiguration } from '../utils/requester-configurations/assets-defauts';
import { default as searchConfiguration } from '../utils/requester-configurations/assets-search';
import { ErrorMessages } from './constants/errorMessages';
import { Configuration }  from './configuration';
import * as Ajv from 'ajv';

const assetDefaultsSchema = require('../schemas/assets/defaults.json');
const assetSearchSchema = require('../schemas/assets/search.json');

let ajv: any;

export class Asset extends Configuration {

  constructor() {
    super();

    ajv = new Ajv({
      allErrors: true,
    });
  }

  defaults(assetDefaults: AssetDefaults): RequestPromise {
    const valid = ajv.validate(assetDefaultsSchema, assetDefaults);
    if (!valid && ajv.errors) {
      throw new TypeError(ajv.errorsText(ajv.errors));
    }

    const xAPISignature = Requester.sign(
      assetDefaults.walletId,
      Configuration.accessKeys.privateKey,
    );

    if (!xAPISignature) {
      throw new Error(ErrorMessages.SigningError);
    }

    defaultsConfiguration.headers['X-API-Signature'] = xAPISignature;
    defaultsConfiguration.qs = assetDefaults;

    return Requester.execute(defaultsConfiguration);
  }

  search(assetSearch: AssetSearch): RequestPromise {
    const valid = ajv.validate(assetSearchSchema, assetSearch);
    if (!valid && ajv.errors) {
      throw new TypeError(ajv.errorsText(ajv.errors));
    }

    const xAPISignature = Requester.sign(
      assetSearch,
      Configuration.accessKeys.privateKey,
    );

    if (!xAPISignature) {
      throw new Error(ErrorMessages.SigningError);
    }

    searchConfiguration.headers['X-API-Signature'] = xAPISignature;
    searchConfiguration.qs = assetSearch;

    return Requester.execute(searchConfiguration);
  }
}
