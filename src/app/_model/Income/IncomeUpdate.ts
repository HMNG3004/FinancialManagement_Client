export interface IncomeUpdate{
  incomeId: number;
  accountId: number;
  incomeAmount: number;
  incomeDate: Date;
  incomeTypeId: number;
  incomeDescription: string;
  toWalletId: number;
}
