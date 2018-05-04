import { Requester } from '../utils/requester';
import { RequestPromise } from 'request-promise';
import { default as walletRegisterConfiguration }
    from '../utils/requester-configurations/wallet-register';
import { default as walletUpdateConfiguration }
    from '../utils/requester-configurations/wallet-update';
import { ErrorMessages } from './constants/errorMessages';
import { Configuration } from './configuration';

import * as Ajv from 'ajv';

const walletRegisterSchema = require('../schemas/wallet/register.json');
const walletUpdateSchema = require('../schemas/wallet/update.json');

let ajv: any;

export class Wallet extends Configuration {

  constructor() {
    super();

    ajv = new Ajv({
      allErrors: true,
    });
  }

  register(walletRegister: WalletRegister): RequestPromise {
    const valid = ajv.validate(walletRegisterSchema, walletRegister);
    if (!valid && ajv.errors) {
      throw new TypeError(ajv.errorsText(ajv.errors));
    }

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
    const valid = ajv.validate(walletUpdateSchema, walletUpdate);
    if (!valid && ajv.errors) {
      throw new TypeError(ajv.errorsText(ajv.errors));
    }

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
