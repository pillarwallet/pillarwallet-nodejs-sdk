import {Requester} from '../utils/requester';
import {RequestPromise} from 'request-promise';
import {default as userUpdateConfiguration} from '../utils/requester-configurations/user-update';
import {default as userInfoConfiguration} from '../utils/requester-configurations/user-info';
import {default as userSearchConfiguration} from '../utils/requester-configurations/user-search';
import {default as userDeleteConfiguration} from '../utils/requester-configurations/user-delete';

export class User {

    update(userUpdate:UserUpdate,privateKey: string): RequestPromise {

        const xAPISignature = Requester.sign(userUpdate, privateKey);
        // verify required parameter 'xAPISignature' is not null or undefined
        if (xAPISignature === null || xAPISignature === undefined) {
            throw new Error('Required parameter xAPISignature was null or undefined when calling createWallet.');
        }
        //config
        userUpdateConfiguration.headers['X-API-Signature'] = xAPISignature;
        userUpdateConfiguration.body = userUpdate;
        return Requester.execute(userUpdateConfiguration);
    }

    info(userInfo:UserInfo,privateKey: string): RequestPromise {

        const xAPISignature = Requester.sign(userInfo, privateKey);
        // verify required parameter 'xAPISignature' is not null or undefined
        if (xAPISignature === null || xAPISignature === undefined) {
            throw new Error('Required parameter xAPISignature was null or undefined when calling createWallet.');
        }
        //config
        userInfoConfiguration.headers['X-API-Signature'] = xAPISignature;
        userInfoConfiguration.qs = userInfo;
        return Requester.execute(userInfoConfiguration);
    }

    search(userSearch:UserSearch,privateKey: string): RequestPromise {

        const xAPISignature = Requester.sign(userSearch, privateKey);
        // verify required parameter 'xAPISignature' is not null or undefined
        if (xAPISignature === null || xAPISignature === undefined) {
            throw new Error('Required parameter xAPISignature was null or undefined when calling createWallet.');
        }
        //config
        userSearchConfiguration.headers['X-API-Signature'] = xAPISignature;
        userSearchConfiguration.qs = userSearch;
        return Requester.execute(userSearchConfiguration);
    }

    delete(userDelete:UserDelete,privateKey: string): RequestPromise {

        const xAPISignature = Requester.sign(userDelete, privateKey);
        // verify required parameter 'xAPISignature' is not null or undefined
        if (xAPISignature === null || xAPISignature === undefined) {
            throw new Error('Required parameter xAPISignature was null or undefined when calling createWallet.');
        }
        //config
        userDeleteConfiguration.headers['X-API-Signature'] = xAPISignature;
        userDeleteConfiguration.body = userDelete;
        return Requester.execute(userDeleteConfiguration);
    }

    dumpConfig() {
        console.log(this);
    }
}