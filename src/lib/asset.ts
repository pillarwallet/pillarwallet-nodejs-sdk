/**
 * Import required classes / libraries / constants
 */
import { AxiosPromise } from 'axios';
import { Configuration } from './configuration';
import { HttpEndpoints } from './constants/httpEndpoints';

/**
 * Import HTTP Request Configurations
 */
import { default as getConfiguration } from '../utils/requester-configurations/get';

/**
 * Import Validation Schemas
 */
const assetDefaultsSchema = require('../schemas/assets/defaults.json');
const assetSearchSchema = require('../schemas/assets/search.json');
const assetListSchema = require('../schemas/assets/list.json');
const assetPreferredSchema = require('../schemas/assets/preferred.json');

export class Asset extends Configuration {
  constructor() {
    super();
  }

  /**
   * @name defaults
   * @desc Returns a list of assets that are marked as default assets.
   * @param {AssetDefaults} params
   * @returns {AxiosPromise}
   */
  defaults(params: AssetDefaults): AxiosPromise {
    return this.executeRequest({
      params,
      schema: assetDefaultsSchema,
      defaultRequest: getConfiguration,
      url: Configuration.accessKeys.apiUrl + HttpEndpoints.ASSET_DEFAULT,
    });
  }

  /**
   * @name preferred
   * @desc Returns a list of assets that are marked as preferred.
   * @param {AssetPreferred} params
   * @returns {AxiosPromise}
   */
  preferred(params: AssetPreferred): AxiosPromise {
    return this.executeRequest({
      params,
      schema: assetPreferredSchema,
      defaultRequest: getConfiguration,
      url: Configuration.accessKeys.apiUrl + HttpEndpoints.ASSET_PREFERRED,
    });
  }

  /**
   * @name search
   * @desc Returns a list of assets that contain the search criteria which would be the name,
   * token symbol or smart contract hexadecimal.
   * @param {AssetSearch} params
   * @returns {AxiosPromise}
   */
  search(params: AssetSearch): AxiosPromise {
    return this.executeRequest({
      params,
      schema: assetSearchSchema,
      defaultRequest: getConfiguration,
      url: Configuration.accessKeys.apiUrl + HttpEndpoints.ASSET_SEARCH,
    });
  }

  /**
   * @name list
   * @desc Returns a list of assets.
   * @param {AssetList} params
   * @returns {AxiosPromise}
   */
  list(params: AssetList): AxiosPromise {
    return this.executeRequest({
      params,
      schema: assetListSchema,
      defaultRequest: getConfiguration,
      url: Configuration.accessKeys.apiUrl + HttpEndpoints.ASSET_LIST,
    });
  }
}
