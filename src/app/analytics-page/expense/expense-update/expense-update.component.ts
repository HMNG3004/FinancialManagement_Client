import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExpenseCategoryCreate} from "../../../_model/ExpenseCategory/expenseCategoryCreate";
import {ExpenseCategoryView} from "../../../_model/ExpenseCategory/expenseCategoryView";
import {WalletItem} from "../../../_model/Wallet/WalletItem";
import {ExpenseCategoryService} from "../../../_service/ExpenseCategory/expense-category.service";
import {WalletService} from "../../../_service/Wallet/wallet.service";
import {ExpenseService} from "../../../_service/Expense/expense.service";
import {ExpenseCreate} from "../../../_model/Expense/expenseCreate";
import {ExpenseView} from "../../../_model/Expense/expenseView";
import {ExpenseUpdate} from "../../../_model/Expense/ExpenseUpdate";
import {FormBuilder, FormGroup} from "@angular/forms";
import moment from "moment";

@Component({
  selector: 'app-expense-update',
  templateUrl: './expense-update.component.html',
  styleUrl: './expense-update.component.css'
})
export class ExpenseUpdateComponent implements OnInit {
  isModalDeleteOpen: boolean = false;
  expenseForm: FormGroup;

  constructor(private fb: FormBuilder, private expenseCategoryService: ExpenseCategoryService, private walletService: WalletService, private expenseService: ExpenseService) {
    this.expenseForm = this.fb.group({
      expenseDate: [''],
      selectedWallet: [''],
      selectedCategory: [''],
      expenseDescription: [''],
      expenseAmount: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategoryList();
    this.loadWalletList();
    this.expenseService.GetExpenseItemById(this.expenseId ?? 0).subscribe(expense => {
      this.expenseItemEdited = expense;

      this.selectedWallet = this.walletList.find(wallet => wallet.walletName === expense.fromWalletName);
      this.selectedCategory = this.expenseCategoryList.find(category => category.expenseTypeName === expense.expenseTypeName);
      this.expenseDescription = expense.expenseDescription;
      this.expenseAmount = expense.expenseAmount;
      this.expenseDate = this.expenseItemEdited.expenseDate ? moment(this.expenseItemEdited.expenseDate).format('YYYY-MM-DD') : '';
    })
  }

  @Input() isModalUpdateOpen!: boolean;
  @Input() expenseId: number = 0;
  @Output() closeModal = new EventEmitter<void>();
  @Output() expenseModified = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  expenseCategoryCreate: ExpenseCategoryCreate = {expenseTypeName: ""}
  newExpenseCategory: string = '';
  expenseCategoryList: ExpenseCategoryView[] = [];
  walletList: WalletItem[] = []
  expenseItemEdited: ExpenseView | undefined;
  isDropdownOpen = false;

  selectedCategory: any;
  selectedWallet: any;
  expenseDate: string = '';
  expenseDescription: string = '';
  expenseAmount: number = 0;


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  loadCategoryList() {
    return this.expenseCategoryService.GetExpenseCategoryList().subscribe(item => {
      this.expenseCategoryList = item;
    })
  }

  loadWalletList(): void {
    this.walletService.GetAllWalletList().subscribe(wallet => {
      this.walletList = wallet;
      this.updateSelectedWallet();
    });
  }

  updateSelectedWallet() {
    if (this.expenseItemEdited && this.walletList) {
      const expenseWalletName = this.expenseItemEdited.fromWalletName?.toLowerCase();
      this.expenseForm.patchValue({
        selectedWallet: this.walletList.find(wallet => wallet.walletName.toLowerCase() === expenseWalletName)
      });
    }
  }

  selectCategory(expenseCategory: ExpenseCategoryView) {
    this.selectedCategory = expenseCategory;
    this.isDropdownOpen = false;
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

  updateExpense() {
    const newExpense : any = {
      expenseId: this.expenseId,
      expenseAmount: this.expenseAmount,
      expenseDate: new Date(this.expenseDate),
      expenseTypeId: this.selectedCategory.expenseTypeId,
      expenseDescription: this.expenseDescription,
      fromWalletId: this.selectedWallet.walletId
    };
    this.expenseService.UpdateExpense(newExpense).subscribe({
      next: () => {
        this.expenseModified.emit(); // Emit the event
        this.close();
      }
    })
  }

  deleteExpense() {
    this.expenseService.DeleteExpense(this.expenseId).subscribe({
      next: () => {
        this.expenseModified.emit(); // Emit the event
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
