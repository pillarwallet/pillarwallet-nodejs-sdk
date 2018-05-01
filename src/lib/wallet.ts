import {Requester} from '../utils/requester';
import {RequestPromise} from 'request-promise';
import {default as walletConfiguration } from '../utils/requester-configurations/wallet-register';

export class Wallet {

    register(walletRegister: WalletRegister, privateKey: string): RequestPromise {
        // verify required parameter 'body' is not null or undefined
        const xAPISignature = Requester.sign(walletRegister,privateKey);
        // verify required parameter 'xAPISignature' is not null or undefined
        if (xAPISignature === null || xAPISignature === undefined) {
            throw new Error('Required parameter xAPISignature was null or undefined when calling createWallet.');
        }
        walletConfiguration.headers['X-API-Signature'] = xAPISignature;
        walletConfiguration.body = walletRegister;
        return Requester.execute(walletConfiguration);
    }

    dumpConfig() {
        console.log(this);
    }

    testFunction() {
        return 'hello';
    }
}