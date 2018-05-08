import { Requester } from '../utils/requester';
import { RequestPromise } from 'request-promise';
import { default as userUpdateConfiguration } from '../utils/requester-configurations/user-update';
import { default as userInfoConfiguration } from '../utils/requester-configurations/user-info';
import { default as userSearchConfiguration } from '../utils/requester-configurations/user-search';
import { default as userDeleteConfiguration } from '../utils/requester-configurations/user-delete';
import { Configuration } from './configuration';

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

    userUpdateConfiguration.headers['X-API-Signature'] =
      this.checkSignature(userUpdate,Configuration.accessKeys.privateKey);
    userUpdateConfiguration.body = userUpdate;

    return Requester.execute(userUpdateConfiguration);
  }

  /**
   * Retrieve information on an existing wallet user
   * @param {UserInfo} userInfo
   * @returns {requestPromise.RequestPromise}
   */
  info(userInfo:UserInfo): RequestPromise {

    this.validation(userInfoSchema,userInfo);

    userInfoConfiguration.headers['X-API-Signature'] =
      this.checkSignature(userInfo,Configuration.accessKeys.privateKey);
    userInfoConfiguration.qs = userInfo;

    return Requester.execute(userInfoConfiguration);
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

    userSearchConfiguration.headers['X-API-Signature'] =
      this.checkSignature(userSearch,Configuration.accessKeys.privateKey);
    userSearchConfiguration.qs = userSearch;

    return Requester.execute(userSearchConfiguration);
  }

  /**
   * Remove an existing wallet user profile from the database
   * @param {UserDelete} userDelete
   * @returns {requestPromise.RequestPromise}
   */
  delete(userDelete:UserDelete): RequestPromise {

    this.validation(userDeleteSchema,userDelete);

    userDeleteConfiguration.headers['X-API-Signature'] =
      this.checkSignature(userDelete,Configuration.accessKeys.privateKey);
    userDeleteConfiguration.body = userDelete;

    return Requester.execute(userDeleteConfiguration);
  }
}
