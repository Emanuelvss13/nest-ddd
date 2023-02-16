import { BankAccount } from './bank-account';

export class TransferDomainService {
  public static async transfer(
    accountSrc: BankAccount,
    accountDest: BankAccount,
    amount: number,
  ) {
    accountSrc.debit(amount);
    accountDest.credit(amount);
  }
}
