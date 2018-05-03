import { PillarSdk } from '../../index';
import { Asset } from '../../lib/asset';
import { Connection } from '../../lib/connection';
import { Notification } from '../../lib/notification';
import { User } from '../../lib/user';
import { Wallet } from '../../lib/wallet';
import { Configuration } from '../../lib/configuration';

describe('The Pillar SDK Class', () => {
  it('should correctly instantiate and expose all sub-classes', () => {
    const pSdk = new PillarSdk({
      sdkUri: 'http://localhost:8080', // currently not used
      publicKey: '123', // currently not used
    });

    expect(pSdk).toBeInstanceOf(PillarSdk);
    expect(pSdk.asset).toBeInstanceOf(Asset);
    expect(pSdk.connection).toBeInstanceOf(Connection);
    expect(pSdk.notification).toBeInstanceOf(Notification);
    expect(pSdk.user).toBeInstanceOf(User);
    expect(pSdk.wallet).toBeInstanceOf(Wallet);
    expect(pSdk.configuration).toBeInstanceOf(Configuration);
  });
});
