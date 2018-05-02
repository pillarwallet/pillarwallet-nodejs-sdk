import { Requester } from '../utils/requester';
import { RequestPromise } from 'request-promise';
import { default as userUpdateConfiguration } from '../utils/requester-configurations/user-update';
import { default as userInfoConfiguration } from '../utils/requester-configurations/user-info';
import { default as userSearchConfiguration } from '../utils/requester-configurations/user-search';
import { default as userDeleteConfiguration } from '../utils/requester-configurations/user-delete';
import { ErrorMessages } from './constants/errorMessages';

export class User {

  constructor() {
    //
  }

  update(userUpdate:UserUpdate,privateKey: string): RequestPromise {
    if (!userUpdate.city ||
        !userUpdate.country ||
        !userUpdate.email ||
        !userUpdate.firstName ||
        !userUpdate.lastName ||
        !userUpdate.phone ||
        !userUpdate.profileImage ||
        !userUpdate.state ||
        !userUpdate.tagline ||
        !userUpdate.taglineStatus ||
        !userUpdate.userSearchable ||
        !userUpdate.walletId) {
      throw new TypeError(ErrorMessages.MissingOrInvalidData);
    }

    const xAPISignature = Requester.sign(userUpdate, privateKey);

    if (!xAPISignature) {
      throw new Error(ErrorMessages.SigningError);
    }

    userUpdateConfiguration.headers['X-API-Signature'] = xAPISignature;
    userUpdateConfiguration.body = userUpdate;

    return Requester.execute(userUpdateConfiguration);
  }

  info(userInfo:UserInfo, privateKey: string): RequestPromise {
    if (!userInfo.walletId) {
      throw new TypeError(ErrorMessages.MissingOrInvalidData);
    }

    const xAPISignature = Requester.sign(userInfo, privateKey);

    if (!xAPISignature) {
      throw new Error(ErrorMessages.SigningError);
    }

    userInfoConfiguration.headers['X-API-Signature'] = xAPISignature;
    userInfoConfiguration.qs = userInfo;

    return Requester.execute(userInfoConfiguration);
  }

  search(userSearch:UserSearch,privateKey: string): RequestPromise {
    if (!userSearch.walletId || !userSearch.query) {
      throw new TypeError(ErrorMessages.MissingOrInvalidData);
    }

    const xAPISignature = Requester.sign(userSearch, privateKey);

    if (!xAPISignature) {
      throw new Error(ErrorMessages.SigningError);
    }

    userSearchConfiguration.headers['X-API-Signature'] = xAPISignature;
    userSearchConfiguration.qs = userSearch;

    return Requester.execute(userSearchConfiguration);
  }

  delete(userDelete:UserDelete,privateKey: string): RequestPromise {
    if (!userDelete.walletId) {
      throw new TypeError(ErrorMessages.MissingOrInvalidData);
    }

    const xAPISignature = Requester.sign(userDelete, privateKey);

    if (!xAPISignature) {
      throw new Error(ErrorMessages.SigningError);
    }

    userDeleteConfiguration.headers['X-API-Signature'] = xAPISignature;
    userDeleteConfiguration.body = userDelete;

    return Requester.execute(userDeleteConfiguration);
  }
}
