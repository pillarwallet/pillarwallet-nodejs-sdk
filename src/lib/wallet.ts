import { Requester } from '../utils/requester';
import { RequestPromise } from 'request-promise';
import { default as walletRegisterConfiguration }
    from '../utils/requester-configurations/wallet-register';
import { default as walletUpdateConfiguration }
    from '../utils/requester-configurations/wallet-update';
import { ErrorMessages } from './constants/errorMessages';
import { Configuration } from './configuration';

export class Wallet extends Configuration {

  constructor() {
    super();
  }

  register(walletRegister: WalletRegister): RequestPromise {
    if (!walletRegister.publicKey || !walletRegister.fcmToken || !walletRegister.ethAddress) {
      throw new TypeError(ErrorMessages.MissingOrInvalidData);
    }

    const xAPISignature = Requester.sign(
      walletRegister,
      Configuration.accessKeys.privateKey,
    );

    if (!xAPISignature) {
      throw new Error(ErrorMessages.SigningError);
    }

    walletRegisterConfiguration.headers['X-API-Signature'] = xAPISignature;
    walletRegisterConfiguration.body = walletRegister;

    return Requester.execute(walletRegisterConfiguration);
  }

  update(walletUpdate: WalletUpdate): RequestPromise {
    if (!walletUpdate.walletId ||
        !walletUpdate.fcmToken ||
        !walletUpdate.ethAddress ||
        !walletUpdate.signalRegistrationId
    ) {
      throw new TypeError(ErrorMessages.MissingOrInvalidData);
    }

    const xAPISignature = Requester.sign(
      walletUpdate,
      Configuration.accessKeys.privateKey,
    );

    if (!xAPISignature) {
      throw new Error(ErrorMessages.SigningError);
    }

    walletUpdateConfiguration.headers['X-API-Signature'] = xAPISignature;
    walletUpdateConfiguration.body = walletUpdate;

    return Requester.execute(walletUpdateConfiguration);
  }
}
