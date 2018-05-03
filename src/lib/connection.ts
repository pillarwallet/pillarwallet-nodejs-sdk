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
import { ErrorMessages } from './constants/errorMessages';
import { Configuration } from './configuration';

export class Connection extends Configuration {

  constructor() {
    super();
  }

  invite(inviteConfiguration: ConnectionInvite) {
    if (!inviteConfiguration.accessKey ||
        !inviteConfiguration.targetUserId ||
        !inviteConfiguration.walletId) {
      throw new TypeError(ErrorMessages.MissingOrInvalidData);
    }
    const xAPISignature = Requester.sign(
      inviteConfiguration,
      Configuration.accessKeys.privateKey,
    );

    if (!xAPISignature) {
      throw new Error(ErrorMessages.SigningError);
    }

    requestInviteConfiguration.headers['X-API-Signature'] = xAPISignature;
    requestInviteConfiguration.url = HttpEndpoints.BASE + HttpEndpoints.CONNECTION_INVITE;
    requestInviteConfiguration.body = inviteConfiguration;

    return Requester.execute(requestInviteConfiguration);
  }

  accept(acceptConfiguration: ConnectionAccept) {
    if (!acceptConfiguration.walletId ||
        !acceptConfiguration.targetUserId ||
        !acceptConfiguration.sourceUserAccessKey ||
        !acceptConfiguration.targetUserAccessKey) {
      throw new TypeError(ErrorMessages.MissingOrInvalidData);
    }

    const xAPISignature = Requester.sign(
      acceptConfiguration,
      Configuration.accessKeys.privateKey,
    );

    if (!xAPISignature) {
      throw new Error(ErrorMessages.SigningError);
    }

    requestAcceptConfiguration.headers['X-API-Signature'] = xAPISignature;
    requestAcceptConfiguration.url = HttpEndpoints.BASE + HttpEndpoints.CONNECTION_ACCEPT;
    requestAcceptConfiguration.body = acceptConfiguration;

    return Requester.execute(requestAcceptConfiguration);
  }

  reject(rejectConfiguration: ConnectionReject) {
    if (!rejectConfiguration.accessKey ||
      !rejectConfiguration.targetUserId ||
      !rejectConfiguration.walletId) {
      throw new TypeError(ErrorMessages.MissingOrInvalidData);
    }
    const xAPISignature = Requester.sign(
      rejectConfiguration,
      Configuration.accessKeys.privateKey,
    );

    if (!xAPISignature) {
      throw new Error(ErrorMessages.SigningError);
    }

    requestRejectConfiguration.headers['X-API-Signature'] = xAPISignature;
    requestRejectConfiguration.url = HttpEndpoints.BASE + HttpEndpoints.CONNECTION_REJECT;
    requestRejectConfiguration.body = rejectConfiguration;

    return Requester.execute(requestRejectConfiguration);
  }

  cancel(cancelConfiguration: ConnectionCancel) {
    if (!cancelConfiguration.accessKey ||
      !cancelConfiguration.targetUserId ||
      !cancelConfiguration.walletId) {
      throw new TypeError(ErrorMessages.MissingOrInvalidData);
    }
    const xAPISignature = Requester.sign(
      cancelConfiguration,
      Configuration.accessKeys.privateKey,
    );

    if (!xAPISignature) {
      throw new Error(ErrorMessages.SigningError);
    }

    requestCancelConfiguration.headers['X-API-Signature'] = xAPISignature;
    requestCancelConfiguration.url = HttpEndpoints.BASE + HttpEndpoints.CONNECTION_CANCEL;
    requestCancelConfiguration.body = cancelConfiguration;

    return Requester.execute(requestCancelConfiguration);
  }

  block(blockConfiguration: ConnectionBlock) {
    if (!blockConfiguration.accessKey || !blockConfiguration.walletId) {
      throw new TypeError(ErrorMessages.MissingOrInvalidData);
    }

    const xAPISignature = Requester.sign(
      blockConfiguration,
      Configuration.accessKeys.privateKey,
    );

    if (!xAPISignature) {
      throw new Error(ErrorMessages.SigningError);
    }

    requestBlockConfiguration.headers['X-API-Signature'] = xAPISignature;
    requestBlockConfiguration.url = HttpEndpoints.BASE + HttpEndpoints.CONNECTION_BLOCK;
    requestBlockConfiguration.body = blockConfiguration;

    return Requester.execute(requestBlockConfiguration);
  }

  mute(muteConfiguration: ConnectionMute) {
    if (!muteConfiguration.accessKey || !muteConfiguration.walletId) {
      throw new TypeError(ErrorMessages.MissingOrInvalidData);
    }

    const xAPISignature = Requester.sign(
      muteConfiguration,
      Configuration.accessKeys.privateKey,
    );

    if (!xAPISignature) {
      throw new Error(ErrorMessages.SigningError);
    }

    requestMuteConfiguration.headers['X-API-Signature'] = xAPISignature;
    requestMuteConfiguration.url = HttpEndpoints.BASE + HttpEndpoints.CONNECTION_MUTE;
    requestMuteConfiguration.body = muteConfiguration;

    return Requester.execute(requestMuteConfiguration);
  }
}
