import { ErrorMessages } from './constants/errorMessages';
import { Requester } from '../utils/requester';
import { RequestPromise } from 'request-promise';

export class Wallet {
  walletId: string;

  constructor(incomingWalletId?: string) {
    this.walletId = incomingWalletId;
  }

  register(): RequestPromise {
    if (this.walletId) {
      throw new Error(ErrorMessages.WalletAlreadyRegistered);
    }

    this.walletId = Math.floor(Math.random() * Math.floor(99999)).toString();
    console.log('Wallet registered!');
    console.log(`Wallet ID is now ${this.walletId}`);
    return Requester.invoke();
  }

  dumpConfig() {
    console.log(this);
  }
}