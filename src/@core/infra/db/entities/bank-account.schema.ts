import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Complexidade Tecnica
// Entidade Anêmica
@Entity()
export class BankAccountSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', scale: 2 })
  balance: number;

  @Column({ length: 255 })
  account_number: string;
}
