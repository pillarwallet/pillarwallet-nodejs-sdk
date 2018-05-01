import { Wallet } from './lib/wallet';
import { Asset } from './lib/asset';

export class PillarSdk {

    static config: PillarSdkConfiguration;
    wallet: Wallet = new Wallet();
    asset: Asset = new Asset();


    constructor(configuration: PillarSdkConfiguration) {
        PillarSdk.config = configuration;
    }

    dumpConfig() {
        console.log(PillarSdk);
    }
}