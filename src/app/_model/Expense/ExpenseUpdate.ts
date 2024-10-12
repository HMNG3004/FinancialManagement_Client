export interface ExpenseUpdate{
  expenseId: number;
  accountId: number;
  expenseAmount: number;
  expenseDate: Date;
  expenseTypeId: number;
  expenseDescription: string;
  fromWalletId: number;
}
