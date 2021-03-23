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
import { AxiosPromise } from 'axios';

import { Configuration } from './configuration';
import { HttpEndpoints } from './constants/httpEndpoints';
// Request Configuration
import { default as postConfiguration } from '../utils/requester-configurations/post';
import { default as getConfiguration } from '../utils/requester-configurations/get';

// Import Validation Schemas
const investmentsDepositRequestSchema = require('../schemas/investments/depositRequest.json');
const icoListSchema = require('../schemas/investments/icoList.json');

export class Investments extends Configuration {
  /**
   * @name depositRequest
   * @description method to call deposit request api endpoint on platform-investments
   *
   * @param {InvestmentsDepositRequest} data
   * @returns {AxiosPromise}
   */
  depositRequest(data: InvestmentsDepositRequest): AxiosPromise {
    return this.executeRequest({
      data,
      schema: investmentsDepositRequestSchema,
      defaultRequest: postConfiguration,
      url:
        Configuration.accessKeys.investmentsUrl +
        HttpEndpoints.INVESTMENTS_DEPOSIT_REQUEST,
    });
  }

  /**
   * @name icoList
   * @description Retrieve a list of ICO offerings available for a specific user
   *
   * @param {IcoList} params
   * @returns {AxiosPromise}
   */
  icoList(params: IcoList): AxiosPromise {
    return this.executeRequest({
      params,
      sendParams: false,
      schema: icoListSchema,
      defaultRequest: getConfiguration,
      url: `${Configuration.accessKeys.investmentsUrl}${
        HttpEndpoints.INVESTMENTS_USER_ICO
      }/${params.userId}/icos`,
    });
  }
}
