import {Requester} from '../utils/requester';
import {RequestPromise} from 'request-promise';
import {default as walletRegisterConfiguration } from '../utils/requester-configurations/wallet-register';
import {default as walletUpdateConfiguration } from '../utils/requester-configurations/wallet-update';

export class Wallet {

    register(walletRegister: WalletRegister, privateKey: string): RequestPromise {
        if (!walletRegister.publicKey || !walletRegister.fcmToken || !walletRegister.ethAddress) {
            throw new TypeError('Required data is missing.');
        }

        const xAPISignature = Requester.sign(walletRegister, privateKey);
        if (!xAPISignature) {
            throw new Error('There was a problem signing this request. Please check your credentials and try again.');
        }

        walletRegisterConfiguration.headers['X-API-Signature'] = xAPISignature;
        walletRegisterConfiguration.body = walletRegister;

        return Requester.execute(walletRegisterConfiguration);
    }

    update(walletUpdate: WalletUpdate, privateKey: string): RequestPromise {
        // verify required parameter 'body' is not null or undefined
        const xAPISignature = Requester.sign(walletUpdate,privateKey);
        // verify required parameter 'xAPISignature' is not null or undefined
        if (xAPISignature === null || xAPISignature === undefined) {
            throw new Error('Required parameter xAPISignature was null or undefined when calling createWallet.');
        }
        walletUpdateConfiguration.headers['X-API-Signature'] = xAPISignature;
        walletUpdateConfiguration.body = walletUpdate;
        return Requester.execute(walletUpdateConfiguration);
    }


    dumpConfig() {
        console.log(this);
    }

    testFunction() {
        return 'hello';
    }
}