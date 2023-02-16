import { Repository } from 'typeorm';
import { BankAccount } from '../../../domain/bank-account';
import { BankAccountSchema } from '../entities/bank-account.schema';
import { BankAccountRepository } from './../../../domain/bank-account.repository';

export class BankAccounTypeormRepository implements BankAccountRepository {
  constructor(private ormRepo: Repository<BankAccountSchema>) {}

  async update(bankAccount: BankAccount): Promise<void> {
    await this.ormRepo.update(bankAccount.id, {
      balance: bankAccount.balance,
    });
  }

  async findByAccountNumber(accountNumber: string): Promise<BankAccount> {
    const accountModel = await this.ormRepo.findOneBy({
      account_number: accountNumber,
    });

    return new BankAccount(
      accountModel.balance,
      accountModel.account_number,
      accountModel.id,
    );
  }

  async insert(bankAccount: BankAccountSchema): Promise<void> {
    const bankAccountModel = this.ormRepo.create(bankAccount);

    await this.ormRepo.save(bankAccountModel);
  }
}
