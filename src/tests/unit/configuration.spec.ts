import { AxiosPromise } from 'axios';
import { Requester } from '../../utils/requester';
import { Configuration } from '../../lib/configuration';
import { HttpEndpoints } from '../../lib/constants/httpEndpoints';

describe('The Configuration Class', () => {
  let configuration: Configuration;
  let apiUrl: string;

  beforeEach(() => {
    configuration = new Configuration();
    configuration.initialise({ privateKey: 'onePrivateKey' });
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
      Requester.execute.mockRestore();
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
      expect(req.data).toEqual(data);
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
      expect(req.params).toEqual(params);
    });

    it('returns a promise when the request is made', () => {
      const res: AxiosPromise = configuration.executeRequest({
        data,
        schema,
        defaultRequest,
        url,
      });

      expect(res).toEqual(promise);
    });

    describe('when checkSignature is false', () => {
      it('executes the request without the `Authorization` header', () => {
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
          url: 'http://localhost:8080/user/validate',
          headers: {},
        });
      });
    });

    describe('when auth is true (default = false)', () => {
      it('executes the request with the `Authorization` header', () => {
        Configuration.accessToken = 'oneAccessToken';

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
          headers: { Authorization: 'Bearer: oneAccessToken' },
        });
      });
    });
  });
});
