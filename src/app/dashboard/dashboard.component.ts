import {Component, OnInit} from '@angular/core';
import {NumberFormat} from "../util/moneyFormat";
import {
  faArrowTrendUp,
  faArrowTrendDown,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import {BudgetService} from "../_service/Budget/budget.service";
import {ExpenseService} from "../_service/Expense/expense.service";
import {DashboardService} from "../_service/Dashboard/dashboard.service";
import {SavingGoalService} from "../_service/SavingGoal/saving-goal.service";
import {ExpenseBreakdown} from "../_model/Expense/expenseBreakdown";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  lineChartData: any;
  lineChartOptions: any;
  barChartData: any;
  barChartOptions: any;

  breakDownList: ExpenseBreakdown[] = []

  expenseData = this.dashboardService.getIncomeAndExpenseMonthly().map(item => item.expense);
  incomeData = this.dashboardService.getIncomeAndExpenseMonthly().map(item => item.income);
  balanceData = this.dashboardService.getIncomeAndExpenseMonthly().map(item => item.balance);
  labels = this.dashboardService.getIncomeAndExpenseMonthly().map(item => item.month);
  colors: Map<string, string> = new Map();
  totalValue: number = 0;

  constructor(private budgetService: BudgetService, private expenseService: ExpenseService, private dashboardService: DashboardService, private savingGoalService: SavingGoalService) {
  }

  ngOnInit(): void {
    document.documentElement.style.setProperty('--text-color', '#e30b0b');
    document.documentElement.style.setProperty('--text-color-secondary', '#000000');

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.lineChartData = {
      labels: this.labels,
      datasets: [
        {
          data: this.balanceData,
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1,
          fill: true
        }
      ]
    };

    this.barChartData = {
      labels: this.labels,
      datasets: [
        {
          label: 'Income',
          backgroundColor: '#2ECC71',
          borderColor: '#2ECC71',
          data: this.incomeData
        },
        {
          label: 'Expense',
          backgroundColor: '#E74C3C',
          borderColor: '#E74C3C',
          data: this.expenseData,
        }
      ]
    };

    this.barChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          display: false,
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    this.lineChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
            font: {
              size: 14
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              size: 14
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    this.loadExpenseMonthlyBreakdown();
  }

  loadExpenseMonthlyBreakdown() {
    let date = new Date();
    this.expenseService.getExpenseBreakdown(date, 0).subscribe(expense => {
      this.breakDownList = expense;
      this.generateColors();
      this.calculateTotalValue();
    })
  }

  calculateTotalValue(): void {
    this.totalValue = this.breakDownList.reduce((acc, item) => acc + item.totalAmount, 0);
  }

  generateColors(): void {
    this.breakDownList.forEach((item, index) => {
      if (!this.colors.has(item.budgetName)) {
        this.colors.set(item.budgetName, this.getRandomColor(index));
      }
    });
  }

  getRandomColor(index: number): string {
    const hue = (index * 137.508) % 360; // use golden ratio
    return `hsl(${hue}, 70%, 50%)`;
  }

  getPercentage(value: number, total: number): number {
    return (value / total) * 100;
  }

  getFormattedPercentage(value: number, total: number): string {
    return this.getPercentage(value, total).toFixed(2);
  }

  faArrowTrendUp = faArrowTrendUp;
  faArrowTrendDown = faArrowTrendDown;
  faCircle = faCircle;

  statisticItem = [
    {label: 'Total balance', value: 9360000, difference: 2.47, lastMonth: 8820000},
    {label: 'Total Period Change', value: 2050000, difference: 2.47, lastMonth: 4613000},
    {label: 'Total Period Expenses', value: 2050000, difference: 2.47, lastMonth: 4613000},
    {label: 'Total Period Income', value: 5000000, difference: -2.47, lastMonth: 5000000},
  ];
  protected readonly NumberFormat = NumberFormat;


  monthBudgetList = this.budgetService.getAllBudget();

  savingGoalList = this.savingGoalService.GetAllSavingGoal();


}
