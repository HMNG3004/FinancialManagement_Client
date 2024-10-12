import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NumberFormat} from "../../util/moneyFormat";
import {WalletService} from "../../_service/Wallet/wallet.service";
import {WalletOverviewItem} from "../../_model/Wallet/WalletOverviewItem";
import {WalletDetailInformation} from "../../_model/Wallet/WalletDetailInformation";
import {formatAndHideCardNumber} from "../../util/cardNumberFormat";
import {WalletTypeItem} from "../../_model/WalletType/walletTypeItem";
import {WalletTypeService} from "../../_service/WalletType/wallet-type.service";
import {WalletUpdateItem} from "../../_model/Wallet/WalletUpdateItem";
import {ToastrService} from "ngx-toastr";
import {Pagination} from "../../_model/pagination";
import {WalletItem} from "../../_model/Wallet/WalletItem";
import {WalletTransactionItem} from "../../_model/Wallet/WalletTransactionItem";
import dayjs from "dayjs";
import {WalletTransactionParams} from "../../_model/Wallet/walletTransactionParams";

@Component({
  selector: 'app-wallet-details-page',
  templateUrl: './wallet-details-page.component.html',
  styleUrl: './wallet-details-page.component.css'
})
export class WalletDetailsPageComponent implements OnInit {
  transactionItemsList: WalletTransactionItem[] = [];
  pagination: Pagination | undefined;
  walletTransactionParams: WalletTransactionParams | undefined;
  walletId = 0;
  walletDetailInformation: WalletDetailInformation = {
    walletName: '',
    walletTypeId: 0,
    walletBalance: 0,
    walletDescription: '',
    walletNumber: '',
    walletId: 0,
    walletTypeName: '',
    modifiedDate: new Date()
  };
  isUpdated = false;
  emptyText = 'No data'
  public walletTransactionListLoading = false;
  selectedWallet: WalletItem | undefined;
  model: any = {};
  date = new Date();
  walletTypeList: WalletTypeItem[] = [];

  constructor(private route: ActivatedRoute, private walletService: WalletService, private walletTypeService: WalletTypeService, private toastr: ToastrService) {
    this.walletTransactionParams = walletService.GetUserParams();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.walletId = +params['walletId'];  // Get the walletId from the route
      // Fetch wallet details using this.walletId
    });
    this.walletTypeService.GetAllWalletList().subscribe(walletType => {
      this.walletTypeList = walletType;
    })
    this.loadWalletDetail();
    this.loadWalletTransaction();

  }

  loadWalletDetail() {
    this.walletService.GetWalletOverview(this.walletId).subscribe(overviewItem => {
      this.walletDetailInformation = overviewItem
    });
  }


  loadWalletTransaction() {
    if (!this.walletTransactionParams) {
      console.log("param empty")
      return;
    }

    if (this.walletId != 0) {
      this.walletTransactionParams.walletId = this.walletId;
    }
    if (this.walletTransactionParams) {
      this.walletTransactionListLoading = true;
      this.walletService.SetWalletTransactionParams(this.walletTransactionParams);
      this.walletService.GetWalletTransaction(this.walletTransactionParams).subscribe({
        next: response => {
          console.log(response)
          if (response.result && response.pagination) {
            this.transactionItemsList = response.result;
            this.pagination = response.pagination;
          }
          this.walletTransactionListLoading = false;
        },
        error: error => {
          this.walletTransactionListLoading = false;
          this.toastr.error()
        }
      });
    }
  }

  handleToggleUpdateButtonClicked() {
    this.isUpdated = !this.isUpdated;
  }

  handleUpdateButtonClicked() {
    let item: WalletUpdateItem = {
      walletId: this.walletDetailInformation.walletId,
      walletName: this.walletDetailInformation.walletName,
      walletTypeId: this.walletDetailInformation.walletTypeId,
      walletBalance: this.walletDetailInformation.walletBalance,
      walletDescription: this.walletDetailInformation.walletDescription,
      walletNumber: this.walletDetailInformation.walletNumber,
      accountCreatedId: 0
    }
    this.walletService.UpdateWallet(item).subscribe({
      next: () => {
        this.isUpdated = false;
      },
    });
  }

  handleCancelButtonClicked() {
    this.isUpdated = !this.isUpdated;
  }

  validateNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Replace all non-digit characters with an empty string
    input.value = input.value.replace(/\D/g, '');
    this.walletDetailInformation.walletNumber = input.value;
  }

  pageChange(pageNumber: number) {
    if (this.walletTransactionParams && this.walletTransactionParams?.pageNumber !== pageNumber) {
      this.walletTransactionParams.pageNumber = pageNumber;
      this.walletService.SetWalletTransactionParams(this.walletTransactionParams);
      this.loadWalletTransaction();
    }
  }

  protected readonly NumberFormat = NumberFormat;
  protected readonly formatAndHideCardNumber = formatAndHideCardNumber;
  protected readonly dayjs = dayjs;
}
