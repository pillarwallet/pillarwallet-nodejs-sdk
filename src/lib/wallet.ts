/**
 * Import required classes / libraries / constants
 */
import { AxiosPromise, AxiosResponse } from 'axios';
import { Configuration } from './configuration';
import { HttpEndpoints } from './constants/httpEndpoints';
import { PrivateKeyDerivatives } from '../utils/private-key-derivatives';
import { Register } from './register';
import { ProofKey } from '../utils/pkce';

/**
 * Import HTTP Request Configurations
 */
import { default as postConfiguration } from '../utils/requester-configurations/post';

/**
 * Import Validation Schemas
 */
const walletRegisterSchema = require('../schemas/wallet/register.json');
const walletRegisterAuthSchema = require('../schemas/wallet/registerAuthServer.json');
const walletUpdateSchema = require('../schemas/wallet/update.json');
const walletRegisterAddressSchema = require('../schemas/wallet/registerAddress.json');
const walletUnregisterAddressSchema = require('../schemas/wallet/unregisterAddress.json');

export class Wallet extends Configuration {
  /**
   * @name register
   * @desc Method to Register the wallet in the Backend, create the UserProfile Table and register in BCX.
   * @param {WalletRegister} walletRegister
   * @returns {AxiosPromise}
   */
  register(walletRegister: WalletRegister): AxiosPromise {
    // validating Input
    if (!walletRegister.publicKey) {
      walletRegister.publicKey = PrivateKeyDerivatives.getPublicKey(
        Configuration.accessKeys.privateKey,
      );
    }
    if (!walletRegister.ethAddress) {
      walletRegister.ethAddress = PrivateKeyDerivatives.getEthAddress(
        Configuration.accessKeys.privateKey,
      );
    }

    return this.executeRequest({
      schema: walletRegisterSchema,
      data: walletRegister,
      defaultRequest: postConfiguration,
      url: `${Configuration.accessKeys.apiUrl}${HttpEndpoints.WALLET_REGISTER}`,
    });
  }

  /**
   * @name registerAuthServer
   * @desc Method to Register the wallet in the Backend,
   * create the UserProfile Table and register in BCX.
   * @param {WalletRegister} walletRegister
   * @returns {AxiosPromise}
   */
  async registerAuthServer(
    walletRegister: WalletRegisterAuth,
  ): Promise<AxiosResponse> {
    let registerAuthServerResponse;

    // Validating Input
    this.validation(walletRegisterAuthSchema, walletRegister);
    const { privateKey } = walletRegister;

    // Generate public key and address from private key.
    const publicKey = PrivateKeyDerivatives.getPublicKey(privateKey);
    const address = PrivateKeyDerivatives.getEthAddress(privateKey);

    // Delete privateKey after usage
    delete walletRegister.privateKey;

    // Generate code verifier
    const codeVerifier = await ProofKey.codeVerifierGenerator();

    let responseRegisterKeys;
    let responseRegisterAuth;

    try {
      // 1 step: Initiate registration - Send a UUID and public key, receive a short living nonce.
      responseRegisterKeys = await Register.registerKeys(
        publicKey,
        Configuration.uuid,
      );

      // 2 step: Request authorisation code - Send a UUID and public key, receive a short living nonce.
      // Use response data to create registerAuthPayload.
      const registerAuthPayload = {
        codeChallenge: ProofKey.codeChallengeGenerator(codeVerifier.toString()),
        ethAddress: address,
        fcmToken: walletRegister.fcmToken,
        username: walletRegister.username,
        nonce: responseRegisterKeys.data.nonce,
        uuid: Configuration.uuid,
      };

      responseRegisterAuth = await Register.registerAuth(
        registerAuthPayload,
        privateKey,
      );

      // 3 step: Complete registration - Send code verfifer and UUID (used in previous requests).
      // Sign the payload and authorizationCode. Receive access and refresh tokens, FCM token, user ID and wallet ID.

      // Use responseRegisterAuth to create registerAccessPayload.
      const registerAccessPayload = {
        codeVerifier: codeVerifier.toString(),
        uuid: Configuration.uuid,
        authorizationCode: responseRegisterAuth.data.authorizationCode,
      };

      registerAuthServerResponse = await Register.registerAccess(
        registerAccessPayload,
        privateKey,
      );
    } catch (error) {
      throw error;
    }

    // Set oauth Tokens
    Configuration.refreshToken = registerAuthServerResponse.data.refreshToken;
    Configuration.accessToken = registerAuthServerResponse.data.accessToken;

    return registerAuthServerResponse;
  }

  /**
   * @name update
   * @desc Method to update ethAddress and FcmToken in the Backend and to set signalRegistrationId.
   * @param {WalletUpdate} walletUpdate
   * @returns {AxiosPromise}
   */
  update(walletUpdate: WalletUpdate): AxiosPromise {
    return this.executeRequest({
      data: walletUpdate,
      defaultRequest: postConfiguration,
      schema: walletUpdateSchema,
      url: `${Configuration.accessKeys.apiUrl}${HttpEndpoints.WALLET_UPDATE}`,
    });
  }

  /**
   * @name registerAddress
   * @desc Register the specified blockchain address
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
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.WALLET_REGISTER_ADDRESS
      }`,
    });
  }

  /**
   * @name unregisterAddress
   * @description Unregister the specified blockchain address
   * for notifications and for BCX monitoring
   *
   * @param {WalletUnregisterAddress} data
   * @returns {AxiosPromise}
   */
  unregisterAddress(data: WalletUnregisterAddress): AxiosPromise {
    return this.executeRequest({
      data,
      schema: walletUnregisterAddressSchema,
      defaultRequest: postConfiguration,
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.WALLET_UNREGISTER_ADDRESS
      }`,
    });
  }
}
