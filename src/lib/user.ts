/**
 * Import required classes / libraries / constants
 */
import axios, { AxiosPromise } from 'axios';
import { Readable } from 'stream';
import { Requester } from '../utils/requester';
import { Configuration } from './configuration';
import { HttpEndpoints } from './constants/httpEndpoints';

/**
 * Import HTTP Request Configurations
 */
import { default as deleteConfiguration } from '../utils/requester-configurations/delete';
import { default as postConfiguration } from '../utils/requester-configurations/post';
import { default as getConfiguration } from '../utils/requester-configurations/get';

/**
 * Import Validation Schemas
 */
const userInfoSchema = require('../schemas/user/info.json');
const userUpdateSchema = require('../schemas/user/update.json');
const userDeleteSchema = require('../schemas/user/delete.json');
const userSearchSchema = require('../schemas/user/search.json');
const userUsernameSearchSchema = require('../schemas/user/username-search.json');
const userValidateSchema = require('../schemas/user/validate.json');
const profileImageSchema = require('../schemas/user/profileImage.json');
const deleteProfileImageSchema = require('../schemas/user/deleteProfileImage.json');
const uploadProfileImageSchema = require('../schemas/user/uploadProfileImage.json');

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

    const config = {
      ...getConfiguration,
      params: userInfo,
      url: `${Configuration.accessKeys.apiUrl}${HttpEndpoints.USER_INFO}`,
    };

    config.headers['X-API-Signature'] =
      this.checkSignature(userInfo, Configuration.accessKeys.privateKey);

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
    config.headers['X-API-Signature'] =
      this.checkSignature(userSearch, Configuration.accessKeys.privateKey);

    return Requester.execute(config);
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
   * Retrieve the userId of an existing wallet useror return not-found
   * @param {UserUsernameSearch} userUsernameSearch
   * @returns {axios.AxiosPromise}
   */
  usernameSearch(userUsernameSearch: UserUsernameSearch): AxiosPromise {
    this.validation(userUsernameSearchSchema, userUsernameSearch);

    const config = {
      ...getConfiguration,
      params: userUsernameSearch,
      url: `${Configuration.accessKeys.apiUrl}${HttpEndpoints.USER_USERNAME_SEARCH}`,
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
      url: Configuration.accessKeys.apiUrl + HttpEndpoints.USER_IMAGE + '/' + data.imageName,
      responseType: 'stream',
    };
    return Requester.execute(config);
  }

  uploadProfileImage(image: Readable, query: UploadProfileImage): AxiosPromise {
    this.validation(uploadProfileImageSchema, query);

    const config = {
      ...postConfiguration,
      url: Configuration.accessKeys.apiUrl + HttpEndpoints.USER_IMAGE + '?walletId='
      + query.walletId,
      data: image,
    };
    config.headers['X-API-Signature'] =
      this.checkSignature(query, Configuration.accessKeys.privateKey);

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
        'X-API-Signature': this.checkSignature({ walletId }, Configuration.accessKeys.privateKey),
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
      config.headers['Content-Type'] =
        `multipart/form-data; boundary=${formData._boundary}`;
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
}
