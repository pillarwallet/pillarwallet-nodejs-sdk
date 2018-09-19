import { PillarSdk } from '../../../index';

describe('The Investment Class', () => {
  let pSdk: PillarSdk;

  beforeEach(() => {
    pSdk = new PillarSdk({
      privateKey:
        'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
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
