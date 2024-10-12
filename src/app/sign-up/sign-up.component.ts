import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AccountService} from "../_service/Account/account.service";
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  model: any = {};
  public loading = false;

  constructor(private router: Router, private accountService: AccountService, private toastr: ToastrService) {
  }

  onSignInClick() {
    this.router.navigate(['/'])
  }

  onSignUpClick(form: NgForm) {
    if (form.invalid) {
      this.toastr.error("Please fill out the form correctly.");
      return;
    }
    this.loading = true;
    this.accountService.register(this.model).subscribe({
      next: response => {
        this.toastr.success('Register success')
        this.router.navigate(['/'])
      },
      error: error => {
        this.loading = false;
        this.toastr.error(error.error.message)
      }
    });
  }
}
