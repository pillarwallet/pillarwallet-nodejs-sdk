/**
 * Import required classes / libraries / constants
 */
import axios, { AxiosPromise } from 'axios';
import { Readable } from 'stream';
import * as formatters from '@pillarwallet/common-formatters';
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
const userInfoByIdSchema = require('../schemas/user/infoById.json');
const userUpdateSchema = require('../schemas/user/update.json');
const userDeleteSchema = require('../schemas/user/delete.json');
const userSearchSchema = require('../schemas/user/search.json');
const userUsernameSearchSchema = require('../schemas/user/username-search.json');
const userValidateSchema = require('../schemas/user/validate.json');
const profileImageSchema = require('../schemas/user/profileImage.json');
const deleteProfileImageSchema = require('../schemas/user/deleteProfileImage.json');
const uploadProfileImageSchema = require('../schemas/user/uploadProfileImage.json');
const updateNotificationPreferencesSchema = require('../schemas/user/userNotificationPreferences.json');
const imageByUserIdSchema = require('../schemas/user/imageByUserId.json');
const userCreateOneTimePasswordSchema = require('../schemas/user/createOneTimePassword.json');
const userValidateEmailSchema = require('../schemas/user/validateEmail.json');
const userValidatePhoneSchema = require('../schemas/user/validatePhone.json');

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

    postConfiguration.headers['X-API-Signature'] = this.checkSignature(
      userUpdate,
      Configuration.accessKeys.privateKey,
    );
    postConfiguration.data = userUpdate;
    postConfiguration.url =
      Configuration.accessKeys.apiUrl + HttpEndpoints.USER_UPDATE;

    return Requester.execute(postConfiguration);
  }

  /**
   * Retrieve information on an existing wallet user
   * @param {UserInfo} userInfo
   * @returns {axios.AxiosPromise}
   */
  info(userInfo: UserInfo): AxiosPromise {
    this.validation(userInfoSchema, userInfo);

    const config = {
      ...getConfiguration,
      params: userInfo,
      url: `${Configuration.accessKeys.apiUrl}${HttpEndpoints.USER_INFO}`,
    };

    config.headers['X-API-Signature'] = this.checkSignature(
      userInfo,
      Configuration.accessKeys.privateKey,
    );

    return Requester.execute(config);
  }

  /**
   * @name infoById
   * @description Provides the user data by the target user id and users access keys
   * @param {string} targetUserId
   * @param {UserInfoById} query
   * @returns {AxiosPromise}
   */
  infoById(targetUserId: string, query: UserInfoById): AxiosPromise {
    this.validation(userInfoByIdSchema, query);

    const config = {
      ...getConfiguration,
      url:
        Configuration.accessKeys.apiUrl +
        HttpEndpoints.USER_INFO_BY_ID +
        targetUserId,
      params: query,
    };

    config.headers['X-API-Signature'] = this.checkSignature(
      query,
      Configuration.accessKeys.privateKey,
    );

    return Requester.execute(config);
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

    const config = {
      ...getConfiguration,
      params: userSearch,
      url: `${Configuration.accessKeys.apiUrl}${HttpEndpoints.USER_SEARCH}`,
    };
    config.headers['X-API-Signature'] = this.checkSignature(
      userSearch,
      Configuration.accessKeys.privateKey,
    );

    return Requester.execute(config);
  }

  /**
   * Remove an existing wallet user profile from the database
   * @param {UserDelete} userDelete
   * @returns {axios.AxiosPromise}
   */
  delete(userDelete: UserDelete): AxiosPromise {
    this.validation(userDeleteSchema, userDelete);

    deleteConfiguration.headers['X-API-Signature'] = this.checkSignature(
      userDelete,
      Configuration.accessKeys.privateKey,
    );
    deleteConfiguration.data = userDelete;
    deleteConfiguration.url =
      Configuration.accessKeys.apiUrl + HttpEndpoints.USER_DELETE;

    return Requester.execute(deleteConfiguration);
  }

  /**
   * Retrieve the userId of an existing wallet useror return not-found
   * @param {UserUsernameSearch} userUsernameSearch
   * @returns {axios.AxiosPromise}
   */
  usernameSearch(userUsernameSearch: UserUsernameSearch): AxiosPromise {
    this.validation(userUsernameSearchSchema, userUsernameSearch);

    const config = {
      ...getConfiguration,
      params: userUsernameSearch,
      url: `${Configuration.accessKeys.apiUrl}${
        HttpEndpoints.USER_USERNAME_SEARCH
      }`,
    };

    return Requester.execute(config);
  }

  validate(data: UserValidate): AxiosPromise {
    return this.executeRequest({
      data,
      schema: userValidateSchema,
      defaultRequest: postConfiguration,
      url: Configuration.accessKeys.apiUrl + HttpEndpoints.USER_VALIDATE,
      checkSignature: false,
    });
  }

  profileImage(data: ProfileImage): AxiosPromise {
    this.validation(profileImageSchema, data);

    const config = {
      ...getConfiguration,
      url:
        Configuration.accessKeys.apiUrl +
        HttpEndpoints.USER_IMAGE +
        '/' +
        data.imageName,
      responseType: 'stream',
    };
    return Requester.execute(config);
  }

  uploadProfileImage(image: Readable, query: UploadProfileImage): AxiosPromise {
    this.validation(uploadProfileImageSchema, query);

    const config = {
      ...postConfiguration,
      url:
        Configuration.accessKeys.apiUrl +
        HttpEndpoints.USER_IMAGE +
        '?walletId=' +
        query.walletId,
      data: image,
    };
    config.headers['X-API-Signature'] = this.checkSignature(
      query,
      Configuration.accessKeys.privateKey,
    );

    return Requester.execute(config);
  }

  /**
   * @name uploadProfileImageFormData
   * @description Upload a profile image using form data
   * @param {string} walletId
   * @param {FormData} formData
   * @returns {AxiosPromise}
   */
  uploadProfileImageFormData(walletId: string, formData: any): AxiosPromise {
    // TODO validation
    // TODO unit tests

    /**
     * formData should contain `walletId` and `image` fields
     */

    const config = {
      method: 'POST',
      url: Configuration.accessKeys.apiUrl + HttpEndpoints.USER_IMAGE,
      headers: {
        'X-API-Signature': this.checkSignature(
          { walletId },
          Configuration.accessKeys.privateKey,
        ),
        'Content-Type': '',
      },
      data: formData,
    };

    /**
     * A FormData object from the browser should mean that the Content-Type
     * header is set correctly for the request
     *
     * This isn't the case for Node, it has to be set explicity
     * to run the integration tests
     *
     * https://github.com/axios/axios/issues/318 has some useful information
     *
     * TODO Figure out a better way to do this,
     * i.e. integration tests should run from a browser/browser-like environment
     */
    if (formData._boundary) {
      config.headers['Content-Type'] = `multipart/form-data; boundary=${
        formData._boundary
      }`;
    } else {
      delete config.headers['Content-Type'];
    }

    return Requester.execute(config);
  }

  deleteProfileImage(data: DeleteProfileImage): AxiosPromise {
    return this.executeRequest({
      data,
      schema: deleteProfileImageSchema,
      defaultRequest: deleteConfiguration,
      url: Configuration.accessKeys.apiUrl + HttpEndpoints.USER_IMAGE,
    });
  }

  /**
   * @name imageByUserId
   * @description Get user's profile image using user's ID
   * @param {ImageByUserId} data
   * @returns {AxiosPromise}
   */
  imageByUserId(data: ImageByUserId): AxiosPromise {
    try {
      this.validation(imageByUserIdSchema, data);
    } catch (e) {
      return Promise.reject(e);
    }

    const query = {
      walletId: data.walletId,
    };

    const config = {
      ...getConfiguration,
      url:
        `${Configuration.accessKeys.apiUrl}` +
        `${HttpEndpoints.USER_IMAGE_BY_USER_ID}/${data.userId}`,
      params: query,
    };
    config.headers['X-API-Signature'] = this.checkSignature(
      query,
      Configuration.accessKeys.privateKey,
    );

    return Requester.execute(config);
  }

  /**
   * @name createOneTimePassword
   * @description Create a one-time password for email or phone,
   * store it on the user record,
   * then send an email or SMS to the user
   * @param {UserCreateOneTimePassword} data
   * @returns {AxiosPromise}
   */
  createOneTimePassword(data: UserCreateOneTimePassword): AxiosPromise {
    const formattedPhone: string | undefined = formatters.phone(data.phone);
    const formattedData: UserCreateOneTimePassword = formattedPhone
      ? { ...data, phone: formattedPhone }
      : { ...data };

    return this.executeRequest({
      data: formattedData,
      schema: userCreateOneTimePasswordSchema,
      defaultRequest: postConfiguration,
      url:
        Configuration.accessKeys.apiUrl +
        HttpEndpoints.USER_CREATE_ONE_TIME_PASSWORD,
    });
  }

  /**
   * @name validateEmail
   * @description Validate a one-time password sent via email
   * @param {UserValidateEmail} data
   * @returns {AxiosPromise}
   */
  validateEmail(data: UserValidateEmail): AxiosPromise {
    return this.executeRequest({
      data,
      schema: userValidateEmailSchema,
      defaultRequest: postConfiguration,
      url: Configuration.accessKeys.apiUrl + HttpEndpoints.USER_VALIDATE_EMAIL,
    });
  }

  /**
   * @name validatePhone
   * @description Validate a one-time password sent via SMS
   * @param {UserValidatePhone} userValidatePhone
   * @returns {AxiosPromise}
   */
  validatePhone(userValidatePhone: UserValidatePhone): AxiosPromise {
    const formattedPhone: string = formatters.phone(userValidatePhone.phone);
    const data = { ...userValidatePhone, phone: formattedPhone };

    return this.executeRequest({
      data,
      schema: userValidatePhoneSchema,
      defaultRequest: postConfiguration,
      url: Configuration.accessKeys.apiUrl + HttpEndpoints.USER_VALIDATE_PHONE,
    });
  }

  /**
   * @name updateNotificationPreferences
   * @description Update notification preferences for given user
   *
   * @param {UpdateNotificationPreferences} data
   * @returns {AxiosPromise}
   */
  updateNotificationPreferences(
    data: UpdateNotificationPreferences,
  ): AxiosPromise {
    return this.executeRequest({
      data,
      schema: updateNotificationPreferencesSchema,
      defaultRequest: putConfiguration,
      url:
        Configuration.accessKeys.apiUrl +
        HttpEndpoints.USER_NOTIFICATION_PREFERENCES,
    });
  }
}
