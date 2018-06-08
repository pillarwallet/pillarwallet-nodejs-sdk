import axios from 'axios';

export class Requester {
  /**
   * execute http request
   * @param incomingRequestOptions
   * @returns {AxiosPromise}
   */
  static execute(incomingRequestOptions: any) {
    return axios(incomingRequestOptions);
  }
}
