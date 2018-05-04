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
import * as Ajv from 'ajv';

const connectionInviteSchema = require('../schemas/connection/invite.json');
const connectionAcceptSchema = require('../schemas/connection/accept.json');
const connectionRejectSchema = require('../schemas/connection/reject.json');
const connectionCancelSchema = require('../schemas/connection/cancel.json');
const connectionBlockSchema = require('../schemas/connection/block.json');
const connectionMuteSchema = require('../schemas/connection/mute.json');

let ajv: any;

export class Connection extends Configuration {

  constructor() {
    super();

    ajv = new Ajv({
      allErrors: true,
    });
  }

  invite(inviteConfiguration: ConnectionInvite) {
    const valid = ajv.validate(connectionInviteSchema, inviteConfiguration);
    if (!valid && ajv.errors) {
      throw new TypeError(ajv.errorsText(ajv.errors));
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
    const valid = ajv.validate(connectionAcceptSchema, acceptConfiguration);
    if (!valid && ajv.errors) {
      throw new TypeError(ajv.errorsText(ajv.errors));
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
    const valid = ajv.validate(connectionRejectSchema, rejectConfiguration);
    if (!valid && ajv.errors) {
      throw new TypeError(ajv.errorsText(ajv.errors));
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
    const valid = ajv.validate(connectionCancelSchema, cancelConfiguration);
    if (!valid && ajv.errors) {
      throw new TypeError(ajv.errorsText(ajv.errors));
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
    const valid = ajv.validate(connectionBlockSchema, blockConfiguration);
    if (!valid && ajv.errors) {
      throw new TypeError(ajv.errorsText(ajv.errors));
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
    const valid = ajv.validate(connectionMuteSchema, muteConfiguration);
    if (!valid && ajv.errors) {
      throw new TypeError(ajv.errorsText(ajv.errors));
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
