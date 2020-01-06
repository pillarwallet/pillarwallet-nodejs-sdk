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
import * as nock from 'nock';
import { Requester } from '../../utils/requester';
import { Configuration } from '../../lib/configuration';
import { HttpEndpoints } from '../../lib/constants/httpEndpoints';

describe('The Configuration Class', () => {
  let configuration: Configuration;
  let apiUrl: string;
  const accessToken = 'oneAccessToken';
  const refreshToken = 'oneRefreshToken';

  beforeEach(() => {
    configuration = new Configuration();
    configuration.initialise({});
    apiUrl = Configuration.accessKeys.apiUrl;
  });

  describe('executeRequest method', () => {
    const auth: boolean = false;
    const data: any = { id: 'data' };
    const params: object = { id: 'params' };
    const schema: object = { id: 'schema' };
    let defaultRequest: any;
    let url: string;
    const promise: PromiseConstructor = Promise;

    beforeEach(() => {
      defaultRequest = {
        url: '',
        method: 'POST',
        headers: {},
      };
      url = apiUrl + HttpEndpoints.USER_VALIDATE;
      jest
        .spyOn(configuration, 'validation')
        .mockImplementationOnce(() => undefined);
      jest.spyOn(Requester, 'execute').mockImplementation(() => promise);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('validates the schema', () => {
      configuration.executeRequest({
        data,
        schema,
        defaultRequest,
        url,
        auth,
      });

      expect(configuration.validation).toHaveBeenCalledWith(schema, data);
    });

    it('validates `params` for GET requests', () => {
      configuration.executeRequest({
        url,
        params,
        schema,
        defaultRequest: { method: 'GET' },
      });

      expect(configuration.validation).toHaveBeenCalledWith(schema, params);
    });

    it('validates `data` for POST requests', () => {
      configuration.executeRequest({
        url,
        data,
        schema,
        defaultRequest: { method: 'POST' },
      });

      expect(configuration.validation).toHaveBeenCalledWith(schema, data);
    });

    it('validates `data` for PUT requests', () => {
      const data: object = { foo: 'bar' };

      configuration.executeRequest({
        url,
        data,
        schema,
        defaultRequest: { method: 'PUT' },
      });

      expect(configuration.validation).toHaveBeenCalledWith(schema, data);
    });

    it('returns a promise when validation fails', async () => {
      expect.assertions(1);

      configuration.validation.mockReset();
      configuration.validation.mockImplementationOnce(() => {
        throw new Error('Validation failed');
      });

      return configuration
        .executeRequest({
          data,
          schema,
          defaultRequest,
          url,
        })
        .catch(e => {
          expect(e.message).toBe('Validation failed');
        });
    });

    it('does not mutate the default request configuration', () => {
      configuration.executeRequest({
        data,
        schema,
        defaultRequest,
        url,
        auth,
      });

      expect(defaultRequest).toEqual({
        url: '',
        method: 'POST',
        headers: {},
      });
    });

    it('adds `data` object to request', () => {
      configuration.executeRequest({
        data,
        schema,
        url,
        auth,
        defaultRequest: {
          url: '',
          method: 'POST',
          headers: {},
          data: {},
        },
      });

      const req = Requester.execute.mock.calls[0][0];
      expect(req.data).toBe(data);
    });

    it('adds `params` object to request', () => {
      const params: object = { foo: 'bar' };

      configuration.executeRequest({
        params,
        schema,
        url,
        auth,
        defaultRequest: { method: 'GET' },
      });

      const req = Requester.execute.mock.calls[0][0];
      expect(req.params).toBe(params);
    });

    it('returns a promise when the request is made', async () => {
      const res = await configuration.executeRequest({
        data,
        schema,
        defaultRequest,
        url,
      });

      expect(res).toEqual(promise);
    });

    describe('when auth is false (default = true)', () => {
      it('executes the request without headers', () => {
        configuration.executeRequest({
          data,
          schema,
          defaultRequest,
          url,
          auth,
        });

        expect(Requester.execute).toHaveBeenCalledWith({
          data,
          method: 'POST',
          url: 'https://localhost:8080/user/validate',
          headers: {},
        });
      });
    });

    describe('when auth is true (default)', () => {
      it('if there is an access token, then executes the request with the `Authorization` header', () => {
        Configuration.setAuthTokens(accessToken, '');
        configuration.executeRequest({
          data,
          schema,
          defaultRequest,
          url,
        });

        expect(Requester.execute).toHaveBeenCalledWith({
          data,
          method: 'POST',
          url: 'https://localhost:8080/user/validate',
          headers: { Authorization: 'Bearer oneAccessToken' },
        });
      });

      it('if there is NO access token, then executes the request without any header', () => {
        Configuration.setAuthTokens('', '');
        configuration.executeRequest({
          data,
          schema,
          defaultRequest,
          url,
        });

        expect(Requester.execute).toHaveBeenCalledWith({
          data,
          method: 'POST',
          url: 'https://localhost:8080/user/validate',
          headers: {},
        });
      });
    });

    it('returns an exception when request reaches timeout', async () => {
      Requester.execute.mockRestore();

      const mockApi = nock(apiUrl);
      mockApi
        .get(HttpEndpoints.USER_INFO)
        .delay(500)
        .reply(200, { someResponse: {} });

      const res = await configuration
        .executeRequest({
          data,
          schema,
          defaultRequest: {
            method: 'GET',
            timeout: 300,
          },
          url: apiUrl + HttpEndpoints.USER_INFO,
        })
        .then(response => response.data)
        .catch(error => ({ error }));

      expect(res).toEqual({ error: new Error('timeout of 300ms exceeded') });
    });

    it('does not return an exception if request does not reach timeout', async () => {
      Requester.execute.mockRestore();

      const mockApi = nock(apiUrl);
      mockApi
        .get(HttpEndpoints.USER_INFO)
        .delay(300)
        .reply(200, { someResponse: {} });

      const res = await configuration
        .executeRequest({
          data,
          schema,
          defaultRequest: {
            method: 'GET',
            timeout: 500,
          },
          url: apiUrl + HttpEndpoints.USER_INFO,
        })
        .then(response => response.data)
        .catch(error => ({ error }));

      expect(res).toEqual({ someResponse: expect.any(Object) });
    });
  });

  describe('getTokens method', () => {
    it('should return an object with empty properties', () => {
      const tokens = configuration.getTokens();
      expect(tokens).toEqual(null);
    });

    it('should return an object with the expected properties', () => {
      Configuration.setAuthTokens(accessToken, refreshToken);
      const tokens = configuration.getTokens();
      expect(tokens).toEqual({
        accessToken: 'oneAccessToken',
        refreshToken: 'oneRefreshToken',
      });
    });
  });
});
