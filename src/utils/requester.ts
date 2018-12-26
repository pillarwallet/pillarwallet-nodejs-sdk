import axios, { AxiosPromise } from 'axios';
import { Register } from '../lib/register';
import { Configuration } from '../lib/configuration';

export class Requester {
  /**
   * execute http request
   * @param incomingRequestOptions
   * @returns {AxiosPromise}
   */
  static execute(incomingRequestOptions: any): AxiosPromise {
    // Try to refresh access token if it is expired
    if (incomingRequestOptions.headers.Authorization) {
      return axios(incomingRequestOptions).catch(error => {
        // TODO: What would happen if we banned the user and the server would always return 401?
        if (error.config && error.response && error.response.status === 401) {
          return Register.refreshAuthToken().then((response: any) => {
            // Set auth Tokens
            const tokens = { ...response.data };
            if (tokens.accessToken && tokens.refreshToken) {
              Configuration.setAuthTokens(
                tokens.accessToken,
                tokens.refreshToken,
              );
            } else {
              throw 'Refresh or access token returned empty from the server!';
            }
            const options = {
              ...error.config,
              headers: {
                ...error.config.heders,
                Authorization: `Bearer ${tokens.accessToken}`,
              },
            };
            return axios(options);
          });
        }
        throw error;
      });
    }
    return axios(incomingRequestOptions);
  }
}
