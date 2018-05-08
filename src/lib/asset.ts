import {Requester} from '../utils/requester';
import {RequestPromise} from 'request-promise';
import {default as defaultsConfiguration} from '../utils/requester-configurations/assets-defauts';
import {default as searchConfiguration} from '../utils/requester-configurations/assets-search';

export class Asset {

    defaults(assetDefaults: AssetDefaults,privateKey: string): RequestPromise {

        const xAPISignature = Requester.sign(assetDefaults.walletId, privateKey);
        // verify required parameter 'xAPISignature' is not null or undefined
        if (xAPISignature === null || xAPISignature === undefined) {
            throw new Error('Required parameter xAPISignature was null or undefined when calling createWallet.');
        }
        //config
        defaultsConfiguration.headers['X-API-Signature'] = xAPISignature;
        defaultsConfiguration.qs = assetDefaults;
        return Requester.execute(defaultsConfiguration);
    }

    search(assetSearch: AssetSearch,privateKey: string): RequestPromise {

        const xAPISignature = Requester.sign(assetSearch,privateKey);
        // verify required parameter 'xAPISignature' is not null or undefined
        if (xAPISignature === null || xAPISignature === undefined) {
            throw new Error('Required parameter xAPISignature was null or undefined when calling createWallet.');
        }
        searchConfiguration.headers['X-API-Signature'] = xAPISignature;
        searchConfiguration.qs = assetSearch;
        return Requester.execute(searchConfiguration);
    }

    dumpConfig() {
        console.log(this);
    }
}