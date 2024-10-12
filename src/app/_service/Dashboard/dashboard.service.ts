import {Injectable} from '@angular/core';
import {DashboardItem} from "../../_model/Dashboard/DashboardItem";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  getIncomeAndExpenseMonthly() {
    let IncomeExpenseList: DashboardItem[] = [
      {month: 'January', expense: 2000000, income: 5000000, balance: 300000},
      {month: 'February', expense: 6000000, income: 5000000, balance: 600000},
      {month: 'March', expense: 5000000, income: 5000000, balance: 920000},
      {month: 'April', expense: 2546000, income: 5000000, balance: 1240000},
      {month: 'May', expense: 5472000, income: 5000000, balance: 2000000},
      {month: 'June', expense: 2704000, income: 5000000, balance: 1960000},
    ]
    return IncomeExpenseList;
  }

  constructor() {
  }
}
