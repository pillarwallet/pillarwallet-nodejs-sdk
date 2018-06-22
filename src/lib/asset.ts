/**
 * Import required classes / libraries / constants
 */
import { AxiosPromise } from 'axios';
import { Requester } from '../utils/requester';
import { Configuration }  from './configuration';
import { HttpEndpoints } from '../lib/constants/httpEndpoints';

/**
 * Import HTTP Request Configurations
 */
import { default as getConfiguration } from '../utils/requester-configurations/get';
import { default as putConfiguration } from '../utils/requester-configurations/put';
import { default as deleteConfiguration } from '../utils/requester-configurations/delete';

/**
 * Import Validation Schemas
 */
const assetDefaultsSchema = require('../schemas/assets/defaults.json');
const assetSearchSchema = require('../schemas/assets/search.json');
const assetListSchema = require('../schemas/assets/list.json');

export class Asset extends Configuration {

  constructor() {
    super();
  }

  /**
   * Returns a list of assets that are marked as default assets.
   * @param {AssetDefaults} assetDefaults
   * @returns {axios.AxiosPromise}
   */
  defaults(assetDefaults: AssetDefaults): AxiosPromise {
    // validation
    this.validation(assetDefaultsSchema,assetDefaults);
    // setting the request
    getConfiguration.headers['X-API-Signature'] =
      this.checkSignature(assetDefaults, Configuration.accessKeys.privateKey);
    getConfiguration.params = assetDefaults;
    getConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.ASSET_DEFAULT;

    return Requester.execute(getConfiguration);
  }

  /**
   * Returns a list of assets that contain the search criteria which would be the name,
   * token symbol or smartcontract hexadecimal.
   * @param {AssetSearch} assetSearch
   * @returns {axios.AxiosPromise}
   */
  search(assetSearch: AssetSearch): AxiosPromise {
    this.validation(assetSearchSchema, assetSearch);

    getConfiguration.headers['X-API-Signature'] =
      this.checkSignature(assetSearch, Configuration.accessKeys.privateKey);
    getConfiguration.params = assetSearch;
    getConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.ASSET_SEARCH;

    return Requester.execute(getConfiguration);
  }

  /**
   * Returns a list of assets.
   * @param {AssetList} assetList
   * @returns {axios.AxiosPromise}
   */
  list(assetList:AssetList): AxiosPromise {
    this.validation(assetListSchema, assetList);

    getConfiguration.headers['X-API-Signature'] =
      this.checkSignature(assetList, Configuration.accessKeys.privateKey);
    getConfiguration.params = assetList;
    getConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.ASSET_LIST;

    return Requester.execute(getConfiguration);
  }
}
