import {Component} from '@angular/core';
import {AccountService} from "../_service/Account/account.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  model: any = {};
  public loading = false;

  constructor(private router: Router, private accountService: AccountService, private toastr: ToastrService) {
  }

  onSignUpClick() {
    this.router.navigate(['/sign-up'])
  }

  onSignInClick(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.loading = true;

    this.accountService.login(this.model).subscribe({
      next: response => {
        this.loading = false;
        this.router.navigate(['/verify'])
      },
      error: error => {
        this.loading = false;
        this.toastr.error(error.error.message)
      }
    });
  }
}
