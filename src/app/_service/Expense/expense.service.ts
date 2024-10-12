import {Injectable} from '@angular/core';
import {ExpenseBreakdown} from "../../_model/Expense/expenseBreakdown";
import {map, of, take} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ExpenseCreate} from "../../_model/Expense/expenseCreate";
import {ExpenseView} from "../../_model/Expense/expenseView";
import {ExpenseUpdate} from "../../_model/Expense/ExpenseUpdate";
import {ExpenseParams} from "../../_model/Expense/expenseParams";
import {getPaginationHeaders, getPaginationResult} from "../pagination_helper";
import {AccountService} from "../Account/account.service";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  baseUrl = environment.apiUrl + 'Expense/';
  expenseParams: ExpenseParams | undefined;
  expenseCache = new Map();
  accountId = 0;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.expenseParams = new ExpenseParams();
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.accountId = user.accountId
        } else {
          console.log("No available id")
        }
      }
    })
  }

  SetExpenseParams(expenseParams: ExpenseParams) {
    this.expenseParams = expenseParams;
  }

  GetUserParams() {
    return this.expenseParams;
  }


  getExpenseBreakdown(date: Date, walletId: number) {
    let params = {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      fromWalletId: walletId,
    }
    return this.http.get<ExpenseBreakdown[]>(this.baseUrl + 'breakdown', {params})
  }

  CreateExpense(model: ExpenseCreate) {
    model.accountId = this.accountId
    return this.http.post(this.baseUrl + 'create', model).pipe(
      map(() => this.invalidateCache())
    );
  }

  UpdateExpense(model: ExpenseUpdate) {
    model.accountId = this.accountId
    return this.http.put(this.baseUrl + 'update', model).pipe(
      map(() => this.invalidateCache())
    );
  }

  GetExpenseMonthlyView(expenseParams: ExpenseParams) {
    const response = this.expenseCache.get(Object.values(expenseParams).join('-'));

    if (response) return of(response);
    let params = getPaginationHeaders(expenseParams.pageNumber, expenseParams.pageSize);
    params = params.append('month', expenseParams.month)
    params = params.append('year', expenseParams.year)
    params = params.append('fromWalletId', expenseParams.fromWalletId)

    return getPaginationResult<ExpenseView[]>(this.baseUrl + 'view', params, this.http).pipe(
      map(response => {
        this.expenseCache.set(Object.values(expenseParams).join('-'), response);
        return response;
      })
    );
  }

  GetExpenseItemById(expenseId: number) {
    const params = {
      id: expenseId
    }
    return this.http.get<ExpenseView>(this.baseUrl + 'detail', {params})
  }

  DeleteExpense(expenseId: number) {
    const params = {
      expenseId: expenseId,
      accountId: this.accountId
    }
    return this.http.delete(this.baseUrl + 'delete', { params }).pipe(
      map(() => this.invalidateCache())
    );
  }

  private invalidateCache() {
    this.expenseCache.clear(); // Clears the entire cache
    // Alternatively, if you want to clear specific keys, you could implement a more complex cache invalidation logic.
  }
}
