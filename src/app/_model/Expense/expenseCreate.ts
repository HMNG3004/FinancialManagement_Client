export interface ExpenseCreate {
  accountId: number;
  expenseAmount: number;
  expenseDate: Date;
  expenseTypeId: number;
  expenseDescription: string;
  fromWalletId: number;
}
