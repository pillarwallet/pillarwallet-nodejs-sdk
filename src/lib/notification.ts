import { Configuration } from './configuration';

import { Requester } from '../utils/requester';
import { RequestPromise } from 'request-promise';
import { default as notificationListConfiguration }
    from '../utils/requester-configurations/notification-list';

const notificationListSchema = require('../schemas/notification/list.json');

export class Notification extends Configuration {

  constructor() {
    super();
  }

  /**
   * Provides a list of notifications for a specific wallet user.
   * @param {NotificationList} notificationList
   * @returns {requestPromise.RequestPromise}
   */
  list(notificationList: NotificationList): RequestPromise {

    this.validation(notificationListSchema,notificationList);

    notificationListConfiguration.headers['X-API-Signature'] =
      this.checkSignature(notificationList,Configuration.accessKeys.privateKey);
    notificationListConfiguration.qs = notificationList;

    return Requester.execute(notificationListConfiguration);
  }
}
