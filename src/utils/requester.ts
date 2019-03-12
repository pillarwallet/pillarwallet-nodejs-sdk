/*
Copyright (C) 2019 Stiftung Pillar Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
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
                (error.response.data.message ===
                  'Invalid grant: refresh token has expired' ||
                  error.response.data.message ===
                    'Invalid grant: refresh token is invalid')
              ) {
                const refreshTokenCallback = async (privateKey: string) => {
                  const codeVerifier = await ProofKey.codeVerifierGenerator();
                  return Register.registerTokens(
                    codeVerifier.toString(),
                    privateKey,
                  ).then((response: any) => {
                    // Set auth Tokens
                    const tokens = { ...response.data };
                    this.setTokens(tokens);
                    incomingRequestOptions.headers.Authorization = `Bearer ${
                      tokens.accessToken
                    }`;
                    return axios(incomingRequestOptions);
                  });
                };
                error.cb = refreshTokenCallback;
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
      Configuration.setAuthTokens(tokens.accessToken, tokens.refreshToken);
    } else {
      throw 'Refresh or access token returned empty from the server!';
    }
  }
}
