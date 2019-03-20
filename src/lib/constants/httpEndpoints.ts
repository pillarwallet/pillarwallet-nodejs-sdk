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
export enum HttpEndpoints {
  REGISTER_KEYS = '/register/keys',
  REGISTER_AUTH = '/register/auth',
  REGISTER_ACCESS = '/register/access',
  REGISTER_REFRESH = '/register/refresh',
  REGISTER_TOKENS = '/register/tokens',
  REGISTER_APPROVE_EXTERNAL_LOGIN = '/register/approve-external-login',
  WALLET_REGISTER = '/wallet/register',
  WALLET_REGISTER_ADDRESS = '/wallet/register-address',
  WALLET_UNREGISTER_ADDRESS = '/wallet/unregister-address',
  WALLET_UPDATE = '/wallet/update',
  ASSET_DEFAULT = '/asset/defaults',
  ASSET_SEARCH = '/asset/search',
  ASSET_LIST = '/asset/list',
  ASSET_PREFERRED = '/asset/preferred',
  CONNECTION_INVITE = '/connection/invite',
  CONNECTION_INVITE_V2 = '/connection/v2/invite',
  CONNECTION_ACCEPT = '/connection/accept',
  CONNECTION_ACCEPT_V2 = '/connection/v2/accept',
  CONNECTION_REJECT = '/connection/reject',
  CONNECTION_CANCEL = '/connection/cancel',
  CONNECTION_BLOCK = '/connection/block',
  CONNECTION_MUTE = '/connection/mute',
  CONNECTION_DISCONNECT = '/connection/disconnect',
  CONNECTION_COUNT = '/connection/count',
  CONNECTION_MAP_IDENTITY_KEYS = '/connection/map-identity-keys',
  CONNECTION_UPDATE_IDENTITY_KEYS = '/connection/update-identity-keys',
  NOTIFICATION_LIST = '/notification/list',
  INVESTMENTS_DEPOSIT_REQUEST = '/investment/wallet/deposit-request',
  INVESTMENTS_USER_ICO = '/users',
  USER_UPDATE = '/user/update',
  USER_INFO = '/user/info',
  USER_INFO_BY_ID = '/user/info/',
  USER_SEARCH = '/user/search',
  USER_DELETE = '/user/delete',
  USER_USERNAME_SEARCH = '/user/search-username',
  USER_VALIDATE = '/user/validate',
  USER_IMAGE = '/user/image',
  USER_IMAGE_BY_USER_ID = '/user/image-by-userid',
  USER_CREATE_ONE_TIME_PASSWORD = '/user/create-one-time-password',
  USER_VALIDATE_EMAIL = '/user/validate-email',
  USER_VALIDATE_PHONE = '/user/validate-phone',
  USER_NOTIFICATION_PREFERENCES = '/user/update-notification-preferences',
  USER_ACCESS_TOKENS = '/user/access-tokens',
  USER_BADGES = '/badge/my',
  SELF_AWARD_BADGE = '/badge/self-award',
}
