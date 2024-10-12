import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../_service/Account/account.service";

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService)
  const router = inject(Router);

  // Check if the user is logged in
  if (accountService.isLoggedIn()) {
    return true; // User is logged in, allow access
  } else {
    // Redirect to login page if not logged in
    router.navigate(['/']); // Adjust the route according to your application's structure
    return false; // User is not logged in, block access
  }
};
