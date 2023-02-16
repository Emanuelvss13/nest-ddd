import { BankAccount } from './bank-account';

describe('Bank account Unit test', () => {
  it('should create a new bank account', () => {
    const account = new BankAccount(100, '123');

    expect(account.id).toBeDefined();
    expect(account.balance).toBe(100);
    expect(account.account_number).toBe('123');
  });

  it('should a debit amount from a bank account', () => {
    const account = new BankAccount(100, '123');

    account.debit(50);

    expect(account.balance).toBe(50);
  });

  it('should credit amount from a bank account', () => {
    const account = new BankAccount(100, '123');

    account.credit(50);

    expect(account.balance).toBe(150);
  });
});
