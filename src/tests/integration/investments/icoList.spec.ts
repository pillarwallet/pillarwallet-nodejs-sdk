import { PillarSdk } from '../../../index';

// TODO: Mock api using nock library
describe.skip('The Investment Class', () => {
  let pSdk: PillarSdk;

  beforeEach(() => {
    pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
      notificationsUrl: 'http://localhost:8081',
      investmentsUrl: 'http://localhost:8082',
    });
  });

  describe('icoList method', () => {
    it('should return 200 with data Array', async () => {
      const inputParams = {
        userId: '56b540e9-927a-4ced-a1be-61b059f33f2b',
      };

      const res = await pSdk.investments.icoList(inputParams);

      expect(res.status).toBe(200);
      expect(res.data).toHaveProperty('result', 'success');
      expect(res.data.data).toBeInstanceOf(Array);
    });
  });
});
