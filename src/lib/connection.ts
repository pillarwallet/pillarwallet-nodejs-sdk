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
import { default as getConfiguration } from '../utils/requester-configurations/get';

/**
 * Import Validation Schemas
 */
const connectionInviteSchema = require('../schemas/connection/invite.json');
const connectionAcceptSchema = require('../schemas/connection/accept.json');
const connectionRejectSchema = require('../schemas/connection/reject.json');
const connectionCancelSchema = require('../schemas/connection/cancel.json');
const connectionBlockSchema = require('../schemas/connection/block.json');
const connectionMuteSchema = require('../schemas/connection/mute.json');
const connectionDisconnectSchema = require('../schemas/connection/disconnect.json');
const connectionCountSchema = require('../schemas/connection/count.json');

export class Connection extends Configuration {
  /**
   * @name invite
   * @desc Creates a connection invitation for a user to create a relationship with another contact
   * @param {ConnectionInvite} inviteConfiguration
   * @returns {AxiosPromise}
   */
  invite(inviteConfiguration: ConnectionInvite): AxiosPromise {
    return this.executeRequest({
      data: inviteConfiguration,
      defaultRequest: postConfiguration,
      schema: connectionInviteSchema,
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.CONNECTION_INVITE
      }`,
    });
  }

  /**
   * @name accept
   * @desc Accept a connection invitation from another user
   * @param {ConnectionAccept} acceptConfiguration
   * @returns {AxiosPromise}
   */
  accept(acceptConfiguration: ConnectionAccept): AxiosPromise {
    return this.executeRequest({
      data: acceptConfiguration,
      defaultRequest: postConfiguration,
      schema: connectionAcceptSchema,
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.CONNECTION_ACCEPT
      }`,
    });
  }

  /**
   * @name reject
   * @desc Reject a connection invitation from another user
   * @param {ConnectionReject} rejectConfiguration
   * @returns {AxiosPromise}
   */
  reject(rejectConfiguration: ConnectionReject): AxiosPromise {
    return this.executeRequest({
      data: rejectConfiguration,
      defaultRequest: postConfiguration,
      schema: connectionRejectSchema,
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.CONNECTION_REJECT
      }`,
    });
  }

  /**
   * @name cancel
   * @desc Cancels a connection invitation that a user previously initiated
   * @param {ConnectionCancel} cancelConfiguration
   * @returns {AxiosPromise}
   */
  cancel(cancelConfiguration: ConnectionCancel): AxiosPromise {
    return this.executeRequest({
      data: cancelConfiguration,
      defaultRequest: postConfiguration,
      schema: connectionCancelSchema,
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.CONNECTION_CANCEL
      }`,
    });
  }

  /**
   * @name block
   * @desc Blocks a connection request from another user
   * @param {ConnectionBlock} blockConfiguration
   * @returns {AxiosPromise}
   */
  block(blockConfiguration: ConnectionBlock): AxiosPromise {
    return this.executeRequest({
      data: blockConfiguration,
      defaultRequest: postConfiguration,
      schema: connectionBlockSchema,
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.CONNECTION_BLOCK
      }`,
    });
  }

  /**
   * @name mute
   * @desc Mutes another user
   * @param {ConnectionMute} muteConfiguration
   * @returns {AxiosPromise}
   */
  mute(muteConfiguration: ConnectionMute): AxiosPromise {
    return this.executeRequest({
      data: muteConfiguration,
      defaultRequest: postConfiguration,
      schema: connectionMuteSchema,
      url: `${Configuration.accessKeys.apiUrl}${HttpEndpoints.CONNECTION_MUTE}`,
    });
  }

  /**
   * @name disconnect
   * @desc Disconnects a connection between two users
   * @param {ConnectionDisconnect} disconnectConfiguration
   * @returns {AxiosPromise}
   */
  disconnect(disconnectConfiguration: ConnectionDisconnect): AxiosPromise {
    return this.executeRequest({
      data: disconnectConfiguration,
      defaultRequest: postConfiguration,
      schema: connectionDisconnectSchema,
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.CONNECTION_DISCONNECT
      }`,
    });
  }

  /**
   * @name count
   * @desc Returns the number of connections a user has
   * @param {ConnectionCount} countConfiguration
   * @returns {AxiosPromise}
   */
  count(params: ConnectionCount): AxiosPromise {
    return this.executeRequest({
      params,
      defaultRequest: getConfiguration,
      schema: connectionCountSchema,
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.CONNECTION_COUNT
      }`,
    });
  }
}
