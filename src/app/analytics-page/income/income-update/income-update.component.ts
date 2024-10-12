import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExpenseCategoryService} from "../../../_service/ExpenseCategory/expense-category.service";
import {WalletService} from "../../../_service/Wallet/wallet.service";
import {ExpenseService} from "../../../_service/Expense/expense.service";
import {ExpenseCategoryCreate} from "../../../_model/ExpenseCategory/expenseCategoryCreate";
import {ExpenseCategoryView} from "../../../_model/ExpenseCategory/expenseCategoryView";
import {WalletItem} from "../../../_model/Wallet/WalletItem";
import {ExpenseView} from "../../../_model/Expense/expenseView";
import {ExpenseUpdate} from "../../../_model/Expense/ExpenseUpdate";
import {IncomeCategoryService} from "../../../_service/IncomeCategory/income-category.service";
import {IncomeService} from "../../../_service/Income/income.service";
import {IncomeView} from "../../../_model/Income/IncomeView";
import {IncomeCategoryCreate} from "../../../_model/IncomeCategory/incomeCategoryCreate";
import {IncomeCategoryView} from "../../../_model/IncomeCategory/incomeCategoryView";
import {IncomeUpdate} from "../../../_model/Income/IncomeUpdate";

@Component({
  selector: 'app-income-update',
  templateUrl: './income-update.component.html',
  styleUrl: './income-update.component.css'
})
export class IncomeUpdateComponent implements OnInit {
  @Input() isModalUpdateOpen!: boolean;
  @Input() expenseId: number = 0;
  @Output() closeModal = new EventEmitter<void>();
  @Output() incomeModified = new EventEmitter<void>();

  incomeItemEdited: IncomeView | undefined;
  incomeCategoryCreate: IncomeCategoryCreate = {incomeTypeName: ""}
  incomeCategoryList: IncomeCategoryView[] = [];
  walletList: WalletItem[] = []
  isDropdownOpen = false;
  isModalDeleteOpen = false;


  newIncomeCategory: string = '';

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
    this.incomeService.GetIncomeItemById(this.expenseId ?? 0).subscribe(income => {
      this.incomeItemEdited = income;
      this.incomeDate = this.incomeItemEdited.incomeDate ? new Date(this.incomeItemEdited.incomeDate).toISOString().split('T')[0] : '';
      ;
      this.selectedWallet = this.walletList.find(wallet => wallet.walletName === income.toWalletName);
      this.selectedCategory = this.incomeCategoryList.find(category => category.incomeTypeName === income.incomeTypeName)
      this.incomeDescription = income.incomeDescription
      this.incomeAmount = income.incomeAmount

    })
  }


  close() {
    this.closeModal.emit();
  }


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

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

  selectCategory(incomeCategory: IncomeCategoryView) {
    this.selectedCategory = incomeCategory;
    this.isDropdownOpen = false;
  }

  CreateNewExpenseCategory() {
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

  updateExpense() {
    const newExpense: any = {
      incomeId: this.expenseId,
      incomeAmount: this.incomeAmount,
      incomeDate: new Date(this.incomeDate),
      incomeTypeId: this.selectedCategory.incomeTypeId,
      incomeDescription: this.incomeDescription,
      toWalletId: this.selectedWallet.walletId
    };
    this.incomeService.UpdateIncome(newExpense).subscribe({
      next: () => {
        this.incomeModified.emit(); // Emit the event
        this.close();
      }
    })
  }

  deleteExpense() {
    this.incomeService.DeleteIncome(this.expenseId).subscribe({
      next: () => {
        this.incomeModified.emit(); // Emit the event
        this.close();
      }
    })
  }

  toggleModelDelete() {
    this.isModalDeleteOpen = !this.isModalDeleteOpen
  }

  handleModalUpdateOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      this.toggleModelDelete();
    }
  };
}
