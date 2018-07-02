import { Configuration } from '../../lib/configuration';
import { HttpEndpoints } from '../../lib/constants/httpEndpoints';
import { Requester } from '../../utils/requester';

let configuration: Configuration;

describe('The Configuration Class', () => {
  beforeEach(() => {
    configuration = new Configuration();
    configuration.initialise({});
  });

  describe('executeRequest method', () => {
    let data: any;
    let schema: object;
    let requestMethodConfiguration: any;
    let httpEndpoint: HttpEndpoints;
    let promise: PromiseConstructor;

    beforeEach(() => {
      promise = Promise;
      data = { id: 'data' };
      schema = { id: 'schema' };
      requestMethodConfiguration = { url: '', method: 'POST', headers: {} };
      httpEndpoint = HttpEndpoints.USER_VALIDATE;

      jest.spyOn(configuration, 'validation').mockImplementationOnce(() => undefined);
      jest.spyOn(Requester, 'execute').mockImplementation(() =>  promise);
    });

    afterEach(() => {
      Requester.execute.mockRestore();
    });

    it('validates the schema', () => {
      configuration.executeRequest(
        data,
        schema,
        requestMethodConfiguration,
        httpEndpoint,
        false,
      );
      expect(configuration.validation).toHaveBeenCalledWith(schema, data);
    });

    it('returns a promise when validation fails', async () => {
      expect.assertions(1);

      configuration.validation.mockReset();
      configuration.validation.mockImplementationOnce(() => {
        throw new Error('Validation failed');
      });

      return configuration.executeRequest(
        data,
        schema,
        requestMethodConfiguration,
        httpEndpoint,
        true,
      ).catch((e) => {
        expect(e.message).toBe('Validation failed');
      });
    });

    it('does not mutate the `requestMethodConfiguration` parameter', () => {
      configuration.executeRequest(
        data,
        schema,
        requestMethodConfiguration,
        httpEndpoint,
        false,
      );

      expect(requestMethodConfiguration).toEqual({
        url: '',
        method: 'POST',
        headers: {},
      });
    });

    it('returns a promise when the request is made', () => {
      const res: any = configuration.executeRequest(
        data,
        schema,
        requestMethodConfiguration,
        httpEndpoint,
        false,
      );

      expect(res).toEqual(promise);
    });

    describe('when checkSignature is false', () => {
      it('executes the request without the `X-API-Signature` header', () => {
        const checkSignature: boolean = false;

        configuration.executeRequest(
          data,
          schema,
          requestMethodConfiguration,
          httpEndpoint,
          checkSignature,
        );

        expect(Requester.execute).toHaveBeenCalledWith({
          data,
          method: 'POST',
          url: 'http://localhost:8080/user/validate',
          headers: {},
        });
      });
    });

    describe('when checkSignature is true', () => {
      it('exectutes the request with the `X-API-Signature` header', () => {
        jest.spyOn(configuration, 'checkSignature').mockImplementation(
          () => 'signature'
        );

        configuration.executeRequest(
          data,
          schema,
          requestMethodConfiguration,
          httpEndpoint,
        );

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
