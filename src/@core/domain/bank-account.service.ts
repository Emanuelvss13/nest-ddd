import { BankAccount } from './bank-account';
import { BankAccountRepository } from './bank-account.repository';
import { TransferDomainService } from './transfer.domain-service';

export class BankAccountService {
  constructor(private readonly bankAccountRepository: BankAccountRepository) {}

  async create(account_number: string): Promise<BankAccount> {
    const account = new BankAccount(0, account_number);

    await this.bankAccountRepository.insert(account);

    return account;
  }

  async transfer(
    accountNumberSrc: string,
    accountNumberDest: string,
    amount: number,
  ): Promise<void> {
    const accountSrc = await this.bankAccountRepository.findByAccountNumber(
      accountNumberSrc,
    );

    const accountDest = await this.bankAccountRepository.findByAccountNumber(
      accountNumberDest,
    );

    // O application service coordena as regras de négocio
    TransferDomainService.transfer(accountSrc, accountDest, amount);

    console.log(accountSrc, accountDest);

    await this.bankAccountRepository.update(accountSrc);
    await this.bankAccountRepository.update(accountDest);
  }
}
