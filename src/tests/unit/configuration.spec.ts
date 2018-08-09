import { Configuration } from '../../lib/configuration';
import { HttpEndpoints } from '../../lib/constants/httpEndpoints';
import { Requester } from '../../utils/requester';
import { AxiosPromise } from 'axios';

describe('The Configuration Class', () => {
  let configuration: Configuration;
  let apiUrl: string;

  beforeEach(() => {
    configuration = new Configuration();
    configuration.initialise({});
    apiUrl = Configuration.accessKeys.apiUrl;
  });

  describe('executeRequest method', () => {
    const checkSignature: boolean = false;
    const data: any = { id: 'data' };
    const params: object = { id: 'params' };
    const schema: object = { id: 'schema' };
    const defaultRequest: any = {
      url: '',
      method: 'POST',
      headers: {},
    };
    let url: string;
    const promise: PromiseConstructor = Promise;

    beforeEach(() => {
      url = apiUrl + HttpEndpoints.USER_VALIDATE;
      jest.spyOn(configuration, 'validation').mockImplementationOnce(() => undefined);
      jest.spyOn(Requester, 'execute').mockImplementation(() =>  promise);
    });

    afterEach(() => {
      Requester.execute.mockRestore();
    });

    it('validates the schema', () => {
      configuration.executeRequest({
        data,
        schema,
        defaultRequest,
        url,
        checkSignature,
      });

      expect(configuration.validation).toHaveBeenCalledWith(schema, data);
    });

    it('validates `params` for GET requests', () => {
      configuration.executeRequest({
        params,
        schema,
        url,
        checkSignature,
        defaultRequest: { method: 'GET' },
      });

      expect(configuration.validation).toHaveBeenCalledWith(schema, params);
    });

    it('validates `data` for POST requests', () => {
      configuration.executeRequest({
        data,
        schema,
        url,
        checkSignature,
        defaultRequest: { method: 'POST' },
      });

      expect(configuration.validation).toHaveBeenCalledWith(schema, data);
    });

    it('validates `data` for PUT requests', () => {
      const data: object = { foo: 'bar' };

      configuration.executeRequest({
        data,
        schema,
        url,
        checkSignature,
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

      return configuration.executeRequest({
        data,
        schema,
        defaultRequest,
        url,
      }).catch((e) => {
        expect(e.message).toBe('Validation failed');
      });
    });

    it('does not mutate the default request configuration', () => {
      configuration.executeRequest({
        data,
        schema,
        defaultRequest,
        url,
        checkSignature,
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
        checkSignature,
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
        checkSignature,
        defaultRequest: { method: 'GET' },
      });

      const req = Requester.execute.mock.calls[0][0];
      expect(req.params).toBe(params);
    });

    it('returns a promise when the request is made', () => {
      const res: AxiosPromise = configuration.executeRequest({
        data,
        schema,
        defaultRequest,
        url,
        checkSignature,
      });

      expect(res).toEqual(promise);
    });

    describe('when checkSignature is false', () => {
      it('executes the request without the `X-API-Signature` header', () => {
        configuration.executeRequest({
          data,
          schema,
          defaultRequest,
          url,
          checkSignature,
        });

        expect(Requester.execute).toHaveBeenCalledWith({
          data,
          method: 'POST',
          url: 'http://localhost:8080/user/validate',
          headers: {},
        });
      });
    });

    describe('when checkSignature is true (default)', () => {
      it('exectutes the request with the `X-API-Signature` header', () => {
        jest.spyOn(configuration, 'checkSignature').mockImplementation(
          () => 'signature',
        );

        configuration.executeRequest({
          data,
          schema,
          defaultRequest,
          url,
        });

        expect(Requester.execute).toHaveBeenCalledWith({
          data,
          method: 'POST',
          url: 'http://localhost:8080/user/validate',
          headers: { 'X-API-Signature': 'signature' },
        });
      });
    });
  });
});
