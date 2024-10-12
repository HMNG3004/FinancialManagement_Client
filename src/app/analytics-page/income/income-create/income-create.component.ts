import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WalletItem} from "../../../_model/Wallet/WalletItem";
import {WalletService} from "../../../_service/Wallet/wallet.service";
import {IncomeCategoryView} from "../../../_model/IncomeCategory/incomeCategoryView";
import {IncomeCategoryService} from "../../../_service/IncomeCategory/income-category.service";
import {IncomeCategoryCreate} from "../../../_model/IncomeCategory/incomeCategoryCreate";
import {IncomeCreate} from "../../../_model/Income/IncomeCreate";
import {IncomeService} from "../../../_service/Income/income.service";

@Component({
  selector: 'app-income-create',
  templateUrl: './income-create.component.html',
  styleUrl: './income-create.component.css'
})
export class IncomeCreateComponent implements OnInit{
  incomeCategoryCreate: IncomeCategoryCreate = {incomeTypeName: ""}
  newIncomeCategory: string = '';
  incomeCategoryList: IncomeCategoryView[] = [];
  walletList: WalletItem[] = []
  isDropdownOpen = false;

  selectedCategory: any;
  selectedWallet: any;
  incomeDate: string = '';
  incomeDescription: string = '';
  incomeAmount: number = 0;

  constructor(private incomeCategoryService: IncomeCategoryService, private walletService: WalletService, private incomeService: IncomeService) {
  }

  ngOnInit(): void {
    this.loadCategoryList();
    this.loadWalletList();
  }

  @Input() isModalCreateOpen!: boolean;
  @Output() closeModal = new EventEmitter<void>();
  @Output() incomeCreated = new EventEmitter<void>();

  loadCategoryList() {
    return this.incomeCategoryService.GetIncomeCategoryList().subscribe(item => {
      this.incomeCategoryList = item;
    })
  }

  loadWalletList(): void {
    this.walletService.GetAllWalletList().subscribe(wallet => {
      this.walletList = wallet;
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  CreateNewIncomeCategory() {
    this.incomeCategoryCreate.incomeTypeName = this.newIncomeCategory
    if (this.incomeCategoryCreate.incomeTypeName && this.incomeCategoryCreate.incomeTypeName.trim() !== '') {
      this.incomeCategoryService.CreateIncomeCategory(this.incomeCategoryCreate).subscribe({
        next: () => {
          this.loadCategoryList();
        },
      })
    } else {
      this.toggleDropdown()
    }
  }

  selectCategory(incomeCategory: IncomeCategoryView) {
    this.selectedCategory = incomeCategory;
    console.log(this.selectedCategory)
    this.isDropdownOpen = false;
  }

  createIncome() {
    const newIncome: any = {
      incomeAmount: this.incomeAmount,
      incomeDate: new Date(this.incomeDate),
      incomeTypeId: this.selectedCategory.incomeTypeId,
      incomeDescription: this.incomeDescription,
      toWalletId: this.selectedWallet.walletId
    };
    this.incomeService.CreateIncome(newIncome).subscribe({
      next: () => {
        this.incomeCreated.emit(); // Emit the event
        this.close();
      }
    })
  }

  close() {
    this.closeModal.emit();
  }
}
