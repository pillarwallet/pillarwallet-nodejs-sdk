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
const connectionAcceptSchema = require('../schemas/connection/v2/accept.json');
const connectionRejectSchema = require('../schemas/connection/v2/reject.json');
const connectionCancelSchema = require('../schemas/connection/v2/cancel.json');
const connectionMuteSchema = require('../schemas/connection/v2/mute.json');
const connectionDisconnectSchema = require('../schemas/connection/v2/disconnect.json');
const connectionBlockSchema = require('../schemas/connection/v2/block.json');
const connectionBlacklistSchema = require('../schemas/connection/v2/blacklist.json');

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

  /**
   * @name accept
   * @desc Accepts a connection invitation from another user
   * @param {ConnectionAcceptV2} acceptConfiguration
   * @returns {AxiosPromise}
   */
  accept(acceptConfiguration: ConnectionAcceptV2): AxiosPromise {
    return this.executeRequest({
      data: acceptConfiguration,
      defaultRequest: postConfiguration,
      schema: connectionAcceptSchema,
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.CONNECTION_ACCEPT_V2
      }`,
    });
  }

  /**
   * @name reject
   * @desc Reject a connection invitation from another user
   * @param {ConnectionRejectV2} rejectConfiguration
   * @returns {AxiosPromise}
   */
  reject(rejectConfiguration: ConnectionRejectV2): AxiosPromise {
    return this.executeRequest({
      data: rejectConfiguration,
      defaultRequest: postConfiguration,
      schema: connectionRejectSchema,
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.CONNECTION_REJECT_V2
      }`,
    });
  }

  /**
   * @name cancel
   * @desc Cancels a connection invitation that a user previously initiated
   * @param {ConnectionCancelV2} inviteConfiguration
   * @returns {AxiosPromise}
   */
  cancel(cancelConfiguration: ConnectionCancelV2): AxiosPromise {
    return this.executeRequest({
      data: cancelConfiguration,
      defaultRequest: postConfiguration,
      schema: connectionCancelSchema,
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.CONNECTION_CANCEL_V2
      }`,
    });
  }

  /**
   * @name mute
   * @desc Mutes another user
   * @param {ConnectionMuteV2} muteConfiguration
   * @returns {AxiosPromise}
   */
  mute(muteConfiguration: ConnectionMuteV2): AxiosPromise {
    return this.executeRequest({
      data: muteConfiguration,
      defaultRequest: postConfiguration,
      schema: connectionMuteSchema,
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.CONNECTION_MUTE_V2
      }`,
    });
  }

  /**
   * @name block
   * @desc Blocks another user
   * @param {ConnectionBlockV2} blockConfiguration
   * @returns {AxiosPromise}
   */
  block(blockConfiguration: ConnectionBlockV2): AxiosPromise {
    return this.executeRequest({
      data: blockConfiguration,
      defaultRequest: postConfiguration,
      schema: connectionBlockSchema,
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.CONNECTION_BLOCK_V2
      }`,
    });
  }

  /**
   * @name blacklist
   * @desc Blacklists another user
   * @param {ConnectionBlacklistV2} blacklistConfiguration
   * @returns {AxiosPromise}
   */
  blacklist(blacklistConfiguration: ConnectionBlacklistV2): AxiosPromise {
    return this.executeRequest({
      data: blacklistConfiguration,
      defaultRequest: postConfiguration,
      schema: connectionBlacklistSchema,
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.CONNECTION_BLACKLIST_V2
      }`,
    });
  }

  /**
   * @name disconnect
   * @desc Disconnects a connection between two users
   * @param {ConnectionDisconnectV2} disconnectConfiguration
   * @returns {AxiosPromise}
   */
  disconnect(disconnectConfiguration: ConnectionDisconnectV2): AxiosPromise {
    return this.executeRequest({
      data: disconnectConfiguration,
      defaultRequest: postConfiguration,
      schema: connectionDisconnectSchema,
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.CONNECTION_DISCONNECT_V2
      }`,
    });
  }
}
