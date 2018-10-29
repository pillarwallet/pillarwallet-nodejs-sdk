interface WalletUpdate {
  walletId: string;
  fcmToken: string;
  privateKey: string;
  signalRegistrationId?: string;
  ethAddress?: string;
}
