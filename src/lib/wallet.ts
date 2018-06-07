/**
 * Import required classes / libraries / constants
 */
import { AxiosPromise } from 'axios';
import { Configuration } from './configuration';
import { Requester } from '../utils/requester';
import { HttpEndpoints } from './constants/httpEndpoints';
import { PrivateKeyDerivatives } from '../utils/private-key-derivatives';

/**
 * Import HTTP Request Configurations
 */
import { default as postConfiguration } from '../utils/requester-configurations/post';
import { default as getConfiguration } from '../utils/requester-configurations/get';

/**
 * Import Validation Schemas
 */
const walletRegisterSchema = require('../schemas/wallet/register.json');
const walletUpdateSchema = require('../schemas/wallet/update.json');
const walletValidateSchema = require('../schemas/wallet/validate.json');
const walletRegisterAddressSchema = require('../schemas/wallet/registerAddress.json');
const walletUnregisterAddressSchema = require('../schemas/wallet/unregisterAddress.json');

export class Wallet extends Configuration {

  constructor() {
    super();
  }

  /**
   * Method to Register the wallet in the Backend, create the UserProfile Table and register in BCX.
   * @param {WalletRegister} walletRegister
   * @returns {axios.AxiosPromise}
   */
  register(walletRegister: WalletRegister): AxiosPromise {
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

    postConfiguration.data = walletRegister;
    postConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.WALLET_REGISTER;
    // http request
    return Requester.execute(postConfiguration);
  }

  /**
   * Method to update ethAddress and FcmToken in the Backend and to set signalRegistrationId.
   * @param {WalletUpdate} walletUpdate
   * @returns {axios.AxiosPromise}
   */
  update(walletUpdate: WalletUpdate): AxiosPromise {

    this.validation(walletUpdateSchema,walletUpdate);

    postConfiguration.headers['X-API-Signature'] =
      this.checkSignature(walletUpdate,Configuration.accessKeys.privateKey);
    postConfiguration.data = walletUpdate;
    postConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.WALLET_UPDATE;

    return Requester.execute(postConfiguration);
  }

  /**
   * Validates that a user/wallet record exists and returns its status
   * @param {WalletValidate} walletValidate
   * @returns {axios.AxiosPromise}
   */
  validate(walletValidate: WalletValidate): AxiosPromise {

    this.validation(walletValidateSchema,walletValidate);

    getConfiguration.headers['X-API-Signature'] =
      this.checkSignature(walletValidate,Configuration.accessKeys.privateKey);
    getConfiguration.params = walletValidate;
    getConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.WALLET_VALIDATE;

    return Requester.execute(getConfiguration);
  }

  /**
   * Register the specified blockchain address for notifications and for BCX monitoring
   * @param {WalletRegisterAddress} walletRegisterAddress
   * @returns {axios.AxiosPromise}
   */
  registerAddress(walletRegisterAddress: WalletRegisterAddress): AxiosPromise {

    this.validation(walletRegisterAddressSchema,walletRegisterAddress);

    postConfiguration.headers['X-API-Signature'] =
      this.checkSignature(walletRegisterAddress,Configuration.accessKeys.privateKey);
    postConfiguration.data = walletRegisterAddress;
    postConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.WALLET_REGISTER_ADDRESS;

    return Requester.execute(postConfiguration);
  }

  /**
   * Unregister the specified blockchain address for notifications and for BCX monitoring
   * @param {WalletUnregisterAddress} walletUnregisterAddress
   * @returns {axios.AxiosPromise}
   */
  unregisterAddress(walletUnregisterAddress: WalletUnregisterAddress): AxiosPromise {

    this.validation(walletUnregisterAddressSchema,walletUnregisterAddress);

    postConfiguration.headers['X-API-Signature'] =
      this.checkSignature(walletUnregisterAddress,Configuration.accessKeys.privateKey);
    postConfiguration.data = walletUnregisterAddress;
    postConfiguration.url =
      Configuration.accessKeys.apiUrl + HttpEndpoints.WALLET_UNREGISTER_ADDRESS;

    return Requester.execute(postConfiguration);
  }
}
