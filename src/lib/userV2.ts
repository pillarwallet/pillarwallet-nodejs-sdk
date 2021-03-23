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
import { HttpEndpoints } from './constants/httpEndpoints';
import { Configuration } from './configuration';
import { AxiosPromise } from 'axios';

/**
 * Import HTTP Request Configurations
 */
import { default as postConfiguration } from '../utils/requester-configurations/post';

/**
 * @name validate
 * @description Method to validate ethAddress
 * @param {object} data
 * @param {string} privateKey
 * @returns {AxiosPromise}
 */
export class UserV2 extends Configuration {
  validate(
    data: {
      blockchainAddress: string;
      publicKey: string;
    },
    privateKey: string,
  ): AxiosPromise {
    const payload = { ...data };
    const config = {
      ...postConfiguration,
      headers: { 'X-API-Signature': '' },
    };

    // deleting publicKey from payload
    delete payload.publicKey;

    // Signing Header
    config.headers['X-API-Signature'] = this.checkSignature(
      payload,
      privateKey,
    );

    return this.executeRequest({
      data,
      defaultRequest: config,
      url: Configuration.accessKeys.apiUrl + HttpEndpoints.USER_VALIDATE_V2,
      auth: false,
    });
  }
}
