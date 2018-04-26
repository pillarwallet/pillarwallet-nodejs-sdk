import * as request from 'request-promise';
import { HttpEndpoints } from '../lib/constants/httpEndpoints';
import { Promise } from 'bluebird';

const auth = require('@pillarwallet/plr-auth-sdk');


export class Requester {

  static invoke(): request.RequestPromise {
    return request(HttpEndpoints.BASE + HttpEndpoints.WALLET_CREATE, {
      method: 'PUT'
    });
  }
}