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

/**
 * Import Validation Schemas
 */
const walletRegisterSchema = require('../schemas/wallet/register.json');
const walletUpdateSchema = require('../schemas/wallet/update.json');
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
    this.validation(walletRegisterSchema, walletRegister);

    // Signing Header
    postConfiguration.headers['X-API-Signature'] =
      this.checkSignature(walletRegister, Configuration.accessKeys.privateKey);

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

    this.validation(walletUpdateSchema, walletUpdate);

    postConfiguration.headers['X-API-Signature'] =
      this.checkSignature(walletUpdate, Configuration.accessKeys.privateKey);
    postConfiguration.data = walletUpdate;
    postConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.WALLET_UPDATE;

    return Requester.execute(postConfiguration);
  }

  /**
   * @name registerAddress
   * @description Register the specified blockchain address
   * for notifications and for BCX monitoring
   *
   * @param {WalletRegisterAddress} data
   * @returns {AxiosPromise}
   */
  registerAddress(data: WalletRegisterAddress): AxiosPromise {
    return this.executeRequest({
      data,
      schema: walletRegisterAddressSchema,
      defaultRequest: postConfiguration,
      url: Configuration.accessKeys.apiUrl + HttpEndpoints.WALLET_REGISTER_ADDRESS,
    });
  }

  /**
   * @name unregisterAddress
   * @description Unregister the specified blockchain address
   * for notifications and for BCX monitoring
   *
   * @param {UpdateNotificationPreferences} data
   * @returns {AxiosPromise}
   */
  unregisterAddress(data: UpdateNotificationPreferences): AxiosPromise {
    return this.executeRequest({
      data,
      schema: walletUnregisterAddressSchema,
      defaultRequest: postConfiguration,
      url: Configuration.accessKeys.apiUrl + HttpEndpoints.WALLET_UNREGISTER_ADDRESS,
    });
  }
}
