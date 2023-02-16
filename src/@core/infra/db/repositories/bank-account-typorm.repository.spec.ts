import { DataSource, Repository } from 'typeorm';
import { BankAccountSchema } from '../entities/bank-account.schema';
import { BankAccount } from './../../../domain/bank-account';
import { BankAccounTypeormRepository } from './bank-account-typorm.repository';
describe('BankAccount Respository Unit Tests', () => {
  let datasource: DataSource;
  let ormRepo: Repository<BankAccountSchema>;
  let repository: BankAccounTypeormRepository;

  beforeEach(async () => {
    datasource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: true,
      entities: [BankAccountSchema],
    });
    await datasource.initialize();
    ormRepo = datasource.getRepository(BankAccountSchema);
    repository = new BankAccounTypeormRepository(ormRepo);
  });

  it('should insert a new bank account', async () => {
    const account = new BankAccount(100, '123');

    await repository.insert(account);

    const expected = await ormRepo.findOneBy({
      account_number: '123',
    });

    expect(expected.id).toBeDefined();
    expect(expected.balance).toEqual(100);
    expect(expected.account_number).toEqual('123');
  });
});
