import {Requester} from '../utils/requester';
import {RequestPromise} from 'request-promise';
import {default as walletRegisterConfiguration } from '../utils/requester-configurations/wallet-register';
import {default as walletUpdateConfiguration } from '../utils/requester-configurations/wallet-update';
import { ErrorMessages } from './constants/errorMessages';

export class Wallet {

    register(walletRegister: WalletRegister, privateKey: string): RequestPromise {
        if (!walletRegister.publicKey || !walletRegister.fcmToken || !walletRegister.ethAddress) {
            throw new TypeError(ErrorMessages.MissingOrInvalidData);
        }

        const xAPISignature = Requester.sign(walletRegister, privateKey);
        if (!xAPISignature) {
            throw new Error(ErrorMessages.SigningError);
        }

        walletRegisterConfiguration.headers['X-API-Signature'] = xAPISignature;
        walletRegisterConfiguration.body = walletRegister;

        return Requester.execute(walletRegisterConfiguration);
    }

    update(walletUpdate: WalletUpdate, privateKey: string): RequestPromise {
        if (!walletUpdate.walletId || 
            !walletUpdate.fcmToken || 
            !walletUpdate.ethAddress || 
            !walletUpdate.signalRegistrationId
        ) {
            throw new TypeError(ErrorMessages.MissingOrInvalidData);
        }
        // verify required parameter 'body' is not null or undefined
        const xAPISignature = Requester.sign(walletUpdate,privateKey);
        // verify required parameter 'xAPISignature' is not null or undefined
        if (!xAPISignature) {
            throw new Error(ErrorMessages.SigningError);
        }
        walletUpdateConfiguration.headers['X-API-Signature'] = xAPISignature;
        walletUpdateConfiguration.body = walletUpdate;
        return Requester.execute(walletUpdateConfiguration);
    }
}
