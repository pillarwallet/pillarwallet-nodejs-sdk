/**
 * Import required classes / libraries / constants
 */
import { AxiosPromise } from 'axios';
import { Configuration } from './configuration';
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
  /**
   * @name list
   * @desc Provides a list of notifications for a specific wallet user.
   * @param {NotificationList} notificationList
   * @returns {AxiosPromise}
   */
  list(notificationList: NotificationList): AxiosPromise {
    return this.executeRequest({
      defaultRequest: getConfiguration,
      schema: notificationListSchema,
      params: notificationList,
      url: `${Configuration.accessKeys.notificationsUrl}${
        HttpEndpoints.NOTIFICATION_LIST
      }`,
    });
  }
}
