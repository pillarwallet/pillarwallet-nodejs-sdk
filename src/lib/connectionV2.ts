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
/**
 * Import required classes / libraries / constants
 */
import { HttpEndpoints } from './constants/httpEndpoints';
import { Configuration } from './configuration';
import { AxiosPromise } from 'axios';

/**
 * Import HTTP Request Configurations
 */
import { default as postConfiguration } from '../utils/requester-configurations/post';

/**
 * Import Validation Schemas
 */
const connectionInviteSchema = require('../schemas/connection/v2/invite.json');

export class ConnectionV2 extends Configuration {
  /**
   * @name invite
   * @desc Creates a connection invitation for a user to create a relationship with another contact
   * @param {ConnectionInviteV2} inviteConfiguration
   * @returns {AxiosPromise}
   */
  invite(inviteConfiguration: ConnectionInviteV2): AxiosPromise {
    return this.executeRequest({
      data: inviteConfiguration,
      defaultRequest: postConfiguration,
      schema: connectionInviteSchema,
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.CONNECTION_INVITE_V2
      }`,
    });
  }
}
