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
   * @description Retrieve a list of ICO offerings available for a specific ICO wallet user
   *
   * @param {} data
   * @returns {AxiosPromise}
   */
  icoList(params: IcoList): AxiosPromise {
    return this.executeRequest({
      params,
      noParams: true,
      schema: icoListSchema,
      defaultRequest: getConfiguration,
      url:
        Configuration.accessKeys.investmentsUrl +
        HttpEndpoints.INVESTMENTS_USER_ICO +
        '/' +
        params.userId +
        '/icos',
    });
  }
}
