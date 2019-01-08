import axios, { AxiosPromise } from 'axios';
import { Register } from '../lib/register';
import { Configuration } from '../lib/configuration';
import { ProofKey } from '../utils/pkce';

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
          return Register.refreshAuthToken()
            .then((response: any) => {
              // Set auth Tokens
              const tokens = { ...response.data };
              this.setTokens(tokens);
              const options = {
                ...error.config,
                headers: {
                  ...error.config.headers,
                  Authorization: `Bearer ${tokens.accessToken}`,
                },
              };
              return axios(options);
            })
            .catch(async error => {
              if (
                error.response.status === 400 &&
                error.response.data &&
                error.response.data.message ===
                  'Invalid grant: refresh token has expired'
              ) {
                const codeVerifier = await ProofKey.codeVerifierGenerator();
                return Register.registerTokens(codeVerifier.toString()).then(
                  (response: any) => {
                    // Set auth Tokens
                    const tokens = { ...response.data };
                    this.setTokens(tokens);
                    incomingRequestOptions.headers.Authorization = `Bearer ${
                      tokens.accessToken
                    }`;
                    return axios(incomingRequestOptions);
                  },
                );
              }
              throw error;
            });
        }
        throw error;
      });
    }
    return axios(incomingRequestOptions);
  }

  private static setTokens(tokens: any) {
    if (tokens.accessToken && tokens.refreshToken) {
      Configuration.setAuthTokens(
        tokens.accessToken,
        tokens.refreshToken,
      );
    } else {
      throw 'Refresh or access token returned empty from the server!';
    }
  }
}
