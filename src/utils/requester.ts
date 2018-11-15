import axios, { AxiosPromise } from 'axios';
import { Register } from '../lib/register';
import { Configuration } from '../lib/configuration';

export class Requester {
  /**
   * execute http request
   * @param incomingRequestOptions
   * @returns {AxiosPromise}
   */
  static execute(incomingRequestOptions: any) {
    // Try to refresh access token if it is expired
    if (incomingRequestOptions.headers['Authorization']) {
      return axios(incomingRequestOptions).catch(error => {
        if (error.config && error.response && error.response.status === 401) {
          return Register.refreshAuthToken().then((response: any) => {
            Configuration.accessToken = response.data.accessToken;
            Configuration.refreshToken = response.data.refreshToken;
            error.config.headers['Authorization'] = `Bearer: ${
              Configuration.accessToken
            }`;

            return axios(error.config);
          });
        }
        throw error;
      });
    }
    return axios(incomingRequestOptions);
  }
}
