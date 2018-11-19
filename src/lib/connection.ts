/**
 * Import required classes / libraries / constants
 */
import { Requester } from '../utils/requester';
import { HttpEndpoints } from '../lib/constants/httpEndpoints';
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
  constructor() {
    super();
  }

  /**
   * Creates a connection invitation for a user to create a relationship with another contact
   * @param {ConnectionInvite} inviteConfiguration
   * @returns {axios.AxiosPromise}
   */
  invite(inviteConfiguration: ConnectionInvite): AxiosPromise {
    this.validation(connectionInviteSchema, inviteConfiguration);

    postConfiguration.headers['X-API-Signature'] = this.checkSignature(
      inviteConfiguration,
      Configuration.accessKeys.privateKey,
    );
    postConfiguration.url =
      Configuration.accessKeys.apiUrl + HttpEndpoints.CONNECTION_INVITE;
    postConfiguration.data = inviteConfiguration;

    return Requester.execute(postConfiguration);
  }

  /**
   * Accept a connection invitation from another user
   * @param {ConnectionAccept} acceptConfiguration
   * @returns {axios.AxiosPromise}
   */
  accept(acceptConfiguration: ConnectionAccept): AxiosPromise {
    this.validation(connectionAcceptSchema, acceptConfiguration);

    postConfiguration.headers['X-API-Signature'] = this.checkSignature(
      acceptConfiguration,
      Configuration.accessKeys.privateKey,
    );
    postConfiguration.url =
      Configuration.accessKeys.apiUrl + HttpEndpoints.CONNECTION_ACCEPT;
    postConfiguration.data = acceptConfiguration;

    return Requester.execute(postConfiguration);
  }

  /**
   * Reject a connection invitation from another user
   * @param {ConnectionReject} rejectConfiguration
   * @returns {axios.AxiosPromise}
   */
  reject(rejectConfiguration: ConnectionReject): AxiosPromise {
    this.validation(connectionRejectSchema, rejectConfiguration);

    postConfiguration.headers['X-API-Signature'] = this.checkSignature(
      rejectConfiguration,
      Configuration.accessKeys.privateKey,
    );
    postConfiguration.url =
      Configuration.accessKeys.apiUrl + HttpEndpoints.CONNECTION_REJECT;
    postConfiguration.data = rejectConfiguration;

    return Requester.execute(postConfiguration);
  }

  /**
   * Cancels a connection invitation that a user previously initiated
   * @param {ConnectionCancel} cancelConfiguration
   * @returns {axios.AxiosPromise}
   */
  cancel(cancelConfiguration: ConnectionCancel): AxiosPromise {
    this.validation(connectionCancelSchema, cancelConfiguration);

    postConfiguration.headers['X-API-Signature'] = this.checkSignature(
      cancelConfiguration,
      Configuration.accessKeys.privateKey,
    );
    postConfiguration.url =
      Configuration.accessKeys.apiUrl + HttpEndpoints.CONNECTION_CANCEL;
    postConfiguration.data = cancelConfiguration;

    return Requester.execute(postConfiguration);
  }

  /**
   * Blocks a connection request from another user
   * @param {ConnectionBlock} blockConfiguration
   * @returns {axios.AxiosPromise}
   */
  block(blockConfiguration: ConnectionBlock): AxiosPromise {
    this.validation(connectionBlockSchema, blockConfiguration);

    postConfiguration.headers['X-API-Signature'] = this.checkSignature(
      blockConfiguration,
      Configuration.accessKeys.privateKey,
    );
    postConfiguration.url =
      Configuration.accessKeys.apiUrl + HttpEndpoints.CONNECTION_BLOCK;
    postConfiguration.data = blockConfiguration;

    return Requester.execute(postConfiguration);
  }

  /**
   * Mutes another user
   * @param {ConnectionMute} muteConfiguration
   * @returns {axios.AxiosPromise}
   */
  mute(muteConfiguration: ConnectionMute): AxiosPromise {
    this.validation(connectionMuteSchema, muteConfiguration);

    postConfiguration.headers['X-API-Signature'] = this.checkSignature(
      muteConfiguration,
      Configuration.accessKeys.privateKey,
    );
    postConfiguration.url =
      Configuration.accessKeys.apiUrl + HttpEndpoints.CONNECTION_MUTE;
    postConfiguration.data = muteConfiguration;

    return Requester.execute(postConfiguration);
  }

  /**
   * Disconnects a connection between two users
   * @param {ConnectionDisconnect} disconnectConfiguration
   * @returns {axios.AxiosPromise}
   */
  disconnect(disconnectConfiguration: ConnectionDisconnect): AxiosPromise {
    this.validation(connectionDisconnectSchema, disconnectConfiguration);

    postConfiguration.headers['X-API-Signature'] = this.checkSignature(
      disconnectConfiguration,
      Configuration.accessKeys.privateKey,
    );
    postConfiguration.url =
      Configuration.accessKeys.apiUrl + HttpEndpoints.CONNECTION_DISCONNECT;
      postConfiguration.data = disconnectConfiguration;

    return Requester.execute(postConfiguration);
  }
}
