import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {ExpenseCategoryView} from "../../_model/ExpenseCategory/expenseCategoryView";
import {ExpenseCategoryCreate} from "../../_model/ExpenseCategory/expenseCategoryCreate";

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoryService {
  baseUrl = environment.apiUrl + 'ExpenseCategory/';

  constructor(private http: HttpClient) {
  }

  GetExpenseCategoryList() {
    return this.http.get<ExpenseCategoryView[]>(this.baseUrl + 'all');
  }

  CreateExpenseCategory(expenseCategory: ExpenseCategoryCreate) {
    return this.http.post(this.baseUrl + 'create', expenseCategory);
  }
}
