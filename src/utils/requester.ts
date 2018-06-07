import axios from 'axios';

//import * as request from 'request-promise';


export class Requester {
  /**
   * execute http request
   * @param incomingRequestOptions
   * @returns {AxiosPromise}
   */
  static execute(incomingRequestOptions: any) {
    return axios.get('http://localhost:8080/wallet/register', incomingRequestOptions)
      .then((response) => {
        return response;
      });
  }
}
