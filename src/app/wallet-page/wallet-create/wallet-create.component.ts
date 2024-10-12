import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WalletTypeService} from "../../_service/WalletType/wallet-type.service";
import {WalletItem} from "../../_model/Wallet/WalletItem";
import {WalletTypeItem} from "../../_model/WalletType/walletTypeItem";
import {WalletCreateItem} from "../../_model/Wallet/WalletCreateItem";
import {WalletService} from "../../_service/Wallet/wallet.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  styleUrl: './wallet-create.component.css'
})
export class WalletCreateComponent implements OnInit {
  walletTypeList: WalletTypeItem[] = [];

  constructor(private walletTypeService: WalletTypeService, private walletService: WalletService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.walletTypeService.GetAllWalletList().subscribe(walletType => {
      this.walletTypeList = walletType;
    })
  }

  @Input() isModalOpen!: boolean;
  @Output() closeModal = new EventEmitter<void>();
  @Output() walletCreated = new EventEmitter<void>();
  model: any = {};

  onCreateWallet() {
    if (this.model) {
      this.walletService.CreateNewWallet(this.model).subscribe({
        next: () => {
          this.walletCreated.emit(); // Emit the event
          this.close();
        },
        error: error => {
          this.toastr.error()
        }
      });
    }

  }

  close() {
    this.closeModal.emit();
  }
}
