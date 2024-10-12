import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WalletService} from "../../_service/Wallet/wallet.service";
import {BudgetService} from "../../_service/Budget/budget.service";
import {WalletItem} from "../../_model/Wallet/WalletItem";
import {ToastrService} from "ngx-toastr";
import {AccountService} from "../../_service/Account/account.service";
import {take} from "rxjs";
import {NumberFormat} from "../../util/moneyFormat";
import {BudgetTemplateItem} from "../../_model/BudgetTemplate/budgetTemplateItem";

@Component({
  selector: 'app-budget-create',
  templateUrl: './budget-create.component.html',
  styleUrl: './budget-create.component.css'
})
export class BudgetCreateComponent implements OnInit {
  @Input() isCreateModalOpen!: boolean;
  @Output() closeModal = new EventEmitter<void>();
  @Output() budgetCreated = new EventEmitter<void>();
  model: any = {};
  walletList: WalletItem[] = []
  selectedWallet: any;
  currentMonth: string;
  accountId: number = 0;
  budgetList: BudgetTemplateItem[] = [
    {
      budgetTemplateId: 1,
      percentage: 20,
      budgetTemplateName: "Food",
      budgetAmount: 100000
    }
  ];
  monthlyPredictionIncome = 5000000;
  isEditable: boolean[] = this.budgetList.map(() => false);

  toggleEdit(index: number): void {
    this.isEditable[index] = !this.isEditable[index];
    if (!this.isEditable[index]) {
      this.updateAmount(index);
    }
  }

  addBudget() {
    this.budgetList.push({budgetTemplateId: 0, budgetTemplateName: '', percentage: 0, budgetAmount: 0 });
    this.isEditable.push(true);  // Allow the new budget row to be editable initially
  }

  updateAmount(index: number): void {
    const budget = this.budgetList[index];
    budget.budgetAmount = (budget.percentage / 100) * this.monthlyPredictionIncome;
  }

  constructor(private walletService: WalletService, private budgetService: BudgetService, private toastr: ToastrService, private accountService: AccountService) {
    this.currentMonth = new Date().toLocaleString('default', {month: 'long'});
  }

  ngOnInit(): void {
    this.loadWalletList();
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.accountId = user.accountId
        } else {
          console.log("No available token")
        }
      }
    })
  }

  buttonCreateOnclick()
  {
    console.log(this.budgetList)
  }

  onCreateWallet() {
    console.log(this.model)
    if (this.model) {
      this.budgetService.CreateNewBudget(this.model).subscribe({
        next: () => {
          this.budgetCreated.emit(); // Emit the event
          this.close();
        },
        error: error => {
          this.toastr.error()
        }
      });
    }
  }

  loadWalletList(): void {
    this.walletService.GetAllWalletList().subscribe(wallet => {
      this.walletList = wallet;
    });
  }

  close() {
    this.closeModal.emit();
  }

  protected readonly NumberFormat = NumberFormat;
}
