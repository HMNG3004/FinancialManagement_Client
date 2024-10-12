import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TextInputComponent} from './_forms/text-input/text-input.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from './dashboard/dashboard.component';
import {ShareModule} from "./_module/share.module";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NavbarComponent} from './navbar/navbar.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MemberLayoutComponent} from './member-layout/member-layout.component';
import {WalletPageComponent} from './wallet-page/wallet-page.component';
import {BudgetPageComponent} from './budget-page/budget-page.component';
import {GoalPageComponent} from './goal-page/goal-page.component';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {AnalyticsPageComponent} from './analytics-page/analytics-page.component';
import {SupportPageComponent} from './support-page/support-page.component';
import {SettingPageComponent} from './setting-page/setting-page.component';
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {ChartModule} from 'primeng/chart';
import {registerLocaleData} from '@angular/common';
import vi from '@angular/common/locales/vi';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NzProgressComponent} from "ng-zorro-antd/progress";
import {JWTInterceptor} from "./interceptor/JWT.interceptor";
import {WalletCreateComponent} from './wallet-page/wallet-create/wallet-create.component';
import {WalletDeleteComponent} from './wallet-page/wallet-delete/wallet-delete.component';
import {AnalyticsComponent} from './analytics-page/analytics/analytics.component';
import {ExpenseComponent} from './analytics-page/expense/expense.component';
import {IncomeComponent} from './analytics-page/income/income.component';
import {IncomeVsExpenseComponent} from './analytics-page/income-vs-expense/income-vs-expense.component';
import {BalanceComponent} from './analytics-page/balance/balance.component';
import {TransactionHistoryComponent} from './analytics-page/transaction-history/transaction-history.component';
import {NzEmptyComponent, NzEmptyDefaultComponent} from "ng-zorro-antd/empty";
import {ExpenseCreateComponent} from './analytics-page/expense/expense-create/expense-create.component';
import {NzTableComponent, NzTableModule, NzTdAddOnComponent, NzTrExpandDirective} from "ng-zorro-antd/table";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {ExpenseUpdateComponent} from './analytics-page/expense/expense-update/expense-update.component';
import {IncomeCreateComponent} from './analytics-page/income/income-create/income-create.component';
import {IncomeUpdateComponent} from './analytics-page/income/income-update/income-update.component';
import {MatPaginator} from "@angular/material/paginator";
import {BudgetCreateComponent} from './budget-page/budget-create/budget-create.component';
import {NgxLoadingModule} from "ngx-loading";
import {NzSpinComponent, NzSpinModule} from "ng-zorro-antd/spin";
import {ErrorInterceptor} from "./interceptor/Error.interceptor";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {ExpensePageComponent} from './analytics-page/expense-page/expense-page.component';
import {WalletDetailsPageComponent} from './wallet-page/wallet-details-page/wallet-details-page.component';
import {BudgetDetailsPageComponent} from './budget-page/budget-details-page/budget-details-page.component';
import {VerifyOtpComponent} from './verify-otp/verify-otp.component';
import {NgOtpInputModule} from "ng-otp-input";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzBadgeComponent} from "ng-zorro-antd/badge";
import { LucideAngularModule, icons } from 'lucide-angular';
import { PasswordPageComponent } from './password-page/password-page.component';

registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    DashboardComponent,
    NavbarComponent,
    SignUpComponent,
    SignInComponent,
    MemberLayoutComponent,
    WalletPageComponent,
    BudgetPageComponent,
    GoalPageComponent,
    ProfilePageComponent,
    AnalyticsPageComponent,
    SupportPageComponent,
    SettingPageComponent,
    WalletCreateComponent,
    WalletDeleteComponent,
    AnalyticsComponent,
    ExpenseComponent,
    IncomeComponent,
    IncomeVsExpenseComponent,
    BalanceComponent,
    TransactionHistoryComponent,
    ExpenseCreateComponent,
    ExpenseUpdateComponent,
    IncomeCreateComponent,
    IncomeUpdateComponent,
    BudgetCreateComponent,
    ExpensePageComponent,
    WalletDetailsPageComponent,
    BudgetDetailsPageComponent,
    VerifyOtpComponent,
    PasswordPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ShareModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatTabGroup,
    MatTab,
    FontAwesomeModule,
    MatIcon,
    MatMenu,
    MatMenuTrigger,
    ChartModule,
    HttpClientModule,
    NzProgressComponent,
    NzEmptyDefaultComponent,
    NzTableComponent,
    NzPopconfirmDirective,
    NzEmptyComponent,
    MatPaginator,
    NgxLoadingModule.forRoot({}),
    NzSpinModule,
    NzSpinComponent,
    NzDatePickerComponent,
    NgOtpInputModule,
    NzDividerComponent,
    NzDropdownMenuComponent,
    NzBadgeComponent,
    NzTdAddOnComponent,
    NzTrExpandDirective,
    NzDropDownDirective,
    NzTableModule,
    LucideAngularModule.pick(icons)
  ],
  providers: [
    provideAnimationsAsync(),
    {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
