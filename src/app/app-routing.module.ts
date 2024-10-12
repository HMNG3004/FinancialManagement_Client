import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {MemberLayoutComponent} from "./member-layout/member-layout.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {WalletPageComponent} from "./wallet-page/wallet-page.component";
import {BudgetPageComponent} from "./budget-page/budget-page.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {AnalyticsPageComponent} from "./analytics-page/analytics-page.component";
import {SupportPageComponent} from "./support-page/support-page.component";
import {SettingPageComponent} from "./setting-page/setting-page.component";
import {GoalPageComponent} from "./goal-page/goal-page.component";
import {WalletDetailsPageComponent} from "./wallet-page/wallet-details-page/wallet-details-page.component";
import {BudgetDetailsPageComponent} from "./budget-page/budget-details-page/budget-details-page.component";
import {VerifyOtpComponent} from "./verify-otp/verify-otp.component";
import {authGuard} from "./shared/auth.guard";
import {PasswordPageComponent} from "./password-page/password-page.component";

const routes: Routes = [
  {path: '', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'verify', component: VerifyOtpComponent},
  {
    path: 'member', component: MemberLayoutComponent,
    canActivate: [authGuard],
    children: [
      {path: '', component: DashboardComponent},
      {path: 'wallet', component: WalletPageComponent},
      { path: 'wallet/details/:walletId', component: WalletDetailsPageComponent },
      {path: 'budget', component: BudgetPageComponent},
      {path: 'budget/details/:budgetId/:month/:year', component: BudgetDetailsPageComponent},
      {path: 'goal', component: GoalPageComponent},
      {path: 'profile', component: ProfilePageComponent},
      {path: 'password', component: PasswordPageComponent},
      {path: 'analytics', component: AnalyticsPageComponent},
      {path: 'support', component: SupportPageComponent},
      {path: 'setting', component: SettingPageComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
