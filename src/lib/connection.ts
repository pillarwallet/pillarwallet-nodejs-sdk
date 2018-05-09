import { Requester } from '../utils/requester';
import { HttpEndpoints } from '../lib/constants/httpEndpoints';
import { default as postConfiguration } from '../utils/requester-configurations/post';
import { Configuration } from './configuration';

const connectionInviteSchema = require('../schemas/connection/invite.json');
const connectionAcceptSchema = require('../schemas/connection/accept.json');
const connectionRejectSchema = require('../schemas/connection/reject.json');
const connectionCancelSchema = require('../schemas/connection/cancel.json');
const connectionBlockSchema = require('../schemas/connection/block.json');
const connectionMuteSchema = require('../schemas/connection/mute.json');



export class Connection extends Configuration {

  constructor() {
    super();
  }

  /**
   * Creates a connection invitation for a user to create a relationship with another contact
   * @param {ConnectionInvite} inviteConfiguration
   * @returns {requestPromise.RequestPromise}
   */
  invite(inviteConfiguration: ConnectionInvite) {
    this.validation(connectionInviteSchema,inviteConfiguration);

    postConfiguration.headers['X-API-Signature'] =
    this.checkSignature(inviteConfiguration,Configuration.accessKeys.privateKey);
    postConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.CONNECTION_INVITE;
    postConfiguration.body = inviteConfiguration;

    return Requester.execute(postConfiguration);
  }

  /**
   * Accept a connection invitation from another user
   * @param {ConnectionAccept} acceptConfiguration
   * @returns {requestPromise.RequestPromise}
   */
  accept(acceptConfiguration: ConnectionAccept) {
    this.validation(connectionAcceptSchema, acceptConfiguration);

    postConfiguration.headers['X-API-Signature'] =
      this.checkSignature(acceptConfiguration,Configuration.accessKeys.privateKey);
    postConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.CONNECTION_ACCEPT;
    postConfiguration.body = acceptConfiguration;

    return Requester.execute(postConfiguration);
  }

  /**
   * Reject a connection invitation from another user
   * @param {ConnectionReject} rejectConfiguration
   * @returns {requestPromise.RequestPromise}
   */
  reject(rejectConfiguration: ConnectionReject) {
    this.validation(connectionRejectSchema, rejectConfiguration);

    postConfiguration.headers['X-API-Signature'] =
      this.checkSignature(rejectConfiguration,Configuration.accessKeys.privateKey);
    postConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.CONNECTION_REJECT;
    postConfiguration.body = rejectConfiguration;

    return Requester.execute(postConfiguration);
  }

  /**
   * Cancels a connection invitation that a user previously initiated
   * @param {ConnectionCancel} cancelConfiguration
   * @returns {requestPromise.RequestPromise}
   */
  cancel(cancelConfiguration: ConnectionCancel) {
    this.validation(connectionCancelSchema, cancelConfiguration);

    postConfiguration.headers['X-API-Signature'] =
      this.checkSignature(cancelConfiguration,Configuration.accessKeys.privateKey);
    postConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.CONNECTION_CANCEL;
    postConfiguration.body = cancelConfiguration;

    return Requester.execute(postConfiguration);
  }

  /**
   * Blocks a connection request from another user
   * @param {ConnectionBlock} blockConfiguration
   * @returns {requestPromise.RequestPromise}
   */
  block(blockConfiguration: ConnectionBlock) {
    this.validation(connectionBlockSchema, blockConfiguration);

    postConfiguration.headers['X-API-Signature'] =
      this.checkSignature(blockConfiguration,Configuration.accessKeys.privateKey);
    postConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.CONNECTION_BLOCK;
    postConfiguration.body = blockConfiguration;

    return Requester.execute(postConfiguration);
  }

  /**
   * Mutes another user
   * @param {ConnectionMute} muteConfiguration
   * @returns {requestPromise.RequestPromise}
   */
  mute(muteConfiguration: ConnectionMute) {
    this.validation(connectionMuteSchema, muteConfiguration);

    postConfiguration.headers['X-API-Signature'] =
      this.checkSignature(muteConfiguration,Configuration.accessKeys.privateKey);
    postConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.CONNECTION_MUTE;
    postConfiguration.body = muteConfiguration;

    return Requester.execute(postConfiguration);
  }
}
