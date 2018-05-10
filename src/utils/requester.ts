import * as request from 'request-promise';

export class Requester {
  /**
   * Execute a http request
   * @param incomingRequestOptions
   * @returns {requestPromise.RequestPromise}
   */
  static execute(incomingRequestOptions: any) {
    return request(incomingRequestOptions);
  }
}
