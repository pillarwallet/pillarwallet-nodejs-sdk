import { ErrorMessages } from './constants/errorMessages';

export class Wallet {
  walletId: string;

  constructor(incomingWalletId?: string) {
    this.walletId = incomingWalletId;
  }

  register() {
    if (this.walletId) {
      throw new Error(ErrorMessages.WalletAlreadyRegistered);
    }

    this.walletId = Math.floor(Math.random() * Math.floor(99999)).toString();
    console.log('Wallet registered!');
    console.log(`Wallet ID is now ${this.walletId}`);
  }

  dumpConfig() {
    console.log(this);
  }
}