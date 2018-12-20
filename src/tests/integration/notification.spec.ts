// tslint:disable: object-shorthand-properties-first
const keys = require('../utils/generateKeyPair');
import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

// TODO: Mock api using nock library
describe.skip('notification endpoints', () => {
  const requesterExecuteSpy: any = jest.spyOn(Requester, 'execute');
  let pSdk: PillarSdk;

  let walletId: string;
  const username = `User${Math.random()
    .toString(36)
    .substring(7)}`;
  // Key pairs
  const privateKey = keys.privateKey.toString();
  const walletRegister = {
    privateKey,
    fcmToken: '987qwe',
    username,
  };

  beforeAll(async () => {
    let response: any;
    pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
      notificationsUrl: 'http://localhost:8081',
      investmentsUrl: 'http://localhost:8082',
    });
    try {
      response = await pSdk.wallet.registerAuthServer(walletRegister);
      walletId = response.data.walletId;
    } catch (e) {
      throw e;
    }
  });

  afterEach(() => {
    requesterExecuteSpy.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('Notification list', () => {
    it('Expect success', async () => {
      const inputParams = {
        walletId,
        fromTimestamp: '2016-05-24T15:54:14.876Z',
        type: 'message',
        fetchLatest: true,
      };

      await pSdk.notification.list(inputParams);

      /**
       * TODO: Currently waiting on a development
       * or testing environment before we can asset
       * a correct / expected response. For now, just
       * using a spy to ensure that the request was made.
       */
      expect(requesterExecuteSpy).toHaveBeenCalled();
    });
  });
});
