import { createHash, randomBytes } from 'crypto';

/**
 * PKCE, pronounced “pixy” is an acronym for Proof Key for Code Exchange.
 * The key difference between the PKCE flow and the standard
 * Authorization Code flow is users aren’t required to provide a client_secret.
 * In place of the client_secret, the client app creates a unique string value,
 * code_verifier, which it hashes and encodes as a code_challenge.
 * When the client app initiates the first part of the Authorization Code flow, it sends a hashed code_challenge.
 * Once the user authenticates and the authorization code is returned to the client app,
 * it requests an access_token in exchange for the authorization code.
 * In this step, the client app must include the original unique string value in the code_verifier parameter.
 * If the codes match, the authentication is complete and an access_token is returned.
 */
export class ProofKey {
  private static base64URLEncode(buffer: Buffer) {
    return buffer
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private static sha256(string: string) {
    return createHash('sha256')
      .update(string)
      .digest();
  }

  /**
   * @description Method to generate a code_verifier.
   * @returns {string}
   */
  static codeVerifierGenerator() {
    return new Promise((resolve, reject) => {
      randomBytes(32, (err, buf) => {
        if (err) {
          return reject(err);
        }
        return resolve(this.base64URLEncode(buf).toString());
      });
    });
  }

  /**
   * @description Generate a code challenge from a code verifier.
   * @param {string} verifier
   * @returns {string}
   */
  static codeChallengeGenerator(verifier: string) {
    // return code_challenge
    return this.base64URLEncode(this.sha256(verifier));
  }
}
