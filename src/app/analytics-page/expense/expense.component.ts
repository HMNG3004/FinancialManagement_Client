import {Component, OnInit} from '@angular/core';
import {NumberFormat} from "../../util/moneyFormat";
import {ExpenseService} from "../../_service/Expense/expense.service";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import {ExpenseView} from "../../_model/Expense/expenseView";
import {ExpenseBreakdown} from "../../_model/Expense/expenseBreakdown";
import {ExpenseParams} from "../../_model/Expense/expenseParams";
import {Pagination} from "../../_model/pagination";
import {WalletItem} from "../../_model/Wallet/WalletItem";
import {WalletService} from "../../_service/Wallet/wallet.service";
import {truncateText} from "../../util/truncateText";
import {ToastrService} from "ngx-toastr";
import {en_US, NzI18nService, zh_CN} from "ng-zorro-antd/i18n";

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent implements OnInit {

  colors: Map<string, string> = new Map();
  protected readonly NumberFormat = NumberFormat;
  protected readonly faCircle = faCircle;
  protected readonly dayjs = dayjs;
  expenseData: any;
  options: any;
  isModalCreateOpen: boolean = false;
  isModalUpdateOpen: boolean = false;
  public walletListLoading = false;
  public expenseListLoading = false;
  public breakingListLoading = false;
  isEnglish = false;
  expenseIdSelected: number = 0;

  emptyText = 'No data'

  expenseList: ExpenseView[] = []
  breakDownList: ExpenseBreakdown[] = []
  walletList: WalletItem[] = [
    {
      walletName: "All",
      walletId: -1,
      walletBalance: 0,
      walletTypeId: -1,
      walletTypeName: ""
    }
  ]
  label: string[] = []
  data: number[] = []
  pagination: Pagination | undefined;
  expenseParams: ExpenseParams | undefined;
  selectedWallet: WalletItem | undefined;
  date = new Date();
  monthFormat = 'MM/yyyy';
  totalExpense = 0;

  constructor(private expenseService: ExpenseService, private walletService: WalletService, private toastr: ToastrService, private i18n: NzI18nService) {
    this.expenseParams = expenseService.GetUserParams();
  }

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };

    this.loadWalletList();
  }

  toggleModelCreate() {
    this.isModalCreateOpen = !this.isModalCreateOpen;
  }

  selectExpenseItemEdit(expenseId: number) {
    this.expenseIdSelected = expenseId;
    this.toggleModelUpdate();
  }

  toggleModelUpdate() {
    this.isModalUpdateOpen = !this.isModalUpdateOpen;
  }

  handleModalCreateOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      this.toggleModelCreate();
    }
  };

  handleModalUpdateOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      this.toggleModelUpdate();
    }
  };

  loadExpenseMonthlyList() {
    if (!this.expenseParams) {
      console.log("param empty");
      return;
    }
    this.expenseListLoading = true;
    if (this.selectedWallet && this.selectedWallet.walletId != -1) {
      this.expenseParams.fromWalletId = this.selectedWallet.walletId;
    }
    if (this.selectedWallet && this.selectedWallet.walletId == -1) {
      this.expenseParams.fromWalletId = 0;
    }
    if (this.date) {
      this.expenseParams.month = this.date.getMonth() + 1;
      this.expenseParams.year = this.date.getFullYear();
    }

    if (this.expenseParams) {
      this.expenseService.SetExpenseParams(this.expenseParams);
      this.expenseService.GetExpenseMonthlyView(this.expenseParams).subscribe({
        next: response => {
          if (response.result && response.pagination) {
            this.expenseList = response.result;
            this.pagination = response.pagination;
          }
          this.expenseListLoading = false;
        },
        error: error => {
          this.expenseListLoading = false;
          this.toastr.error()
        }
      });
    }
  }

  loadExpenseMonthlyBreakdown() {
    this.breakingListLoading = true;
    let walletId = 0;
    let date = new Date();
    if (this.selectedWallet && this.date && this.selectedWallet.walletId != -1) {
      walletId = this.selectedWallet.walletId;
      date = this.date
    }
    this.expenseService.getExpenseBreakdown(date, walletId).subscribe(expense => {
      this.breakDownList = expense;
      this.totalExpense = 0;
      this.breakDownList.map(item => {
        return this.totalExpense += item.totalAmount
      })
      this.label = expense.map(item => item.budgetName);
      this.data = expense.map(item => item.totalAmount);
      this.generateColors();
      this.expenseData = {
        labels: this.label,
        datasets: [
          {
            data: this.data,
            backgroundColor: Array.from(this.colors.values()),
            hoverBackgroundColor: Array.from(this.colors.values()),
          }
        ]
      };
      this.breakingListLoading = false;
    })
  }

  loadWalletList(): void {
    this.walletListLoading = true;
    this.walletService.GetAllWalletList().subscribe(wallet => {
      wallet.forEach(item => {
        this.walletList.push(item)
      })
      this.selectedWallet = this.walletList[0]
      this.walletListLoading = false;
      this.loadExpenseMonthlyBreakdown();
      this.loadExpenseMonthlyList();
    });
  }

  generateColors(): void {
    this.colors.clear(); // Clear existing colors
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

  pageChange(pageNumber: number) {
    if (this.expenseParams && this.expenseParams?.pageNumber !== pageNumber) {
      this.expenseParams.pageNumber = pageNumber;
      this.expenseService.SetExpenseParams(this.expenseParams);
      this.loadExpenseMonthlyList();
    }
  }

  onWalletChange() {
    this.loadExpenseMonthlyList();
    this.loadExpenseMonthlyBreakdown();
  }

  onChange(result: Date): void {
    this.loadExpenseMonthlyList();
    this.loadExpenseMonthlyBreakdown();
  }

  onExpenseCreated() {
    console.log("function create update work")
    this.loadExpenseMonthlyBreakdown();
    this.loadExpenseMonthlyList();
  }

  protected readonly truncateText = truncateText;
}
