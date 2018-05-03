import { Requester } from '../utils/requester';
import { RequestPromise } from 'request-promise';
import { default as defaultsConfiguration } from '../utils/requester-configurations/assets-defauts';
import { default as searchConfiguration } from '../utils/requester-configurations/assets-search';
import { ErrorMessages } from './constants/errorMessages';
import { Configuration }  from './configuration';

export class Asset extends Configuration {

  constructor() {
    super();
  }

  defaults(assetDefaults: AssetDefaults): RequestPromise {
    if (!assetDefaults.walletId) {
      throw new TypeError(ErrorMessages.MissingOrInvalidData);
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
    if (!assetSearch.walletId || !assetSearch.query) {
      throw new TypeError(ErrorMessages.MissingOrInvalidData);
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
