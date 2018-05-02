import { Requester } from '../utils/requester';
import { HttpEndpoints } from '../lib/constants/httpEndpoints';
import { default as requestInviteConfiguration } from '../utils/requester-configurations/connections-invite';
import { default as requestAcceptConfiguration } from '../utils/requester-configurations/connections-accept';
import { default as requestRejectConfiguration } from '../utils/requester-configurations/connections-reject';
import { default as requestCancelConfiguration } from '../utils/requester-configurations/connections-cancel';
import { default as requestBlockConfiguration } from '../utils/requester-configurations/connections-block';
import { default as requestMuteConfiguration } from '../utils/requester-configurations/connections-mute';

export class Connection {

  constructor() {
    //
  }

  invite(inviteConfiguration: ConnectionInvite, privateKey: string) {
    if (!inviteConfiguration.accessKey ||
        !inviteConfiguration.targetUserId ||
        !inviteConfiguration.walletId) {
      throw new TypeError('Required data missing.');
    }
    const xAPISignature = Requester.sign(inviteConfiguration, privateKey);

    if (!xAPISignature) {
      throw new Error('Required parameter xAPISignature was null or undefined when calling connection.invite.');
    }

    requestInviteConfiguration.headers['X-API-Signature'] = xAPISignature;
    requestInviteConfiguration.url = HttpEndpoints.BASE + HttpEndpoints.CONNECTION_INVITE;
    requestInviteConfiguration.body = inviteConfiguration;

    return Requester.execute(requestInviteConfiguration);
  }

  accept(acceptConfiguration: ConnectionAccept, privateKey: string) {
    if (!acceptConfiguration.walletId ||
        !acceptConfiguration.targetUserId ||
        !acceptConfiguration.sourceUserAccessKey ||
        !acceptConfiguration.targetUserAccessKey) {
      throw new TypeError('Required data missing.');
    }

    const xAPISignature = Requester.sign(acceptConfiguration, privateKey);

    if (!xAPISignature) {
      throw new Error('Required parameter xAPISignature was null or undefined when calling connection.accept.');
    }

    requestAcceptConfiguration.headers['X-API-Signature'] = xAPISignature;
    requestAcceptConfiguration.url = HttpEndpoints.BASE + HttpEndpoints.CONNECTION_ACCEPT;
    requestAcceptConfiguration.body = acceptConfiguration;

    return Requester.execute(requestAcceptConfiguration);
  }

  reject(rejectConfiguration: ConnectionReject, privateKey: string) {
    if (!rejectConfiguration.accessKey ||
      !rejectConfiguration.targetUserId ||
      !rejectConfiguration.walletId) {
      throw new TypeError('Required data missing.');
    }
    const xAPISignature = Requester.sign(rejectConfiguration, privateKey);

    if (!xAPISignature) {
      throw new Error('Required parameter xAPISignature was null or undefined when calling connection.reject.');
    }

    requestRejectConfiguration.headers['X-API-Signature'] = xAPISignature;
    requestRejectConfiguration.url = HttpEndpoints.BASE + HttpEndpoints.CONNECTION_REJECT;
    requestRejectConfiguration.body = rejectConfiguration;

    return Requester.execute(requestRejectConfiguration);
  }

  cancel(cancelConfiguration: ConnectionCancel, privateKey: string) {
    if (!cancelConfiguration.accessKey ||
      !cancelConfiguration.targetUserId ||
      !cancelConfiguration.walletId) {
      throw new TypeError('Required data missing.');
    }
    const xAPISignature = Requester.sign(cancelConfiguration, privateKey);

    if (!xAPISignature) {
      throw new Error('Required parameter xAPISignature was null or undefined when calling connection.cancel.');
    }

    requestCancelConfiguration.headers['X-API-Signature'] = xAPISignature;
    requestCancelConfiguration.url = HttpEndpoints.BASE + HttpEndpoints.CONNECTION_CANCEL;
    requestCancelConfiguration.body = cancelConfiguration;

    return Requester.execute(requestCancelConfiguration);
  }

  block(blockConfiguration: ConnectionBlock, privateKey: string) {
    if (!blockConfiguration.accessKey || !blockConfiguration.walletId) {
      throw new TypeError('Required data missing.');
    }

    const xAPISignature = Requester.sign(blockConfiguration, privateKey);

    if (!xAPISignature) {
      throw new Error('Required parameter xAPISignature was null or undefined when calling connection.block.');
    }

    requestBlockConfiguration.headers['X-API-Signature'] = xAPISignature;
    requestBlockConfiguration.url = HttpEndpoints.BASE + HttpEndpoints.CONNECTION_BLOCK;
    requestBlockConfiguration.body = blockConfiguration;

    return Requester.execute(requestBlockConfiguration);
  }

  mute(muteConfiguration: ConnectionMute, privateKey: string) {
    if (!muteConfiguration.accessKey || !muteConfiguration.walletId) {
      throw new TypeError('Required data missing.');
    }

    const xAPISignature = Requester.sign(muteConfiguration, privateKey);

    if (!xAPISignature) {
      throw new Error('Required parameter xAPISignature was null or undefined when calling connection.mute.');
    }

    requestMuteConfiguration.headers['X-API-Signature'] = xAPISignature;
    requestMuteConfiguration.url = HttpEndpoints.BASE + HttpEndpoints.CONNECTION_MUTE;
    requestMuteConfiguration.body = muteConfiguration;

    return Requester.execute(requestMuteConfiguration);
  }
}