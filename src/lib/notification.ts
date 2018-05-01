import {Requester} from '../utils/requester';
import {RequestPromise} from 'request-promise';
import {default as notificationListConfiguration} from '../utils/requester-configurations/notification-list';

export class Notification {

    list(notificationList: NotificationList,privateKey: string): RequestPromise {

        const xAPISignature = Requester.sign(notificationList, privateKey);
        // verify required parameter 'xAPISignature' is not null or undefined
        if (xAPISignature === null || xAPISignature === undefined) {
            throw new Error('Required parameter xAPISignature was null or undefined when calling createWallet.');
        }
        //config
        notificationListConfiguration.headers['X-API-Signature'] = xAPISignature;
        notificationListConfiguration.qs = notificationList;
        return Requester.execute(notificationListConfiguration);
    }

    dumpConfig() {
        console.log(this);
    }
}