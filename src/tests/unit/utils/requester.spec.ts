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
        expect.assertions(4);

        axios.mockImplementationOnce(() =>
          Promise.reject(new Error('Refresh token error')),
        );

        try {
          await Requester.execute(options);
        } catch (e) {
          expect(Register.refreshAuthToken).toHaveBeenCalledTimes(1);
          expect(e).toBeInstanceOf(Error);
          expect(e.message).toBe('Refresh token error');
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
        config: options,
        response: {
          statusCode: 400,
        },
      };

      axios.mockImplementationOnce(() => Promise.reject(anotherError));

      try {
        await Requester.execute(options);
      } catch (e) {
        expect(e).toBe(anotherError);
      }
    });
  });
});
