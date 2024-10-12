import {Component, OnInit} from '@angular/core';
import {faChevronRight, faPlus, faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import {ToastrService} from "ngx-toastr";
import {BudgetService} from "../_service/Budget/budget.service";
import {BudgetItem} from "../_model/Budget/BudgetItem";
import {NumberFormat} from "../util/moneyFormat";
import {Router} from "@angular/router";

@Component({
  selector: 'app-budget-page',
  templateUrl: './budget-page.component.html',
  styleUrl: './budget-page.component.css'
})
export class BudgetPageComponent implements OnInit {
  months: string[] = [];
  selectedYear: number = new Date().getFullYear();
  currentMonthIndex: number = new Date().getMonth();

  generateMonths(year: number): void {
    this.months = Array.from({length: 12}, (_, index) =>
      new Date(year, index, 1).toLocaleString('default', {month: 'long'})
    );
  }

  onMonthChange(event: any): void {
    this.currentMonthIndex = event.index;
    this.loadBudgetList();
  }

  emptyText = 'No data'
  isCreateModalOpen: boolean = false;
  isModalDeleteOpen: boolean = false;
  protected readonly faSquarePlus = faSquarePlus;
  budgetList: BudgetItem[] = [];
  budgetListIsLoading = false;
  showCreateCard = false;

  constructor(private toastr: ToastrService, private budgetService: BudgetService, private router: Router) {
    this.generateMonths(this.selectedYear);
  }

  ngOnInit(): void {
    this.loadBudgetList();
  }

  toggleCreateModal() {
    this.isCreateModalOpen = !this.isCreateModalOpen;
  }

  toggleDeleteModal() {
    this.isModalDeleteOpen = !this.isModalDeleteOpen;
  }

  handleCreateOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      this.toggleCreateModal();
    }
  };

  handleDetailsButtonClicked(budgetId: number) {
    this.router.navigate(['/member/budget/details', budgetId, this.currentMonthIndex + 1, this.selectedYear])
  }

  loadBudgetList() {
    const month = this.currentMonthIndex + 1;
    const year = this.selectedYear;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;

    this.showCreateCard = (year > currentDate.getFullYear()) || (year === currentDate.getFullYear() && month > currentMonth);

    this.budgetListIsLoading = true;
    this.budgetService.GetAllBudgetList(month, year).subscribe(budget => {
      this.budgetList = budget;
      this.budgetListIsLoading = false;
    });

  }

  onWalletCreated(): void {
    console.log("method run")
    this.toastr.success("New budget created")
    this.loadBudgetList();
  }

  protected readonly NumberFormat = NumberFormat;
  protected readonly faPlus = faPlus;
  protected readonly faChevronRight = faChevronRight;
}
