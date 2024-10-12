import {Component, OnInit} from '@angular/core';
import {NumberFormat} from "../../util/moneyFormat";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import {IncomeView} from "../../_model/Income/IncomeView";
import {IncomeBreakdown} from "../../_model/Income/incomeBreakdown";
import {IncomeService} from "../../_service/Income/income.service";

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent implements OnInit {
  colors: string[] = ['#E74C3C', '#2ECC71', '#3498DB', '#9B59B6', '#F1C40F', '#E67E22'];
  protected readonly NumberFormat = NumberFormat;
  protected readonly faCircle = faCircle;
  protected readonly dayjs = dayjs;
  incomeData: any;
  options: any;
  isModalCreateOpen: boolean = false;
  isModalUpdateOpen: boolean = false;
  incomeIdSelected: number = 0;

  emptyText = 'No data'

  incomeList: IncomeView[] = []
  breakDownList: IncomeBreakdown[] = []
  label: string[] = []
  data: number[] = []

  constructor(private incomeService: IncomeService) {
  }
  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };

    this.loadIncomeMonthlyList();
    this.loadIncomeMonthlyBreakdown();
  }

  selectIncomeItemEdit(incomeId: number) {
    this.incomeIdSelected = incomeId;
    this.toggleModelUpdate();
  }

  toggleModelCreate() {
    this.isModalCreateOpen = !this.isModalCreateOpen;
  }

  toggleModelUpdate() {
    this.isModalUpdateOpen = !this.isModalUpdateOpen;
  }

  handleModalCreateOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      this.toggleModelCreate();
    }
  };

  handleModalUpdateOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      this.toggleModelUpdate();
    }
  };

  loadIncomeMonthlyList() {
    this.incomeService.GetIncomeMonthlyView().subscribe(income => {
      this.incomeList = income
    });
  }

  loadIncomeMonthlyBreakdown() {
    this.incomeService.getIncomeBreakdown().subscribe(income => {
      this.breakDownList = income;
      this.label = income.map(item => item.categoryName);
      this.data = income.map(item => item.totalAmount);

      this.incomeData = {
        labels: this.label,
        datasets: [
          {
            data: this.data,
            backgroundColor: this.colors,
            hoverBackgroundColor: this.colors,
          }
        ]
      };
    })
  }

  onIncomeCreated() {
    this.loadIncomeMonthlyList();
  }
}
