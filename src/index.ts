import { Wallet } from './lib/wallet';
import { Asset } from './lib/asset';
import { Connection } from './lib/connection';
import { User } from './lib/user';
import { Notification } from './lib/notification';
import { Configuration } from './lib/configuration';

export class PillarSdk extends Configuration {
  wallet: Wallet = new Wallet();
  asset: Asset = new Asset();
  connection: Connection = new Connection();
  user: User = new User();
  notification : Notification = new Notification();
  configuration: Configuration = new Configuration();

  constructor(incomingConfiguration: PillarSdkConfiguration) {
    super();

    this.configuration.initialise(incomingConfiguration);
  }
}
