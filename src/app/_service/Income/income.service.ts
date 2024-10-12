import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IncomeCreate} from "../../_model/Income/IncomeCreate";
import {IncomeUpdate} from "../../_model/Income/IncomeUpdate";
import {IncomeView} from "../../_model/Income/IncomeView";
import {IncomeBreakdown} from "../../_model/Income/incomeBreakdown";
import {AccountService} from "../Account/account.service";
import {ExpenseParams} from "../../_model/Expense/expenseParams";
import {take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  baseUrl = environment.apiUrl + 'Income/';
  accountId = 0;

  constructor(private http: HttpClient, private accountService: AccountService) {
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

  getIncomeBreakdown() {
    return this.http.get<IncomeBreakdown[]>(this.baseUrl + 'breakdown')
  }
  CreateIncome(model: IncomeCreate){
    model.accountId = this.accountId;
    return this.http.post(this.baseUrl + 'create', model);
  }

  UpdateIncome(model: IncomeUpdate) {
    model.accountId = this.accountId;
    return this.http.put(this.baseUrl + 'update', model)
  }

  GetIncomeMonthlyView() {
    let date = new Date();
    const params = {
      month: (date.getMonth() + 1),
      year: date.getFullYear()
    };
    return this.http.get<IncomeView[]>(this.baseUrl + 'view', {params})
  }

  GetIncomeItemById(incomeId: number) {
    const params = {
      id: incomeId
    }
    return this.http.get<IncomeView>(this.baseUrl + 'detail', {params})
  }

  DeleteIncome(incomeId: number) {
    const params = {
      expenseId: incomeId,
      accountId: this.accountId
    }
    return this.http.delete(this.baseUrl + 'delete', {params})
  }
}
