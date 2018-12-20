import { PillarSdk } from '../../index';
import { Configuration } from '../../lib/configuration';
import { Asset } from '../../lib/asset';
import { Connection } from '../../lib/connection';
import { Notification } from '../../lib/notification';
import { User } from '../../lib/user';
import { Wallet } from '../../lib/wallet';
import { Investments } from '../../lib/investments';

describe('The Pillar SDK Class', () => {
  it('should correctly instantiate and expose all sub-classes', () => {
    const pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
      notificationsUrl: 'http://localhost:8081',
      investmentsUrl: 'http://localhost:8082',
    });

    expect(pSdk).toBeInstanceOf(PillarSdk);
    expect(pSdk.asset).toBeInstanceOf(Asset);
    expect(pSdk.connection).toBeInstanceOf(Connection);
    expect(pSdk.notification).toBeInstanceOf(Notification);
    expect(pSdk.user).toBeInstanceOf(User);
    expect(pSdk.wallet).toBeInstanceOf(Wallet);
    expect(pSdk.configuration).toBeInstanceOf(Configuration);
    expect(pSdk.investments).toBeInstanceOf(Investments);
  });

  it('should fail to call due invalid apiUrl', () => {
    let errorThrown;
    try {
      new PillarSdk({
        apiUrl: 'localhos8080',
      });
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });

  it('should fail to call privateKey', () => {
    let errorThrown;
    try {
      new PillarSdk({
        privateKey: 'increasethepeace',
      });
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});
