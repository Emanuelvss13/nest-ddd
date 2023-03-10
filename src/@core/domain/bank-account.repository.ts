import { BankAccount } from './bank-account';
export interface BankAccountRepository {
  insert(bankAccount: BankAccount): Promise<void>;
  findByAccountNumber(accountNumber: string): Promise<BankAccount | null>;
  update(bankAccount: BankAccount): Promise<void>;
}
