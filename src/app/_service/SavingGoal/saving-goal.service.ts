import {Injectable} from '@angular/core';
import {SavingGoal} from "../../_model/SavingGoal/savingGoal";

@Injectable({
  providedIn: 'root'
})
export class SavingGoalService {

  GetAllSavingGoal() {
    let savingList: SavingGoal[] = [
      {name: 'Annual saving', value: 7560000, goal: 27560000},
      {name: 'Headset', value: 1000000, goal: 2500000},
      {name: 'Monitor', value: 1000000, goal: 5000000},
    ]
    return savingList;
  }

  constructor() {
  }
}
