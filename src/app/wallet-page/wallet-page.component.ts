import {Component, OnInit} from '@angular/core';
import {
  faArrowTrendDown,
  faArrowTrendUp,
  faBuildingColumns,
  faCreditCard,
  faMoneyBillWave, faSquarePlus, faWallet, faChevronRight, faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {NumberFormat} from "../util/moneyFormat";
import dayjs from "dayjs";
import {WalletService} from "../_service/Wallet/wallet.service";
import {WalletItem} from "../_model/Wallet/WalletItem";
import {faBitcoin} from "@fortawesome/free-brands-svg-icons";
import {ToastrService} from "ngx-toastr";
import {WalletOverviewItem} from "../_model/Wallet/WalletOverviewItem";

import {faCcMastercard} from "@fortawesome/free-brands-svg-icons"
import {Router} from "@angular/router";

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrl: './wallet-page.component.css'
})
export class WalletPageComponent implements OnInit {
  walletList: WalletItem[] = [];
  selectedWallet: number = 0;
  selectedWalletItem!: WalletOverviewItem;
  protected readonly faBuildingColumns = faBuildingColumns;
  protected readonly faSquarePlus = faSquarePlus;
  protected readonly NumberFormat = NumberFormat;
  lineChartData: any;
  lineChartOptions: any;

  protected readonly faArrowTrendUp = faArrowTrendUp;
  protected readonly faArrowTrendDown = faArrowTrendDown;
  protected readonly faChevronRight = faChevronRight;
  protected readonly faCcMastercard = faCcMastercard;
  protected readonly dayjs = dayjs;


  isModalOpen: boolean = false;
  isModalDeleteOpen: boolean = false;

  constructor(private walletService: WalletService, private toastr: ToastrService, private router: Router) {
  }


  testDate: Date | undefined = new Date()

  ngOnInit(): void {
    document.documentElement.style.setProperty('--text-color', '#e30b0b');
    document.documentElement.style.setProperty('--text-color-secondary', '#000000');

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.lineChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          data: [10, 20, 30, 40, 50, 60],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1,
          fill: true
        }
      ]
    };


    this.lineChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
            font: {
              size: 14
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              size: 14
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    this.loadWalletList();
  }

  loadWalletList(): void {
    this.walletService.GetAllWalletList().subscribe(wallet => {
      this.walletList = wallet;
      this.selectedWallet = wallet[0].walletId;
      // this.walletService.GetWalletOverview(wallet[0].walletId).subscribe(overviewItem => {
      //   this.selectedWalletItem = overviewItem
      // });
    });
  }

  selectWallet(index: number): void {
    this.selectedWallet = index;
    // this.walletService.GetWalletOverview(index).subscribe(overviewItem => {
    //   this.selectedWalletItem = overviewItem
    // });
  }

  deleteWallet(walletId: number) {

  }

  toggleCreateModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  toggleDeleteModal() {
    this.isModalDeleteOpen = !this.isModalDeleteOpen;
  }

  handleCreateOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      this.toggleCreateModal();
    }
  };

  handleDeleteModalOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      this.toggleDeleteModal();
    }
  };

  handleDetailsButtonClicked(walletId: number) {
    this.router.navigate(['/member/wallet/details', walletId])
  }

  getIconForWalletType(walletType: number): any {
    switch (walletType) {
      case 1:
        return faMoneyBillWave; //cash money
      case 2:
        return faBuildingColumns; // bank account
      case 3:
        return faCreditCard; //credit card
      case 4:
        return faWallet; // digital wallet
      case 5:
        return faBitcoin //crypto wallet
      default:
        return faBuildingColumns; // default icon
    }
  }

  onWalletCreated(): void {
    console.log("method run")
    this.toastr.success("New wallet created")
    this.loadWalletList();
  }

  protected readonly faPlus = faPlus;
}
