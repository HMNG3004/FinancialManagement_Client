import {Component, OnInit} from '@angular/core';
import {
  faArrowTrendUp,
  faArrowTrendDown,
  faCircle, faArrowUp, faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import {NumberFormat} from "../../util/moneyFormat";
import dayjs from "dayjs";
import {en_US, NzI18nService, zh_CN} from "ng-zorro-antd/i18n";
import {ExpenseService} from "../../_service/Expense/expense.service";
import {ExpenseBreakdown} from "../../_model/Expense/expenseBreakdown";
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

interface Expense {
  expenseId: number;
  expenseAmount: number;
  expenseDate: string;
  expenseDescription: string;
  fromWalletName: string;
  expenseTypeName: string;
  fromBudgetName: string;
}

@Component({
  selector: 'app-expense-page',
  templateUrl: './expense-page.component.html',
  styleUrl: './expense-page.component.css'
})
export class ExpensePageComponent implements OnInit {
  constructor(private i18n: NzI18nService, private expenseService: ExpenseService) {
  }

  expenseList: Expense[] = [];
  groupedExpenses: { week: string; expenses: Expense[]; expand: boolean }[] = [];

  ngOnInit(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.loadExpenseMonthlyBreakdown();
    this.generateFakeExpenses();
    this.groupByWeeks();
  }

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown
  protected readonly NumberFormat = NumberFormat;
  protected readonly Date = Date;
  protected readonly dayjs = dayjs;

  date = new Date();
  monthFormat = 'MM/yyyy';
  isEnglish = false;

  breakDownList: ExpenseBreakdown[] = []

  loadExpenseMonthlyBreakdown() {
    // this.breakingListLoading = true;
    let walletId = 0;
    let date = new Date();
    this.expenseService.getExpenseBreakdown(date, walletId).subscribe(expense => {
      this.breakDownList = expense;
      // this.breakingListLoading = false;
    })
  }

  onChange(result: Date): void {
  }

  // Generate fake expense data
  generateFakeExpenses(): void {
    this.expenseList = [
      {
        expenseId: 1,
        expenseAmount: 150.50,
        expenseDate: dayjs().subtract(3, 'day').toISOString(),
        expenseDescription: 'Groceries',
        fromWalletName: 'Main Wallet',
        expenseTypeName: 'Food',
        fromBudgetName: 'Monthly Expenses',
      },
      {
        expenseId: 2,
        expenseAmount: 200.00,
        expenseDate: dayjs().subtract(10, 'day').toISOString(),
        expenseDescription: 'Utility Bill',
        fromWalletName: 'Main Wallet',
        expenseTypeName: 'Utilities',
        fromBudgetName: 'Monthly Expenses',
      },
      {
        expenseId: 3,
        expenseAmount: 80.75,
        expenseDate: dayjs().subtract(15, 'day').toISOString(),
        expenseDescription: 'Internet Subscription',
        fromWalletName: 'Main Wallet',
        expenseTypeName: 'Subscriptions',
        fromBudgetName: 'Monthly Expenses',
      },
      {
        expenseId: 4,
        expenseAmount: 100.00,
        expenseDate: dayjs().subtract(20, 'day').toISOString(),
        expenseDescription: 'Dinner Out',
        fromWalletName: 'Main Wallet',
        expenseTypeName: 'Entertainment',
        fromBudgetName: 'Monthly Expenses',
      },
      {
        expenseId: 5,
        expenseAmount: 50.25,
        expenseDate: dayjs().subtract(25, 'day').toISOString(),
        expenseDescription: 'Gas for Car',
        fromWalletName: 'Savings Wallet',
        expenseTypeName: 'Transportation',
        fromBudgetName: 'Monthly Expenses',
      },
      {
        expenseId: 6,
        expenseAmount: 350.00,
        expenseDate: dayjs().subtract(30, 'day').toISOString(),
        expenseDescription: 'New Phone',
        fromWalletName: 'Main Wallet',
        expenseTypeName: 'Gadgets',
        fromBudgetName: 'Monthly Expenses',
      }
    ];
  }

  // Group expenses by week
  groupByWeeks(): void {
    const grouped: { [key: string]: Expense[] } = this.expenseList.reduce((acc: {
      [key: string]: Expense[]
    }, expense) => {
      const date = dayjs(expense.expenseDate);
      const weekOfYear = date.week();
      const year = date.year();
      const weekKey = `Week ${weekOfYear}, ${year}`;

      if (!acc[weekKey]) {
        acc[weekKey] = [];
      }
      acc[weekKey].push(expense);
      return acc;
    }, {});

    this.groupedExpenses = Object.keys(grouped).map((week) => ({
      week,
      expenses: grouped[week].reverse(),
      expand: false,
    })).reverse();
  }

  // Helper function to calculate total amount
  calculateTotalAmount(expenses: Expense[]): number {
    return expenses.reduce((total, expense) => total + expense.expenseAmount, 0);
  }

  // Mock export function
  onExport(expenses: Expense[]): void {
    console.log('Exporting expenses:', expenses);
  }
}
