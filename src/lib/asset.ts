import {Requester} from '../utils/requester';
import {RequestPromise} from 'request-promise';
const auth = require('@pillarwallet/plr-auth-sdk');

export class Asset {

    defaults(walletId: number, privateKey: string): RequestPromise {
        const xAPISignature = auth.sign(privateKey,'secp256k1');
        // verify required parameter 'xAPISignature' is not null or undefined
        if (xAPISignature === null || xAPISignature === undefined) {
            throw new Error('Required parameter xAPISignature was null or undefined when calling createWallet.');
        }
        return Requester.defaults(xAPISignature,walletId);
    }

    dumpConfig() {
        console.log(this);
    }
}