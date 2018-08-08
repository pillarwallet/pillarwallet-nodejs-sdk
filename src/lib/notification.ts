/**
 * Import required classes / libraries / constants
 */
import { AxiosPromise } from 'axios';
import { Configuration } from './configuration';
import { Requester } from '../utils/requester';
import { HttpEndpoints } from './constants/httpEndpoints';

/**
 * Import HTTP Request Configurations
 */
import { default as getConfiguration } from '../utils/requester-configurations/get';

/**
 * Import Validation Schemas
 */
const notificationListSchema = require('../schemas/notification/list.json');

export class Notification extends Configuration {
  constructor() {
    super();
  }

  /**
   * Provides a list of notifications for a specific wallet user.
   * @param {NotificationList} notificationList
   * @returns {axios.AxiosPromise}
   */
  list(notificationList: NotificationList): AxiosPromise {
    this.validation(notificationListSchema, notificationList);

    getConfiguration.headers['X-API-Signature'] = this.checkSignature(
      notificationList,
      Configuration.accessKeys.privateKey,
    );
    getConfiguration.params = notificationList;
    getConfiguration.url =
      Configuration.accessKeys.notificationsUrl +
      HttpEndpoints.NOTIFICATION_LIST;

    return Requester.execute(getConfiguration);
  }
}
