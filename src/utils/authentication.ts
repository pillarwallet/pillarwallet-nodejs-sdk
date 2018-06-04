const authentication = require('@pillarwallet/plr-auth-sdk');

export class Authentication {
  /**
   * Call the Signature SDK
   * @param {Object} signParams
   * @param {string} privateKey
   * @returns {any}
   */
  static sign(signParams: Object, privateKey: string) {
    try {
      return authentication.sign(signParams, privateKey).signature;
    } catch (error) {
      return null;
    }
  }
}
