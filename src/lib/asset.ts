/*
Copyright (C) 2021 Stiftung Pillar Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
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
