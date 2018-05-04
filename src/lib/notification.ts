import { Configuration } from './configuration';
import * as Ajv from 'ajv';

import { Requester } from '../utils/requester';
import { RequestPromise } from 'request-promise';
import { default as notificationListConfiguration }
    from '../utils/requester-configurations/notification-list';
import { ErrorMessages } from './constants/errorMessages';
const notificationListSchema = require('../schemas/notification/list.json');

let ajv: any;

export class Notification extends Configuration {

  constructor() {
    super();

    ajv = new Ajv({
      allErrors: true,
    });
  }

  list(notificationList: NotificationList): RequestPromise {
    if (!notificationList.fromTimestamp || !notificationList.walletId) {
      throw new TypeError(ErrorMessages.MissingOrInvalidData);
    }

    const valid = ajv.validate(notificationListSchema, notificationList);
    if (!valid && ajv.errors) {
      throw new TypeError(ajv.errorsText(ajv.errors));
    }

    const xAPISignature = Requester.sign(
      notificationList,
      Configuration.accessKeys.privateKey,
    );

    if (!xAPISignature) {
      throw new Error(ErrorMessages.SigningError);
    }

    notificationListConfiguration.headers['X-API-Signature'] = xAPISignature;
    notificationListConfiguration.qs = notificationList;

    return Requester.execute(notificationListConfiguration);
  }
}
