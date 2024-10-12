import {Injectable, OnInit} from '@angular/core';
import {WalletItem} from "../../_model/Wallet/WalletItem";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {WalletCreateItem} from "../../_model/Wallet/WalletCreateItem";
import {WalletOverviewItem} from "../../_model/Wallet/WalletOverviewItem";
import {AccountService} from "../Account/account.service";
import {map, of, take} from "rxjs";
import {WalletDetailInformation} from "../../_model/Wallet/WalletDetailInformation";
import {WalletUpdateItem} from "../../_model/Wallet/WalletUpdateItem";
import {WalletTransactionItem} from "../../_model/Wallet/WalletTransactionItem";
import {WalletTransactionParams} from "../../_model/Wallet/walletTransactionParams";
import {ExpenseParams} from "../../_model/Expense/expenseParams";
import {getPaginationHeaders, getPaginationResult} from "../pagination_helper";
import {ExpenseView} from "../../_model/Expense/expenseView";

@Injectable({
  providedIn: 'root'
})
export class WalletService implements OnInit {

  baseUrl = environment.apiUrl + 'Wallet/';
  accountId = 0;
  walletCache = new Map();

  walletTransactionParams: WalletTransactionParams | undefined;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.walletTransactionParams = new WalletTransactionParams();
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

  SetWalletTransactionParams(walletTransactionParams: WalletTransactionParams) {
    this.walletTransactionParams = walletTransactionParams;
  }

  GetUserParams() {
    return this.walletTransactionParams;
  }

  ngOnInit(): void {
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

  GetAllWalletList() {
    return this.http.get<WalletItem[]>(this.baseUrl + 'view')
  }

  CreateNewWallet(model: WalletCreateItem) {
    model.accountCreatedId = this.accountId;
    return this.http.post(this.baseUrl + 'create/', model);
  }

  GetWalletOverview(walletId: number) {
    const params = {
      walletId: walletId
    }
    return this.http.get<WalletDetailInformation>(this.baseUrl + 'wallet/', {params});
  }

  DeleteWallet(walletId: number) {
    const params = {
      walletId: walletId,
      accountId: this.accountId
    }
    return this.http.delete(this.baseUrl + 'delete', {params})
  }

  UpdateWallet(walletItem: WalletUpdateItem) {
    walletItem.accountCreatedId = this.accountId;
    return this.http.put(this.baseUrl + 'update/', walletItem)
  }

  GetWalletTransaction(walletTransactionParams: WalletTransactionParams) {
    const response = this.walletCache.get(Object.values(walletTransactionParams).join('-'));

    if (response) return of(response);

    let params = getPaginationHeaders(walletTransactionParams.pageNumber, walletTransactionParams.pageSize);
    params = params.append('walletId', walletTransactionParams.walletId)
    return getPaginationResult<WalletTransactionItem[]>(this.baseUrl + 'wallet-transactions', params, this.http).pipe(
      map(response => {
        this.walletCache.set(Object.values(walletTransactionParams).join('-'), response);
        return response;
      })
    );
    // return this.http.get<WalletTransactionItem[]>(this.baseUrl + 'wallet-transactions/', {params});
  }
}
