import { PillarSdk } from '../../index';
import { Asset } from '../../lib/asset';
import { Connection } from '../../lib/connection';
import { Notification } from '../../lib/notification';
import { User } from '../../lib/user';
import { Wallet } from '../../lib/wallet';
import { Configuration } from '../../lib/configuration';
import { Investments } from '../../lib/investments';


describe('The Pillar SDK Class', () => {
  it('should correctly instantiate and expose all sub-classes', () => {
    const pSdk = new PillarSdk({
      apiUrl: 'http://localhost:8080',
      privateKey: 'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
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
        privateKey: 'aef23212dbaadfa322321231231313123131312312312312312312312312312a',
      });
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });

  it('should fail to call due invalid privatekey', () => {
    let errorThrown;
    try {
      new PillarSdk({
        apiUrl: 'http://localhost:8080',
        privateKey: 'increasethepeace',
      });
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});
