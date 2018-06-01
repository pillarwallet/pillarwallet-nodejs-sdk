import { Configuration } from './configuration';
import { Requester } from '../utils/requester';
import { RequestPromise } from 'request-promise';
import { default as getConfiguration } from '../utils/requester-configurations/get';
import { HttpEndpoints } from './constants/httpEndpoints';

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

    getConfiguration.headers['X-API-Signature'] =
      this.checkSignature(notificationList,Configuration.accessKeys.privateKey);
    getConfiguration.qs = notificationList;
    getConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.NOTIFICATION_LIST;

    return Requester.execute(getConfiguration);
  }
}
