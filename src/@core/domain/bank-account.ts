import { randomUUID } from 'crypto';

export type BankAccountTypes = {
  balance: string;
  account_number: string;
};

export class BankAccount {
  private _id: string;
  private _balance: number;
  private _account_number: string;

  get id(): string {
    return this._id;
  }

  get balance(): number {
    return this._balance;
  }

  get account_number(): string {
    return this._account_number;
  }

  //Regras de Négocio 🔽

  constructor(balance: number, account_number: string, id?: string) {
    this._id = id ?? randomUUID();
    this._balance = balance;
    this._account_number = account_number;
  }

  debit(amount: number): void {
    this._balance -= amount;
  }

  credit(amount: number): void {
    this._balance += amount;
  }
}

// !# DDD - solucionar/ajudar a complexidade do coração do sistema

// !# Linguagem ubigua

// !# arquitetura em camadas
