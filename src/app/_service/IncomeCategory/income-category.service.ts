import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {ExpenseCategoryView} from "../../_model/ExpenseCategory/expenseCategoryView";
import {ExpenseCategoryCreate} from "../../_model/ExpenseCategory/expenseCategoryCreate";
import {IncomeCategoryView} from "../../_model/IncomeCategory/incomeCategoryView";
import {IncomeCategoryCreate} from "../../_model/IncomeCategory/incomeCategoryCreate";

@Injectable({
  providedIn: 'root'
})
export class IncomeCategoryService {
  baseUrl = environment.apiUrl + 'IncomeCategory/';

  constructor(private http: HttpClient) {
  }

  GetIncomeCategoryList() {
    return this.http.get<IncomeCategoryView[]>(this.baseUrl + 'all');
  }

  CreateIncomeCategory(incomeCategory: IncomeCategoryCreate) {
    return this.http.post(this.baseUrl + 'create', incomeCategory);
  }
}
