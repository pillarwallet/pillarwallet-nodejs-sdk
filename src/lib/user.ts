/**
 * Import required classes / libraries / constants
 */
import { AxiosPromise } from 'axios';
import { Requester } from '../utils/requester';
import { Configuration } from './configuration';
import { HttpEndpoints } from './constants/httpEndpoints';

/**
 * Import HTTP Request Configurations
 */
import { default as deleteConfiguration } from '../utils/requester-configurations/delete';
import { default as postConfiguration } from '../utils/requester-configurations/post';
import { default as getConfiguration } from '../utils/requester-configurations/get';
import { default as putConfiguration } from '../utils/requester-configurations/put';

/**
 * Import Validation Schemas
 */
const userInfoSchema = require('../schemas/user/info.json');
const userUpdateSchema = require('../schemas/user/update.json');
const userDeleteSchema = require('../schemas/user/delete.json');
const userSearchSchema = require('../schemas/user/search.json');
const userCreateOneTimePasswordSchema = require('../schemas/user/create-one-time-password.json');
const userCreateVerifiedUserSchema = require('../schemas/user/create-verified-user.json');
const userUsernameSearchSchema = require('../schemas/user/username-search.json');
const userUpdateNotificationPreferencesSchema =
  require('../schemas/user/update-notification-preferences.json');
const userValidateEmailSchema = require('../schemas/user/validate-email.json');
const userValidatePhoneSchema = require('../schemas/user/validate-phone.json');

export class User extends Configuration {

  constructor() {
    super();
  }

  /**
   * Updates data elements on an existing wallet user.
   * @param {UserUpdate} userUpdate
   * @returns {axios.AxiosPromise}
   */
  update(userUpdate: UserUpdate): AxiosPromise {

    this.validation(userUpdateSchema, userUpdate);

    postConfiguration.headers['X-API-Signature'] =
      this.checkSignature(userUpdate, Configuration.accessKeys.privateKey);
    postConfiguration.data = userUpdate;
    postConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.USER_UPDATE;

    return Requester.execute(postConfiguration);
  }

  /**
   * Retrieve information on an existing wallet user
   * @param {UserInfo} userInfo
   * @returns {axios.AxiosPromise}
   */
  info(userInfo: UserInfo): AxiosPromise {

    this.validation(userInfoSchema, userInfo);

    getConfiguration.headers['X-API-Signature'] =
      this.checkSignature(userInfo, Configuration.accessKeys.privateKey);
    getConfiguration.params = userInfo;
    getConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.USER_INFO;

    return Requester.execute(getConfiguration);
  }

  /**
   * Provides a list of users that contain the search criteria in either their first name or last
   * name, and is not the current wallet user.
   * Also it performs a check if the search string term is at least 2 characters and if the user
   * allows their profile to be searched.
   * @param {UserSearch} userSearch
   * @returns {axios.AxiosPromise}
   */
  search(userSearch: UserSearch): AxiosPromise {

    this.validation(userSearchSchema, userSearch);

    getConfiguration.headers['X-API-Signature'] =
      this.checkSignature(userSearch, Configuration.accessKeys.privateKey);
    getConfiguration.params = userSearch;
    getConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.USER_SEARCH;

    return Requester.execute(getConfiguration);
  }

  /**
   * Remove an existing wallet user profile from the database
   * @param {UserDelete} userDelete
   * @returns {axios.AxiosPromise}
   */
  delete(userDelete: UserDelete): AxiosPromise {

    this.validation(userDeleteSchema, userDelete);

    deleteConfiguration.headers['X-API-Signature'] =
      this.checkSignature(userDelete, Configuration.accessKeys.privateKey);
    deleteConfiguration.data = userDelete;
    deleteConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.USER_DELETE;

    return Requester.execute(deleteConfiguration);
  }

  /**
   * Create a pending wallet user upon alert from KYC service and email an invite to them
   * @param {UserCreateVerifiedUser} userCreateVerifiedUser
   * @returns {axios.AxiosPromise}
   */
  createVerifiedUser(userCreateVerifiedUser: UserCreateVerifiedUser): AxiosPromise {

    this.validation(userCreateVerifiedUserSchema, userCreateVerifiedUser);

    postConfiguration.headers['X-API-Signature'] =
      this.checkSignature(userCreateVerifiedUser, Configuration.accessKeys.privateKey);
    postConfiguration.data = userCreateVerifiedUser;
    postConfiguration.url =
      Configuration.accessKeys.apiUrl + HttpEndpoints.USER_CREATE_VERIFIED_USER;

    return Requester.execute(postConfiguration);
  }

  /**
   * Create a one-time password, store it on the user record, then send an email to the user
   * @param {UserCreateOneTimePassword} userCreateOneTimePassword
   * @returns {axios.AxiosPromise}
   */
  createOneTimePassword(userCreateOneTimePassword: UserCreateOneTimePassword): AxiosPromise {

    this.validation(userCreateOneTimePasswordSchema, userCreateOneTimePassword);

    postConfiguration.headers['X-API-Signature'] =
      this.checkSignature(userCreateOneTimePassword, Configuration.accessKeys.privateKey);
    postConfiguration.data = userCreateOneTimePassword;
    postConfiguration.url =
      Configuration.accessKeys.apiUrl + HttpEndpoints.USER_CREATE_ONE_TIME_PASSWORD;

    return Requester.execute(postConfiguration);
  }

  /**
   * Update data elements reflecting a user’s notification preferences
   * @param {UserUpdateNotificationPreferences} userUpdateNotificationPreferences
   * @returns {axios.AxiosPromise}
   */
  updateNotificationPreferences(
    userUpdateNotificationPreferences: UserUpdateNotificationPreferences,
  ): AxiosPromise {

    this.validation(userUpdateNotificationPreferencesSchema, userUpdateNotificationPreferences);

    putConfiguration.headers['X-API-Signature'] =
      this.checkSignature(userUpdateNotificationPreferences, Configuration.accessKeys.privateKey);
    putConfiguration.data = userUpdateNotificationPreferences;
    putConfiguration.url =
      Configuration.accessKeys.apiUrl + HttpEndpoints.USER_UPDATE_NOTIFICATION_PREFERENCES;

    return Requester.execute(putConfiguration);
  }

  /**
   * Retrieve the userId of an existing wallet useror return not-found
   * @param {UserUsernameSearch} userUsernameSearch
   * @returns {axios.AxiosPromise}
   */
  usernameSearch(userUsernameSearch: UserUsernameSearch): AxiosPromise {

    this.validation(userUsernameSearchSchema, userUsernameSearch);

    getConfiguration.headers['X-API-Signature'] =
      this.checkSignature(userUsernameSearch, Configuration.accessKeys.privateKey);
    getConfiguration.params = userUsernameSearch;
    getConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.USER_USERNAME_SEARCH;

    return Requester.execute(postConfiguration);
  }

  /**
   * Validate a one-time password that has been sent to a user’s email
   * @param {UserValidateEmail} userValidateEmail
   * @returns {axios.AxiosPromise}
   */
  userValidateEmail(userValidateEmail: UserValidateEmail): AxiosPromise {

    this.validation(userValidateEmailSchema, userValidateEmail);

    postConfiguration.headers['X-API-Signature'] =
      this.checkSignature(userValidateEmail, Configuration.accessKeys.privateKey);
    postConfiguration.data = userValidateEmail;
    postConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.USER_VALIDATE_EMAIL;

    return Requester.execute(postConfiguration);
  }

  /**
   * Validate a one-time password that has been sent to a user’s phone
   * @param {UserValidatePhone} userValidatePhone
   * @returns {axios.AxiosPromise}
   */
  userValidatePhone(userValidatePhone: UserValidatePhone): AxiosPromise {

    this.validation(userValidatePhoneSchema, userValidatePhone);

    postConfiguration.headers['X-API-Signature'] =
      this.checkSignature(userValidatePhone, Configuration.accessKeys.privateKey);
    postConfiguration.data = userValidatePhone;
    postConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.USER_VALIDATE_PHONE;

    return Requester.execute(postConfiguration);
  }

}
