import { PillarSdk } from '../..';
import { default as getConfiguration } from '../../utils/requester-configurations/get';
import { default as postConfiguration } from '../../utils/requester-configurations/post';
import { Requester } from '../../utils/requester';
import { Configuration } from '../../lib/configuration';

describe('Badge Class', () => {
  let pSdk: PillarSdk;

  const requesterExecuteSpy = jest
    .spyOn(Requester, 'execute')
    .mockResolvedValue('');
  const accesToken = 'myAccessToken';

  beforeEach(() => {
    pSdk = new PillarSdk({
      privateKey:
        'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
    });
  });

  afterEach(() => {
    requesterExecuteSpy.mockClear();
    Configuration.setAuthTokens('', '');
  });

  describe('.my', () => {
    it('should successfully call with valid data with key signature header', () => {
      const userBadgesData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.badge.my(userBadgesData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { 'X-API-Signature': expect.anything() },
        params: userBadgesData,
        url: 'http://localhost:8080/badge/my',
      });
    });

    it('should successfully call with valid data with Authorization header', () => {
      Configuration.setAuthTokens(accesToken, '');
      const userBadgesData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      };

      pSdk.badge.my(userBadgesData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith({
        ...getConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        params: userBadgesData,
        url: 'http://localhost:8080/badge/my',
      });
    });

    it('should throw an error if called with invalid data', async () => {
      const userBadgesData = {
        walletId: null,
      };

      try {
        await pSdk.badge.my(userBadgesData);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toEqual('data.walletId should be string');
      }
    });
  });

  describe('.selfAward', () => {
    it('should successfully call with valid data with key signature header', () => {
      const selfAwardBadgeData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        event: 'test-event',
      };

      pSdk.badge.selfAward(selfAwardBadgeData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { 'X-API-Signature': expect.anything() },
        data: selfAwardBadgeData,
        url: 'http://localhost:8080/badge/self-award',
      });
    });

    it('should successfully call with valid data with Authorization header', () => {
      Configuration.setAuthTokens(accesToken, '');
      const selfAwardBadgeData = {
        walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
        event: 'test-event',
      };

      pSdk.badge.selfAward(selfAwardBadgeData);

      expect(requesterExecuteSpy).toHaveBeenCalledWith({
        ...postConfiguration,
        headers: { Authorization: 'Bearer myAccessToken' },
        data: selfAwardBadgeData,
        url: 'http://localhost:8080/badge/self-award',
      });
    });

    it('should throw an error if called with invalid data', async () => {
      const selfAwardBadgeData = {
        walletId: null,
        event: null,
      };

      try {
        await pSdk.badge.selfAward(selfAwardBadgeData);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
        expect(e.message).toEqual(
          'data.walletId should be string, data.event should be string',
        );
      }
    });
  });
});
