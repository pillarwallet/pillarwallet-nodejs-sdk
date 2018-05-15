///<reference path="configuration.ts"/>
import { RequestPromise } from 'request-promise';

import { Requester } from '../utils/requester';
import { default as getConfiguration } from '../utils/requester-configurations/get';
import { Configuration }  from './configuration';
import { HttpEndpoints } from '../lib/constants/httpEndpoints';

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
    getConfiguration.headers['X-API-Signature'] =
      this.checkSignature(assetDefaults.walletId, Configuration.accessKeys.privateKey);
    getConfiguration.qs = assetDefaults;
    getConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.ASSET_DEFAULT;

    return Requester.execute(getConfiguration);
  }

  /**
   * Returns a list of assets that contain the search criteria which would be the name,
   * token symbol or smartcontract hexadecimal.
   * @param {AssetSearch} assetSearch
   * @returns {requestPromise.RequestPromise}
   */
  search(assetSearch: AssetSearch): RequestPromise {
    this.validation(assetSearchSchema, assetSearch);

    getConfiguration.headers['X-API-Signature'] =
      this.checkSignature(assetSearch, Configuration.accessKeys.privateKey);
    getConfiguration.qs = assetSearch;
    getConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.ASSET_SEARCH;

    return Requester.execute(getConfiguration);
  }
}
