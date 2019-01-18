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
import { default as postConfiguration } from '../utils/requester-configurations/post';

/**
 * Import Validation Schemas
 */
const userBadgesSchema = require('../schemas/badge/userBadges.json');
const selfAwardBadgeSchema = require('../schemas/badge/selfAwardBadge.json');

export class Badge extends Configuration {
  /**
   * @name my
   * @desc Returns a list of user badges.
   * @param {UserBadges} params
   * @returns {AxiosPromise}
   */
  my(params: UserBadges): AxiosPromise {
    return this.executeRequest({
      params,
      schema: userBadgesSchema,
      defaultRequest: getConfiguration,
      url: Configuration.accessKeys.apiUrl + HttpEndpoints.USER_BADGES,
    });
  }

  /**
   * @name selfAward
   * @desc Asks backend to award user with the badge.
   * @param {SelfAwardBadge} params
   * @returns {AxiosPromise}
   */
  selfAward(params: SelfAwardBadge): AxiosPromise {
    return this.executeRequest({
      data: params,
      schema: selfAwardBadgeSchema,
      defaultRequest: postConfiguration,
      url: Configuration.accessKeys.apiUrl + HttpEndpoints.SELF_AWARD_BADGE,
    });
  }
}
