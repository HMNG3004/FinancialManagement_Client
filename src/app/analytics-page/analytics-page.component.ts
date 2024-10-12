import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrl: './analytics-page.component.css'
})
export class AnalyticsPageComponent implements OnInit {
  featureLabelList = [
    {id: 1, label: 'Analytics'},
    {id: 2, label: 'Expense'},
    {id: 3, label: 'Income'},
    {id: 4, label: 'Income vs Expenses'},
    {id: 5, label: 'Balance'},
    {id: 6, label: 'Transaction History'}]

  selectedFeature = this.featureLabelList[1].id;

  handleFeatureItemClick(id: number){
    this.selectedFeature = id;
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
