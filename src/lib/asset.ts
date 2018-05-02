import {Requester} from '../utils/requester';
import {RequestPromise} from 'request-promise';
import {default as defaultsConfiguration} from '../utils/requester-configurations/assets-defauts';
import {default as searchConfiguration} from '../utils/requester-configurations/assets-search';

export class Asset {

    defaults(assetDefaults: AssetDefaults, privateKey: string): RequestPromise {
        if (!assetDefaults.walletId) {
            throw new TypeError('Required data missing.');
        }

        const xAPISignature = Requester.sign(assetDefaults.walletId, privateKey);

        if (!xAPISignature) {
            throw new Error('Required parameter xAPISignature was null or undefined when calling createWallet.');
        }

        defaultsConfiguration.headers['X-API-Signature'] = xAPISignature;
        defaultsConfiguration.qs = assetDefaults;

        return Requester.execute(defaultsConfiguration);
    }

    search(assetSearch: AssetSearch,privateKey: string): RequestPromise {
        if (!assetSearch.walletId || !assetSearch.query) {
            throw new TypeError('Required data missing.');
        }

        const xAPISignature = Requester.sign(assetSearch,privateKey);

        if (!xAPISignature) {
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