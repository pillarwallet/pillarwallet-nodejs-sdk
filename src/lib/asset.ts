///<reference path="configuration.ts"/>
import { RequestPromise } from 'request-promise';

import { Requester } from '../utils/requester';
import { default as defaultsConfiguration } from '../utils/requester-configurations/assets-defauts';
import { default as searchConfiguration } from '../utils/requester-configurations/assets-search';
import { Configuration }  from './configuration';

const assetDefaultsSchema = require('../schemas/assets/defaults.json');
const assetSearchSchema = require('../schemas/assets/search.json');

export class Asset extends Configuration {

  constructor() {
    super();
  }

  /**
   * Returns a list of assets that are marked as default assets.
   * @param {AssetDefaults} assetDefaults
   * @returns {requestPromise.RequestPromise}
   */
  defaults(assetDefaults: AssetDefaults): RequestPromise {
    //validation
    this.validation(assetDefaultsSchema,assetDefaults);
    //setting the request
    defaultsConfiguration.headers['X-API-Signature'] =
      this.checkSignature(assetDefaults.walletId, Configuration.accessKeys.privateKey);
    defaultsConfiguration.qs = assetDefaults;

    return Requester.execute(defaultsConfiguration);
  }

  /**
   * Returns a list of assets that contain the search criteria which would be the name,
   * token symbol or smartcontract hexadecimal.
   * @param {AssetSearch} assetSearch
   * @returns {requestPromise.RequestPromise}
   */
  search(assetSearch: AssetSearch): RequestPromise {
    this.validation(assetSearchSchema, assetSearch);

    searchConfiguration.headers['X-API-Signature'] =
      this.checkSignature(assetSearch, Configuration.accessKeys.privateKey);
    searchConfiguration.qs = assetSearch;

    return Requester.execute(searchConfiguration);
  }
}
