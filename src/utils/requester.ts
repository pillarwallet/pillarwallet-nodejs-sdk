import * as request from 'request-promise';
const auth = require('@pillarwallet/plr-auth-sdk');

export class Requester {
  /**
   * Call the Signature SDK
   * @param {Object} signParams
   * @param {string} privateKey
   * @returns {any}
   */
  static sign(signParams: Object,privateKey: string) {
    try {
      const signature = auth.sign(signParams,privateKey) as string;
      return signature;
    } catch (e) {
      return null;
    }
  }

  /**
   * Execute a http request
   * @param incomingRequestOptions
   * @returns {requestPromise.RequestPromise}
   */
  static execute(incomingRequestOptions: any) {
    return request(incomingRequestOptions);
  }
}
