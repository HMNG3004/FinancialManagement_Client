import {Component, OnInit} from '@angular/core';
import dayjs from "dayjs";
import {NumberFormat} from "../../util/moneyFormat";
import {BudgetService} from "../../_service/Budget/budget.service";
import {ActivatedRoute} from "@angular/router";
import {BudgetOverviewItem} from "../../_model/Budget/BudgetOverviewItem";
import {BudgetTransactionItem} from "../../_model/Budget/BudgetTransactionItem";
import {BudgetTransactionParams} from "../../_model/Budget/BudgetTransactionParams";
import {ToastrService} from "ngx-toastr";
import {Pagination} from "../../_model/pagination";

@Component({
  selector: 'app-budget-details-page',
  templateUrl: './budget-details-page.component.html',
  styleUrl: './budget-details-page.component.css'
})
export class BudgetDetailsPageComponent implements OnInit {
  emptyText = 'No data'
  isUpdated = false;
  budgetTransactionListLoading = false;
  budgetId = 0;
  selectedMonth = 0;
  selectedYear = 0;
  pagination: Pagination | undefined;
  budgetDetailInformation: BudgetOverviewItem | undefined;
  budgetItemList: BudgetTransactionItem[] = [];
  budgetTransactionParams: BudgetTransactionParams | undefined;

  constructor(private route: ActivatedRoute, private budgetService: BudgetService, private toastr: ToastrService) {
    this.budgetTransactionParams = budgetService.GetUserParams();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.budgetId = +params['budgetId'];
      this.selectedMonth = +params['month'];
      this.selectedYear = +params['year'];
      // Fetch wallet details using this.walletId
    });
    this.GetBudgetDetail();
    this.loadBudgetTransaction();
  }

  getPercentage(value: number, total: number): number {
    return (value / total) * 100;
  }

  getFormattedPercentage(value: number | undefined, total: number | undefined): string {
    if (value && total)
      return this.getPercentage(value, total).toFixed(2);
    else
      return this.getPercentage(0, 100).toFixed(2);
  }

  handleToggleUpdateButtonClicked() {
    this.isUpdated = !this.isUpdated;
  }

  GetBudgetDetail() {
    this.budgetService.GetBudgetOverview(this.budgetId, this.selectedMonth, this.selectedYear).subscribe(budgetItem => {
      this.budgetDetailInformation = budgetItem;
    })
  }

  loadBudgetTransaction() {
    if (!this.budgetTransactionParams) {
      console.log("param empty")
      return;
    }

    if (this.budgetId != 0 && this.selectedYear != 0 && this.selectedMonth != 0) {
      this.budgetTransactionParams.budgetId = this.budgetId;
      this.budgetTransactionParams.month = this.selectedMonth;
      this.budgetTransactionParams.year = this.selectedYear;
    }
    if (this.budgetTransactionParams) {
      this.budgetTransactionListLoading = true;
      this.budgetService.SetBudgetTransactionParams(this.budgetTransactionParams);
      this.budgetService.GetBudgetTransaction(this.budgetTransactionParams).subscribe({
        next: response => {
          console.log(response)
          if (response.result && response.pagination) {
            this.budgetItemList = response.result;
            this.pagination = response.pagination;
          }
          this.budgetTransactionListLoading = false;
        },
        error: error => {
          this.budgetTransactionListLoading = false;
          this.toastr.error()
        }
      });
    }
  }

  pageChange(pageNumber: number) {
    if (this.budgetTransactionParams && this.budgetTransactionParams?.pageNumber !== pageNumber) {
      this.budgetTransactionParams.pageNumber = pageNumber;
      this.budgetService.SetBudgetTransactionParams(this.budgetTransactionParams);
      this.loadBudgetTransaction();
    }
  }

  protected readonly dayjs = dayjs;
  protected readonly Date = Date;
  protected readonly NumberFormat = NumberFormat;
}
