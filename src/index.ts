import { Wallet } from './lib/wallet';
import { Asset } from './lib/asset';
import { User } from './lib/user';
import { Notification } from './lib/notification'

export class PillarSdk {

    static config: PillarSdkConfiguration;
    wallet: Wallet = new Wallet();
    asset: Asset = new Asset();
    user: User = new User();
    notification : Notification = new Notification();

    constructor(configuration: PillarSdkConfiguration) {
        PillarSdk.config = configuration;
    }

    dumpConfig() {
        console.log(PillarSdk);
    }
}