import * as request from 'request-promise';
import { HttpEndpoints } from '../lib/constants/httpEndpoints';

export class Requester {

  static invoke(signature, payload): request.RequestPromise {
    return request(HttpEndpoints.BASE + HttpEndpoints.WALLET_REGISTER, {
        method: 'POST',
        headers: { 'X-API-Signature': signature},
        body: payload,
        json: true
    });
  }
}