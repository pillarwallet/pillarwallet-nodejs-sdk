interface UpdateNotificationPreferences {
  walletId: string;
  newOffer?: boolean;
  newReceipt?: boolean;
  paymentConfirmation?: boolean;
  paymentStatusUpdate?: boolean;
  profileUpdate?: boolean;
  fundsDeposit?: boolean;
  transactionEvent?: boolean;
}
