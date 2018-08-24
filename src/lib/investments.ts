import { AxiosPromise } from 'axios';

import { Configuration } from './configuration';
import { HttpEndpoints } from './constants/httpEndpoints';
// Request Configuration
import { default as postConfiguration } from '../utils/requester-configurations/post';
// Import Validation Schemas
const investmentsDepositRequestSchema = require('../schemas/investments/depositRequest.json');

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
}
