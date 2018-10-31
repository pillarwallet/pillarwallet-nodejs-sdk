export enum HttpEndpoints {
  REGISTER_KEYS = '/register/keys',
  REGISTER_AUTH = '/register/auth',
  WALLET_REGISTER = '/wallet/register',
  WALLET_REGISTER_ADDRESS = '/wallet/register-address',
  WALLET_UNREGISTER_ADDRESS = '/wallet/unregister-address',
  WALLET_UPDATE = '/wallet/update',
  ASSET_DEFAULT = '/asset/defaults',
  ASSET_SEARCH = '/asset/search',
  ASSET_LIST = '/asset/list',
  CONNECTION_INVITE = '/connection/invite',
  CONNECTION_ACCEPT = '/connection/accept',
  CONNECTION_REJECT = '/connection/reject',
  CONNECTION_CANCEL = '/connection/cancel',
  CONNECTION_BLOCK = '/connection/block',
  CONNECTION_MUTE = '/connection/mute',
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
}
