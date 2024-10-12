import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AccountService} from "../_service/Account/account.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent {
  otp: string | undefined;
  showOtpComponent = true;

  onOtpChange(otp: string | undefined) {
    this.otp = otp;
    console.log(this.otp);
  }

  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: true,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  loading = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router, private accountService: AccountService, private toastr: ToastrService) {
  }

  // Handle OTP form submission
  onOtpSubmit(form: NgForm) {
    // Check if form is valid
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.loading = true;

    if (this.otp)
      this.accountService.verifyOtp(this.otp).subscribe({
        next: response => {
          this.loading = false;
          this.router.navigate(['/member'])
        },
        error: error => {
          this.loading = false;
          this.toastr.error(error.error.message)
        }
      });
  }
}
