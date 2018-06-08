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
const assetUpdateSchema = require('../schemas/assets/update.json');
const assetDeleteSchema = require('../schemas/assets/delete.json');

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
      this.checkSignature(assetDefaults.walletId, Configuration.accessKeys.privateKey);
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

  /**
   * Update data elements on an existing asset record or create a new asset record
   * @param {AssetUpdate} assetUpdate
   * @returns {axios.AxiosPromise}
   */
  update(assetUpdate: AssetUpdate): AxiosPromise {
    this.validation(assetUpdateSchema, assetUpdate);

    putConfiguration.headers['X-API-Signature'] =
      this.checkSignature(assetUpdate, Configuration.accessKeys.privateKey);
    putConfiguration.data = assetUpdate;
    putConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.ASSET_UPDATE;

    return Requester.execute(putConfiguration);
  }

  /**
   * Remove an existing asset from the database
   * @param {AssetDelete} assetDelete
   * @returns {axios.AxiosPromise}
   */
  delete(assetDelete: AssetDelete): AxiosPromise {
    this.validation(assetDeleteSchema, assetDelete);

    deleteConfiguration.headers['X-API-Signature'] =
      this.checkSignature(assetDelete, Configuration.accessKeys.privateKey);
    deleteConfiguration.data = assetDelete;
    deleteConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.ASSET_DELETE;

    return Requester.execute(deleteConfiguration);
  }
}
