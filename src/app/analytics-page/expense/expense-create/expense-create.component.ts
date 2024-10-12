import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WalletTypeItem} from "../../../_model/WalletType/walletTypeItem";
import {ExpenseCategoryService} from "../../../_service/ExpenseCategory/expense-category.service";
import {ExpenseCategoryCreate} from "../../../_model/ExpenseCategory/expenseCategoryCreate";
import {WalletItem} from "../../../_model/Wallet/WalletItem";
import {ExpenseCategoryView} from "../../../_model/ExpenseCategory/expenseCategoryView";
import {ExpenseCreate} from "../../../_model/Expense/expenseCreate";
import {WalletService} from "../../../_service/Wallet/wallet.service";
import {ExpenseService} from "../../../_service/Expense/expense.service";

@Component({
  selector: 'app-expense-create',
  templateUrl: './expense-create.component.html',
  styleUrl: './expense-create.component.css'
})
export class ExpenseCreateComponent implements OnInit {
  expenseCategoryCreate: ExpenseCategoryCreate = {expenseTypeName: ""}
  newExpenseCategory: string = '';
  expenseCategoryList: ExpenseCategoryView[] = [];
  walletList: WalletItem[] = []
  isDropdownOpen = false;

  selectedCategory: any;
  selectedWallet: any;
  expenseDate: string = '';
  expenseDescription: string = '';
  expenseAmount: number = 0;

  constructor(private expenseCategoryService: ExpenseCategoryService, private walletService: WalletService, private expenseService: ExpenseService) {
  }

  ngOnInit(): void {
    this.loadCategoryList();
    this.loadWalletList();
  }

  @Input() isModalCreateOpen!: boolean;
  @Output() closeModal = new EventEmitter<void>();
  @Output() expenseCreated = new EventEmitter<void>();

  loadCategoryList() {
    return this.expenseCategoryService.GetExpenseCategoryList().subscribe(item => {
      this.expenseCategoryList = item;
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

  CreateNewExpenseCategory() {
    this.expenseCategoryCreate.expenseTypeName = this.newExpenseCategory
    if (this.expenseCategoryCreate.expenseTypeName && this.expenseCategoryCreate.expenseTypeName.trim() !== '') {
      this.expenseCategoryService.CreateExpenseCategory(this.expenseCategoryCreate).subscribe({
        next: () => {
          this.loadCategoryList();
        },
      })
    } else {
      this.toggleDropdown()
    }
  }

  selectCategory(expenseCategory: ExpenseCategoryView) {
    this.selectedCategory = expenseCategory;
    this.isDropdownOpen = false;
  }

  createExpense() {
    const newExpense: any = {
      expenseAmount: this.expenseAmount,
      expenseDate: new Date(this.expenseDate),
      expenseTypeId: this.selectedCategory.expenseTypeId,
      expenseDescription: this.expenseDescription,
      fromWalletId: this.selectedWallet.walletId
    };
    this.expenseService.CreateExpense(newExpense).subscribe({
      next: () => {
        this.expenseCreated.emit(); // Emit the event
        this.close();
      }
    })
  }

  close() {
    this.closeModal.emit();
  }
}
