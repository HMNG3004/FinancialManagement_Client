export interface ExpenseView {
  expenseId: number;
  expenseDate: Date;
  expenseDescription: string;
  expenseAmount: number;
  fromWalletName: string;
  expenseTypeName: string;
  fromBudgetName: string;
}
