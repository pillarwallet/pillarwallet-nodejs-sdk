import { RequestPromise } from 'request-promise';

import { default as postConfiguration } from '../utils/requester-configurations/post';
import { default as getConfiguration } from '../utils/requester-configurations/get';
import { Configuration } from './configuration';
import { Requester } from '../utils/requester';
import { HttpEndpoints } from './constants/httpEndpoints';
import { PrivateKeyDerivatives } from '../utils/private-key-derivatives';

const walletRegisterSchema = require('../schemas/wallet/register.json');
const walletUpdateSchema = require('../schemas/wallet/update.json');
const walletValidateSchema = require('../schemas/wallet/validate.json');

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
    // validating Input
    if (!walletRegister.publicKey) {
      walletRegister.publicKey = PrivateKeyDerivatives
        .getPublicKey(Configuration.accessKeys.privateKey);
    }
    if (!walletRegister.ethAddress) {
      walletRegister.ethAddress = PrivateKeyDerivatives
        .getEthAddress(Configuration.accessKeys.privateKey);
    }
    this.validation(walletRegisterSchema,walletRegister);

    // Signing Header
    postConfiguration.headers['X-API-Signature'] =
      this.checkSignature(walletRegister,Configuration.accessKeys.privateKey);

    postConfiguration.body = walletRegister;
    postConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.WALLET_REGISTER;
    // http request
    return Requester.execute(postConfiguration);
  }

  /**
   * Method to update ethAddress and FcmToken in the Backend and to set signalRegistrationId.
   * @param {WalletUpdate} walletUpdate
   * @returns {requestPromise.RequestPromise}
   */
  update(walletUpdate: WalletUpdate): RequestPromise {

    this.validation(walletUpdateSchema,walletUpdate);

    postConfiguration.headers['X-API-Signature'] =
      this.checkSignature(walletUpdate,Configuration.accessKeys.privateKey);
    postConfiguration.body = walletUpdate;
    postConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.WALLET_UPDATE;

    return Requester.execute(postConfiguration);
  }

  /**
   * Validates that a user/wallet record exists and returns its status
   * @param {WalletValidate} walletValidate
   * @returns {requestPromise.RequestPromise}
   */
  validate(walletValidate: WalletValidate): RequestPromise {

    this.validation(walletValidateSchema,walletValidate);

    getConfiguration.headers['X-API-Signature'] =
      this.checkSignature(walletValidate,Configuration.accessKeys.privateKey);
    getConfiguration.qs = walletValidate;
    getConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.WALLET_VALIDATE;

    return Requester.execute(getConfiguration);
  }

}
