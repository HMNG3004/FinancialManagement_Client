export interface IncomeCreate{
  accountId: number;
  incomeAmount: number;
  incomeDate: Date;
  incomeTypeId: number;
  incomeDescription: string;
  toWalletId: number;
}
