import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-password-page',
  templateUrl: './password-page.component.html',
  styleUrl: './password-page.component.css'
})
export class PasswordPageComponent implements OnInit {
  passwordForm!: FormGroup;
  validationErrors: string[] = [];

  ngOnInit(): void {
    this.initializeForm();
  }

  constructor(private fb: FormBuilder, private route: Router) {
  }

  initializeForm() {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required,
        Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('newPassword')]]
    })
  }

  changeInformation() {
    if (this.passwordForm.valid) {
      console.log('Form submitted:', this.passwordForm.value);
    } else {
      this.displayValidationErrors();
    }
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      const parent = control.parent as FormGroup; // Explicitly cast parent to FormGroup
      return parent && control.value.toString() === parent.controls[matchTo].value
        ? null : { isMatching: true };
    };
  }

  displayValidationErrors() {
    this.validationErrors = [];

    // Check for specific control errors and add to validationErrors array
    if (this.passwordForm.get('accountName')?.invalid) {
      this.validationErrors.push('Account Name is required.');
    }

    if (this.passwordForm.get('email')?.hasError('required')) {
      this.validationErrors.push('Email is required.');
    }

    if (this.passwordForm.get('email')?.hasError('email')) {
      this.validationErrors.push('Email format is invalid.');
    }
  }

  handleNavigation() {
    this.route.navigate(['member/profile'])
  }
}
