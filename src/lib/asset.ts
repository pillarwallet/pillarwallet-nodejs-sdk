///<reference path="configuration.ts"/>
import { RequestPromise } from 'request-promise';

import { Requester } from '../utils/requester';
import { default as getConfiguration } from '../utils/requester-configurations/get';
import { default as putConfiguration } from '../utils/requester-configurations/put';
import { default as deleteConfiguration } from '../utils/requester-configurations/delete';
import { Configuration }  from './configuration';
import { HttpEndpoints } from '../lib/constants/httpEndpoints';

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
   * @returns {requestPromise.RequestPromise}
   */
  defaults(assetDefaults: AssetDefaults): RequestPromise {
    // validation
    this.validation(assetDefaultsSchema,assetDefaults);
    // setting the request
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

  /**
   * Returns a list of assets.
   * @param {AssetList} assetList
   * @returns {requestPromise.RequestPromise}
   */
  list(assetList:AssetList): RequestPromise {
    this.validation(assetListSchema, assetList);

    getConfiguration.headers['X-API-Signature'] =
      this.checkSignature(assetList, Configuration.accessKeys.privateKey);
    getConfiguration.qs = assetList;
    getConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.ASSET_LIST;

    return Requester.execute(getConfiguration);
  }

  /**
   * Update data elements on an existing asset record or create a new asset record
   * @param {AssetUpdate} assetUpdate
   * @returns {requestPromise.RequestPromise}
   */
  update(assetUpdate: AssetUpdate): RequestPromise {
    this.validation(assetUpdateSchema, assetUpdate);

    putConfiguration.headers['X-API-Signature'] =
      this.checkSignature(assetUpdate, Configuration.accessKeys.privateKey);
    putConfiguration.body = assetUpdate;
    putConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.ASSET_UPDATE;

    return Requester.execute(putConfiguration);
  }

  /**
   * Remove an existing asset from the database
   * @param {AssetDelete} assetDelete
   * @returns {requestPromise.RequestPromise}
   */
  delete(assetDelete: AssetDelete): RequestPromise {
    this.validation(assetDeleteSchema, assetDelete);

    deleteConfiguration.headers['X-API-Signature'] =
      this.checkSignature(assetDelete, Configuration.accessKeys.privateKey);
    deleteConfiguration.body = assetDelete;
    deleteConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.ASSET_DELETE;

    return Requester.execute(deleteConfiguration);
  }
}
