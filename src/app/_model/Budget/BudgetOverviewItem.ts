export interface BudgetOverviewItem {
  budgetId: number;
  budgetName: string;
  currentMonthExpense: number;
  previousMonthExpense: number;
  totalBalance: number;
  dateModified: Date;
  month: number;
  year: number;
}
