import { Wallet } from './lib/wallet';
import { Asset } from './lib/asset';
import { Connection } from './lib/connection';
import { User } from './lib/user';

export class PillarSdk {
    static config: PillarSdkConfiguration;
    wallet: Wallet = new Wallet();
    asset: Asset = new Asset();
    connection: Connection = new Connection();
    user: User = new User();

    constructor(configuration: PillarSdkConfiguration) {
        PillarSdk.config = configuration;
    }

    dumpConfig() {
        console.log(PillarSdk);
    }
}