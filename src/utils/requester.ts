import * as request from 'request-promise';
import { HttpEndpoints } from '../lib/constants/httpEndpoints';
import {WalletRegisterParams} from "../models/walletRegisterParams";

export class Requester {

  static invoke(signature:string, payload: WalletRegisterParams): request.RequestPromise {
    return request(HttpEndpoints.BASE + HttpEndpoints.WALLET_REGISTER, {
        method: 'POST',
        headers: { 'X-API-Signature': signature},
        body: payload,
        json: true
    });
  }
}