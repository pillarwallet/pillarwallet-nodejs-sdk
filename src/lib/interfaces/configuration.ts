interface PillarSdkConfiguration {
  privateKey: string;
  updateOAuthFn?: (x: { accessToken: string; refreshToken: string }) => any;
  oAuthTokens?: { accessToken: string; refreshToken: string };
  apiUrl?: string;
  notificationsUrl?: string;
  investmentsUrl?: string;
}
