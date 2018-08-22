// import { AxiosPromise } from 'axios';
import { Configuration } from './configuration';

/**
 * Import Validation Schemas
 */
const investmentsDepositRequestSchema = require('../schemas/investments/depositRequest.json');

export class Investments extends Configuration {

  constructor() {
    super();
  }

  depositRequest(investmentsDepositRequest: InvestmentsDepositRequest) {
    this.validation(investmentsDepositRequestSchema, investmentsDepositRequest);
  }
}
