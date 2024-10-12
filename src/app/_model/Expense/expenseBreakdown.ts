import {ExpenseItem} from "./expenseItem";

export interface ExpenseBreakdown{
  budgetName: string;
  totalAmount: number;
  percentComparedToLastMonth: number;
  isIncreased: boolean;
  expenseItems: ExpenseItem[]
}
