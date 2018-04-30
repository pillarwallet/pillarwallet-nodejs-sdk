import * as request from 'request-promise';
const auth = require('@pillarwallet/plr-auth-sdk');

import {HttpEndpoints} from '../lib/constants/httpEndpoints';
import {WalletRegisterParams} from "../models/walletRegisterParams";



export class Requester {

    static sign(SignParams: Object,privateKey: string) {
        return auth.sign(SignParams,privateKey, { curve: 'secp256k1' });
    }


    static register(signature: string, payload: WalletRegisterParams): request.RequestPromise {
        return request(HttpEndpoints.BASE + HttpEndpoints.WALLET_REGISTER, {
            method: 'POST',
            headers: {'X-API-Signature': signature},
            body: payload,
            json: true
        });
    }

    static defaults(signature: string, walletId: number): request.RequestPromise {
        return request(HttpEndpoints.BASE + HttpEndpoints.ASSET_DEFAULT, {
            method: 'GET',
            headers: {'X-API-Signature': signature},
            qs: {
                walletId: walletId,
            },
        });
    }
}