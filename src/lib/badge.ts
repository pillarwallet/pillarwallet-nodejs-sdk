/*
Copyright (C) 2019 Stiftung Pillar Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
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
