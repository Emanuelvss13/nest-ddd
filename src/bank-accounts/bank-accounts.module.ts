import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BankAccountSchema } from '../@core/infra/db/entities/bank-account.schema';
import { BankAccountRepository } from './../@core/domain/bank-account.repository';
import { BankAccountService } from './../@core/domain/bank-account.service';
import { BankAccounTypeormRepository } from './../@core/infra/db/repositories/bank-account-typorm.repository';
import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsService } from './bank-accounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccountSchema])],
  controllers: [BankAccountsController],
  providers: [
    BankAccountsService,
    {
      provide: BankAccounTypeormRepository,
      useFactory: (datasource: DataSource) => {
        return new BankAccounTypeormRepository(
          datasource.getRepository(BankAccountSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: BankAccountService,
      useFactory: (repository: BankAccountRepository) =>
        new BankAccountService(repository),
      inject: [BankAccounTypeormRepository],
    },
  ],
})
export class BankAccountsModule {}
