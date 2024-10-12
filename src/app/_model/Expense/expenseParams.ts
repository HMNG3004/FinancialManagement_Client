export class ExpenseParams{
  pageNumber = 1;
  pageSize = 10;
  fromWalletId = 0;
  month = new Date().getMonth() + 1;
  year = new Date().getFullYear();
}
