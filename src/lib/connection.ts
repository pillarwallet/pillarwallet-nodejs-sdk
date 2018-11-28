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
const connectionInviteSchema = require('../schemas/connection/invite.json');
const connectionAcceptSchema = require('../schemas/connection/accept.json');
const connectionRejectSchema = require('../schemas/connection/reject.json');
const connectionCancelSchema = require('../schemas/connection/cancel.json');
const connectionBlockSchema = require('../schemas/connection/block.json');
const connectionMuteSchema = require('../schemas/connection/mute.json');
const connectionDisconnectSchema = require('../schemas/connection/disconnect.json');

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
}
