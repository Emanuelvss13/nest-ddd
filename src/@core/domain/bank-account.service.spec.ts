import { DataSource, Repository } from 'typeorm';
import { BankAccountSchema } from '../infra/db/entities/bank-account.schema';
import { BankAccounTypeormRepository } from '../infra/db/repositories/bank-account-typorm.repository';
import { BankAccountService } from './bank-account.service';

describe('Bank Account Test', () => {
  let datasource: DataSource;
  let ormRepo: Repository<BankAccountSchema>;
  let repository: BankAccounTypeormRepository;
  let bankAccountService: BankAccountService;

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
    bankAccountService = new BankAccountService(repository);
  });

  it('should create a new bank account', async () => {
    await bankAccountService.create('123');

    const expected = await ormRepo.findOneBy({
      account_number: '123',
    });

    expect(expected.id).toBeDefined();
    expect(expected.balance).toEqual(0);
    expect(expected.account_number).toEqual('123');
  });
});
