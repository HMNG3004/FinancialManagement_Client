import {Injectable, OnInit} from '@angular/core';
import {Budget} from "../../_model/budget";
import {faCar, faCartShopping, faEllipsis, faNotesMedical, faPlay, faUtensils} from "@fortawesome/free-solid-svg-icons";
import {WalletCreateItem} from "../../_model/Wallet/WalletCreateItem";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BudgetItem} from "../../_model/Budget/BudgetItem";
import {map, of, take} from "rxjs";
import {AccountService} from "../Account/account.service";
import {BudgetCreateItem} from "../../_model/Budget/BudgetCreateItem";
import {WalletOverviewItem} from "../../_model/Wallet/WalletOverviewItem";
import {BudgetOverviewItem} from "../../_model/Budget/BudgetOverviewItem";
import {WalletTransactionParams} from "../../_model/Wallet/walletTransactionParams";
import {getPaginationHeaders, getPaginationResult} from "../pagination_helper";
import {WalletTransactionItem} from "../../_model/Wallet/WalletTransactionItem";
import {BudgetTransactionParams} from "../../_model/Budget/BudgetTransactionParams";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  budget: Budget[] = [];
  baseUrl = environment.apiUrl + 'Budget/';
  accountId: number = 0;
  walletCache = new Map();
  budgetTransactionParams: BudgetTransactionParams | undefined;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.budgetTransactionParams = new BudgetTransactionParams();
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.accountId = user.accountId
        } else {
          console.log("No available token")
        }
      }
    })
  }

  SetBudgetTransactionParams(budgetTransactionParams: BudgetTransactionParams) {
    this.budgetTransactionParams = budgetTransactionParams;
  }

  GetUserParams() {
    return this.budgetTransactionParams;
  }

  getAllBudget() {
    let budgetList: Budget[] = [
      {icon: faUtensils, name: 'Food', totalBudget: 2000000, currentSpend: 1290000},
      {icon: faCar, name: 'Transportation', totalBudget: 500000, currentSpend: 311000},
      {icon: faCartShopping, name: 'Shopping', totalBudget: 500000, currentSpend: 77000},
      {icon: faPlay, name: 'Entertainment', totalBudget: 100000, currentSpend: 142000},
      {icon: faNotesMedical, name: 'Healthcare', totalBudget: 500000, currentSpend: 380000},
      {icon: faEllipsis, name: 'Other', totalBudget: 500000, currentSpend: 120000},
    ]
    return budgetList;
  }

  CreateNewBudget(model: BudgetCreateItem) {
    model.accountId = this.accountId;
    return this.http.post(this.baseUrl + 'create/', model);
  }

  GetAllBudgetList(month: number, year: number) {
    const params = new HttpParams()
      .set('month', month)
      .set('year', year)
      .set('accountId', this.accountId);
    return this.http.get<BudgetItem[]>(this.baseUrl + 'view', {params})
  }

  GetBudgetOverview(budgetId: number, month: number, year: number) {
    const params = new HttpParams()
      .set('month', month)
      .set('year', year)
      .set('budgetId', budgetId);
    return this.http.get<BudgetOverviewItem>(this.baseUrl + 'budget/', {params});
  }

  GetBudgetTransaction(budgetTransactionParams: BudgetTransactionParams) {
    const response = this.walletCache.get(Object.values(budgetTransactionParams).join('-'));

    if (response) return of(response);
    let params = getPaginationHeaders(budgetTransactionParams.pageNumber, budgetTransactionParams.pageSize);
    params = params.append('budgetId', budgetTransactionParams.budgetId)
    params = params.append("month", budgetTransactionParams.month)
    params = params.append("year", budgetTransactionParams.year)
    return getPaginationResult<WalletTransactionItem[]>(this.baseUrl + 'transactions', params, this.http).pipe(
      map(response => {
        this.walletCache.set(Object.values(budgetTransactionParams).join('-'), response);
        return response;
      })
    );
  }
}
