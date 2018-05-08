import { Requester } from '../utils/requester';
import { HttpEndpoints } from '../lib/constants/httpEndpoints';
import { default as requestInviteConfiguration }
  from '../utils/requester-configurations/connections-invite';
import { default as requestAcceptConfiguration }
  from '../utils/requester-configurations/connections-accept';
import { default as requestRejectConfiguration }
  from '../utils/requester-configurations/connections-reject';
import { default as requestCancelConfiguration }
  from '../utils/requester-configurations/connections-cancel';
import { default as requestBlockConfiguration }
  from '../utils/requester-configurations/connections-block';
import { default as requestMuteConfiguration }
  from '../utils/requester-configurations/connections-mute';
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

    requestInviteConfiguration.headers['X-API-Signature'] =
    this.checkSignature(inviteConfiguration,Configuration.accessKeys.privateKey);
    requestInviteConfiguration.url = HttpEndpoints.BASE + HttpEndpoints.CONNECTION_INVITE;
    requestInviteConfiguration.body = inviteConfiguration;

    return Requester.execute(requestInviteConfiguration);
  }

  /**
   * Accept a connection invitation from another user
   * @param {ConnectionAccept} acceptConfiguration
   * @returns {requestPromise.RequestPromise}
   */
  accept(acceptConfiguration: ConnectionAccept) {
    this.validation(connectionAcceptSchema, acceptConfiguration);

    requestAcceptConfiguration.headers['X-API-Signature'] =
      this.checkSignature(acceptConfiguration,Configuration.accessKeys.privateKey);
    requestAcceptConfiguration.url = HttpEndpoints.BASE + HttpEndpoints.CONNECTION_ACCEPT;
    requestAcceptConfiguration.body = acceptConfiguration;

    return Requester.execute(requestAcceptConfiguration);
  }

  /**
   * Reject a connection invitation from another user
   * @param {ConnectionReject} rejectConfiguration
   * @returns {requestPromise.RequestPromise}
   */
  reject(rejectConfiguration: ConnectionReject) {
    this.validation(connectionRejectSchema, rejectConfiguration);

    requestRejectConfiguration.headers['X-API-Signature'] =
      this.checkSignature(rejectConfiguration,Configuration.accessKeys.privateKey);
    requestRejectConfiguration.url = HttpEndpoints.BASE + HttpEndpoints.CONNECTION_REJECT;
    requestRejectConfiguration.body = rejectConfiguration;

    return Requester.execute(requestRejectConfiguration);
  }

  /**
   * Cancels a connection invitation that a user previously initiated
   * @param {ConnectionCancel} cancelConfiguration
   * @returns {requestPromise.RequestPromise}
   */
  cancel(cancelConfiguration: ConnectionCancel) {
    this.validation(connectionCancelSchema, cancelConfiguration);

    requestCancelConfiguration.headers['X-API-Signature'] =
      this.checkSignature(cancelConfiguration,Configuration.accessKeys.privateKey);
    requestCancelConfiguration.url = HttpEndpoints.BASE + HttpEndpoints.CONNECTION_CANCEL;
    requestCancelConfiguration.body = cancelConfiguration;

    return Requester.execute(requestCancelConfiguration);
  }

  /**
   * Blocks a connection request from another user
   * @param {ConnectionBlock} blockConfiguration
   * @returns {requestPromise.RequestPromise}
   */
  block(blockConfiguration: ConnectionBlock) {
    this.validation(connectionBlockSchema, blockConfiguration);

    requestBlockConfiguration.headers['X-API-Signature'] =
      this.checkSignature(blockConfiguration,Configuration.accessKeys.privateKey);
    requestBlockConfiguration.url = HttpEndpoints.BASE + HttpEndpoints.CONNECTION_BLOCK;
    requestBlockConfiguration.body = blockConfiguration;

    return Requester.execute(requestBlockConfiguration);
  }

  /**
   * Mutes another user
   * @param {ConnectionMute} muteConfiguration
   * @returns {requestPromise.RequestPromise}
   */
  mute(muteConfiguration: ConnectionMute) {
    this.validation(connectionMuteSchema, muteConfiguration);

    requestMuteConfiguration.headers['X-API-Signature'] =
      this.checkSignature(muteConfiguration,Configuration.accessKeys.privateKey);
    requestMuteConfiguration.url = HttpEndpoints.BASE + HttpEndpoints.CONNECTION_MUTE;
    requestMuteConfiguration.body = muteConfiguration;

    return Requester.execute(requestMuteConfiguration);
  }
}
