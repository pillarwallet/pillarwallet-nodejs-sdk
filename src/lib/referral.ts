/*
Copyright (C) 2021 Stiftung Pillar Project

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
const referralListSchema = require('../schemas/referral/list.json');
const referralGenerateTokenSchema = require('../schemas/referral/generateToken.json');
const referralSendInvitationSchema = require('../schemas/referral/sendInvitation.json');
const referralListCampaignsSchema = require('../schemas/referral/listCampaigns.json');

export class Referral extends Configuration {
  /**
   * @name list
   * @desc Returns a list of all referral invitations for the user
   * @param {ReferralList} data
   *
   * @returns {AxiosPromise}
   */
  list(params: ReferralList): AxiosPromise {
    return this.executeRequest({
      params,
      schema: referralListSchema,
      defaultRequest: getConfiguration,
      url: Configuration.accessKeys.apiUrl + HttpEndpoints.REFERRAL_LIST,
    });
  }

  /**
   * @name sendInvitation
   * @desc Sends an invitation through Email or SMS
   * @param {ReferralSendInvitation} data
   *
   * @returns {AxiosPromise}
   */
  sendInvitation(data: ReferralSendInvitation): AxiosPromise {
    return this.executeRequest({
      data,
      defaultRequest: postConfiguration,
      schema: referralSendInvitationSchema,
      url: `${Configuration.accessKeys.apiUrl}${HttpEndpoints.REFERRAL_INVITE}`,
    });
  }

  /**
   * @name generateToken
   * @desc Generates a referral token invitation
   * @param {GenerateToken} data
   *
   * @returns {AxiosPromise}
   */
  generateToken(data: GenerateToken): AxiosPromise {
    return this.executeRequest({
      data,
      defaultRequest: postConfiguration,
      schema: referralGenerateTokenSchema,
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.REFERRAL_GENERATE_TOKEN
      }`,
    });
  }

  /**
   * @name listCampaigns
   * @desc Returns a list of all referral campaigns
   * @param {ReferralListCampaigns} data
   *
   * @returns {AxiosPromise}
   */
  listCampaigns(params: ReferralListCampaigns): AxiosPromise {
    return this.executeRequest({
      params,
      schema: referralListCampaignsSchema,
      defaultRequest: getConfiguration,
      url:
        Configuration.accessKeys.apiUrl + HttpEndpoints.REFERRAL_LIST_CAMPAIGNS,
    });
  }
}
