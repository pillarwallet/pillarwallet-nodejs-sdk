import * as request from 'request-promise';
const auth = require('@pillarwallet/plr-auth-sdk');

export class Requester {

    static sign(SignParams: Object,privateKey: string) {
        return auth.sign(SignParams,privateKey, { curve: 'secp256k1' });
    }

    static execute(incomingRequestOptions: any) {
        return request(incomingRequestOptions);
    }
}