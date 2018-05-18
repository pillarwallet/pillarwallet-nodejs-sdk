import { Requester } from '../utils/requester';
import { RequestPromise } from 'request-promise';
import { default as deleteConfiguration } from '../utils/requester-configurations/delete';
import { default as postConfiguration } from '../utils/requester-configurations/post';
import { default as getConfiguration } from '../utils/requester-configurations/get';

import { Configuration } from './configuration';

import {HttpEndpoints} from "./constants/httpEndpoints";

const userInfoSchema = require('../schemas/user/info.json');
const userUpdateSchema = require('../schemas/user/update.json');
const userDeleteSchema = require('../schemas/user/delete.json');
const userSearchSchema = require('../schemas/user/search.json');

export class User extends Configuration {

  constructor() {
    super();
  }

  /**
   * Updates data elements on an existing wallet user.
   * @param {UserUpdate} userUpdate
   * @returns {requestPromise.RequestPromise}
   */
  update(userUpdate:UserUpdate): RequestPromise {

    this.validation(userUpdateSchema,userUpdate);

    postConfiguration.headers['X-API-Signature'] =
      this.checkSignature(userUpdate,Configuration.accessKeys.privateKey);
    postConfiguration.body = userUpdate;
    postConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.USER_UPDATE;

    return Requester.execute(postConfiguration);
  }

  /**
   * Retrieve information on an existing wallet user
   * @param {UserInfo} userInfo
   * @returns {requestPromise.RequestPromise}
   */
  info(userInfo:UserInfo): RequestPromise {

    this.validation(userInfoSchema,userInfo);

    getConfiguration.headers['X-API-Signature'] =
      this.checkSignature(userInfo,Configuration.accessKeys.privateKey);
    getConfiguration.qs = userInfo;
    getConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.USER_INFO;

    return Requester.execute(getConfiguration);
  }

  /**
   * Provides a list of users that contain the search criteria in either their first name or last name,
   * and is not the current wallet user.
   * Also it performs a check if the search string term is at least 2 characters and if the user allows
   * their profile to be searched.
   * @param {UserSearch} userSearch
   * @returns {requestPromise.RequestPromise}
   */
  search(userSearch:UserSearch): RequestPromise {

    this.validation(userSearchSchema,userSearch);

    getConfiguration.headers['X-API-Signature'] =
      this.checkSignature(userSearch,Configuration.accessKeys.privateKey);
    getConfiguration.qs = userSearch;
    getConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.USER_SEARCH;

    return Requester.execute(getConfiguration);
  }

  /**
   * Remove an existing wallet user profile from the database
   * @param {UserDelete} userDelete
   * @returns {requestPromise.RequestPromise}
   */
  delete(userDelete:UserDelete): RequestPromise {

    this.validation(userDeleteSchema,userDelete);

    deleteConfiguration.headers['X-API-Signature'] =
      this.checkSignature(userDelete,Configuration.accessKeys.privateKey);
    deleteConfiguration.body = userDelete;
    deleteConfiguration.url = Configuration.accessKeys.apiUrl + HttpEndpoints.USER_DELETE;

    return Requester.execute(deleteConfiguration);
  }
}
