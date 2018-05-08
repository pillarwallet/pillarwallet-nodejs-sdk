import { RequestPromise } from 'request-promise';

import { default as walletRegisterConfiguration }
    from '../utils/requester-configurations/wallet-register';
import { default as walletUpdateConfiguration }
    from '../utils/requester-configurations/wallet-update';
import { Configuration } from './configuration';
import { Requester } from '../utils/requester';
const walletRegisterSchema = require('../schemas/wallet/register.json');
const walletUpdateSchema = require('../schemas/wallet/update.json');

export class Wallet extends Configuration {

  constructor() {
    super();
  }

  /**
   * Method to Register the wallet in the Backend, create the UserProfile Table and register in BCX.
   * @param {WalletRegister} walletRegister
   * @returns {requestPromise.RequestPromise}
   */
  register(walletRegister: WalletRegister): RequestPromise {

    this.validation(walletRegisterSchema,walletRegister);

    walletRegisterConfiguration.headers['X-API-Signature'] =
      this.checkSignature(walletRegister,Configuration.accessKeys.privateKey);
    walletRegisterConfiguration.body = walletRegister;

    return Requester.execute(walletRegisterConfiguration);
  }

  /**
   * Method to update ethAddress and FcmToken in the Backend and to set signalRegistrationId.
   * @param {WalletUpdate} walletUpdate
   * @returns {requestPromise.RequestPromise}
   */
  update(walletUpdate: WalletUpdate): RequestPromise {

    this.validation(walletUpdateSchema,walletUpdate);

    walletUpdateConfiguration.headers['X-API-Signature'] =
      this.checkSignature(walletUpdate,Configuration.accessKeys.privateKey);
    walletUpdateConfiguration.body = walletUpdate;

    return Requester.execute(walletUpdateConfiguration);
  }
}
