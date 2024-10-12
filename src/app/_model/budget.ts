import {IconDefinition} from "@fortawesome/free-regular-svg-icons";

export interface Budget {
  icon: IconDefinition
  name: string;
  currentSpend: number;
  totalBudget: number;
}
