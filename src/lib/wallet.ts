/*
Copyright (C) 2019 Stiftung Pillar Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/**
 * Import required classes / libraries / constants
 */
import { AxiosPromise, AxiosResponse } from 'axios';
import { v4 as uuidV4 } from 'uuid';
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
const smartWalletRegisterSchema = require('../schemas/wallet/smartWalletRegister.json');
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
    if (!walletRegister.publicKey && walletRegister.privateKey) {
      walletRegister.publicKey = PrivateKeyDerivatives.getPublicKey(
        walletRegister.privateKey,
      );
    }
    if (!walletRegister.ethAddress && walletRegister.privateKey) {
      walletRegister.ethAddress = PrivateKeyDerivatives.getEthAddress(
        walletRegister.privateKey,
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
   * @name registerSmartWallet
   * @desc Method to Register a second wallet in the Backend and register in BCX.
   * @param {SmartWalletRegister} smartWalletRegister
   * @returns {AxiosPromise}
   */
  registerSmartWallet(smartWalletRegister: SmartWalletRegister): AxiosPromise {
    return this.executeRequest({
      data: smartWalletRegister,
      defaultRequest: postConfiguration,
      schema: smartWalletRegisterSchema,
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.SMART_WALLET_REGISTER
      }`,
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
    const uuid = uuidV4();
    let registerAuthServerResponse;

    // Validating Input
    this.validation(walletRegisterAuthSchema, walletRegister);
    const { privateKey } = walletRegister;

    // Generate public key and address from private key.
    const publicKey = PrivateKeyDerivatives.getPublicKey(privateKey);
    const address = PrivateKeyDerivatives.getEthAddress(privateKey);

    // Generate code verifier
    const codeVerifier = await ProofKey.codeVerifierGenerator();

    let responseRegisterKeys;
    let responseRegisterAuth;

    try {
      // 1 step: Initiate registration - Send a UUID and public key, receive a short living nonce.
      responseRegisterKeys = await Register.registerKeys(publicKey, uuid);

      // 2 step: Request authorisation code - Send a UUID and public key, receive a short living nonce.
      // Use response data to create registerAuthPayload.
      const registerAuthPayload = {
        codeChallenge: ProofKey.codeChallengeGenerator(codeVerifier.toString()),
        ethAddress: address,
        fcmToken: walletRegister.fcmToken,
        username: walletRegister.username,
        nonce: responseRegisterKeys.data.nonce,
        uuid, // tslint:disable-line object-shorthand-properties-first
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
        uuid, // tslint:disable-line object-shorthand-properties-first
        authorizationCode: responseRegisterAuth.data.authorizationCode,
      };

      registerAuthServerResponse = await Register.registerAccess(
        registerAccessPayload,
        privateKey,
      );
    } catch (error) {
      throw error;
    }

    // Set auth Tokens
    const tokens = { ...registerAuthServerResponse.data };
    if (tokens.accessToken && tokens.refreshToken) {
      Configuration.setAuthTokens(tokens.accessToken, tokens.refreshToken);
    } else {
      throw new Error(
        'Refresh or access token returned empty from the server!',
      );
    }

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
