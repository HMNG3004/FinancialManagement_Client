import {Component, OnInit} from '@angular/core';
import {faArrowTrendDown, faArrowTrendUp} from "@fortawesome/free-solid-svg-icons";
import {NumberFormat} from "../../util/moneyFormat";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit{
  data: any;

  options: any;
  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          type: 'bar',
          label: 'Dataset 1',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          data: [50, 25, 12, 48, 90, 76, 42]
        },
        {
          type: 'bar',
          label: 'Dataset 2',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: [21, 84, 24, 75, 37, 65, 34]
        },
        {
          type: 'bar',
          label: 'Dataset 3',
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          data: [41, 52, 24, 74, 23, 21, 32]
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
        },
        legend: {
          display: false,
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          stacked: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  protected readonly faArrowTrendUp = faArrowTrendUp;
  protected readonly NumberFormat = NumberFormat;
  protected readonly faArrowTrendDown = faArrowTrendDown;
  statisticItem = [
    {label: 'Daily average', value: 9360000},
    {label: 'Change', value: 2050000},
    {label: 'Total Transaction', value: 2050000},
    {label: 'Categories', value: 5000000},
  ];
}
