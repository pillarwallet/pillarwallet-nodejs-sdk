import * as request from 'request-promise';
const auth = require('@pillarwallet/plr-auth-sdk');

export class Requester {
    static execute(incomingRequestOptions: any) {
        return request(incomingRequestOptions);
    }
}