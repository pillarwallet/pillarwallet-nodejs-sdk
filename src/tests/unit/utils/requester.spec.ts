/*
Copyright (C) 2021 Stiftung Pillar Project

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
import axios from 'axios';
import { Configuration } from '../../../lib/configuration';
import { Register } from '../../../lib/register';
import { Requester } from '../../../utils/requester';

jest.mock('axios');

describe('Requester utility', () => {
  const defaultOptions: object = {
    headers: {},
    url: '',
  };

  afterEach(() => {
    axios.mockClear();
  });

  afterAll(() => {
    axios.mockRestore();
  });

  it('makes a request using options', () => {
    const options = {
      ...defaultOptions,
      method: 'POST',
      data: {
        foo: 'bar',
      },
      json: true,
    };

    Requester.execute(options);

    expect(axios).toBeCalledWith(options);
    expect(axios).toHaveBeenCalledTimes(1);
  });

  describe('OAuth unauthorized retry', () => {
    const options = {
      ...defaultOptions,
      headers: {
        Authorization: 'Bearer access',
      },
    };

    jest.spyOn(Register, 'refreshAuthToken');

    beforeEach(() => {
      Configuration.setAuthTokens('accessToken', 'refreshToken');
      Configuration.accessKeys.username = 'refreshedUser';
    });

    afterEach(() => {
      Register.refreshAuthToken.mockClear();
    });

    describe('when response is 401', () => {
      const errorResponse = {
        config: options,
        response: {
          status: 401,
        },
      };

      beforeEach(() => {
        axios.mockImplementationOnce(() => Promise.reject(errorResponse));
      });

      it('tries to refresh access tokens', async () => {
        expect.assertions(3);

        const errorResponseRefreshToken = {
          response: {
            status: 400,
            data: {
              message: 'Invalid grant: refresh token has expired',
            },
          },
        };
        axios.mockImplementationOnce(() =>
          Promise.reject(errorResponseRefreshToken),
        );

        try {
          await Requester.execute(options);
        } catch (e) {
          expect(Register.refreshAuthToken).toHaveBeenCalledTimes(1);
          expect(e.response.status).toBe(400);
          expect(axios).toHaveBeenCalledTimes(2);
        }
      });

      describe('with refreshed tokens', () => {
        beforeEach(() => {
          axios.mockImplementationOnce(() =>
            Promise.resolve({
              data: {
                accessToken: 'updatedAccessToken',
                refreshToken: 'updatedRefreshToken',
              },
            }),
          );
        });

        it('stores updated tokens', async () => {
          await Requester.execute(options);

          expect(Configuration.accessKeys.oAuthTokens.accessToken).toBe(
            'updatedAccessToken',
          );
          expect(Configuration.accessKeys.oAuthTokens.refreshToken).toBe(
            'updatedRefreshToken',
          );
          expect(axios).toHaveBeenCalledTimes(3);
        });

        it('retries request with the updated access token', async () => {
          await Requester.execute(options);

          expect(axios).toHaveBeenCalledWith({
            ...options,
            headers: { Authorization: 'Bearer updatedAccessToken' },
          });
          expect(options.headers.Authorization).toBe('Bearer access');
        });
      });
    });

    it('returns a rejected promise when original request config is missing', async () => {
      const malformedError = {
        response: {
          statusCode: 401,
        },
      };

      axios.mockImplementationOnce(() => Promise.reject(malformedError));

      try {
        await Requester.execute(options);
      } catch (e) {
        expect(e).toBe(malformedError);
      }
    });

    it('returns a rejected promise when response is not 401', async () => {
      const anotherError = {
        response: {
          statusCode: 401,
        },
      };

      axios.mockImplementationOnce(() => Promise.reject(anotherError));

      try {
        await Requester.execute(options);
      } catch (e) {
        expect(e).toEqual(anotherError);
      }
    });
  });
});
