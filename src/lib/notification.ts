import { Requester } from '../utils/requester';
import { RequestPromise } from 'request-promise';
import { default as notificationListConfiguration }
    from '../utils/requester-configurations/notification-list';
import { ErrorMessages } from './constants/errorMessages';
import { Configuration } from './configuration';

export class Notification extends Configuration {

  constructor() {
    super();
  }

  list(notificationList: NotificationList): RequestPromise {
    if (!notificationList.fromTimestamp || !notificationList.walletId) {
      throw new TypeError(ErrorMessages.MissingOrInvalidData);
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
