import { Configuration } from '../../lib/configuration';
import { HttpEndpoints } from '../../lib/constants/httpEndpoints';
import { Requester } from '../../utils/requester';

let configuration: Configuration;

beforeEach(() => {
  configuration = new Configuration();
  configuration.initialise({});
});

describe('The Configuration Class: executeRequest method', () => {
  let data: any;
  let schema: object;
  let requestMethodConfiguration: any;
  let httpEndpoint: HttpEndpoints;
  let checkSignature: boolean;
  let promise: PromiseConstructor;

  beforeEach(() => {
    promise = Promise;
    data = { id: 'data' };
    schema = { id: 'schema' };
    requestMethodConfiguration = { id: 'request', headers: {} };
    httpEndpoint = HttpEndpoints.USER_VALIDATE;

    configuration.validation = jest.fn();
    jest.spyOn(Requester, 'execute').mockImplementation(() =>  promise);
  });

  afterEach(() => {
    Requester.execute.mockClear();
  });

  describe('when checkSignature is false', () => {
    let res: any;

    beforeEach(() => {
      checkSignature = false;
      res = configuration
        .executeRequest(data, schema, requestMethodConfiguration, httpEndpoint, checkSignature);
    });

    it('should valitate the schema', () => {
      expect(configuration.validation).toHaveBeenCalledWith(schema, data);
    });

    it('should enrich the request method configuration', () => {
      expect(requestMethodConfiguration).toEqual({
        data,
        id: 'request',
        url: 'http://localhost:8080/user/validate',
        headers: {},
      });
    });

    it('should execute the request', () => {
      expect(Requester.execute).toHaveBeenCalledWith(requestMethodConfiguration);
    });

    it('should return promise', () => {
      expect(res).toEqual(promise);
    });
  });

  describe('when checkSignature is true', () => {
    it('should enrich the request method configuration', () => {
      configuration.checkSignature = jest.fn().mockImplementation(() => 'signature');

      configuration.executeRequest(data, schema, requestMethodConfiguration, httpEndpoint);

      expect(requestMethodConfiguration).toEqual({
        data,
        id: 'request',
        url: 'http://localhost:8080/user/validate',
        headers: { 'X-API-Signature': 'signature' },
      });
    });
  });
});
