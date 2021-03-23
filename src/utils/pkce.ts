/*
Copyright (C) 2021 Stiftung Pillar Project

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
