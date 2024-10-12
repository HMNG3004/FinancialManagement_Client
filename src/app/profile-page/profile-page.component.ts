import {Component, OnInit} from '@angular/core';
import {text} from "@fortawesome/fontawesome-svg-core";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  accountForm!: FormGroup;
  validationErrors: string[] = [];

  ngOnInit(): void {
    this.initializeForm();
  }

  constructor(private fb: FormBuilder, private route: Router) {
  }

  initializeForm() {
    this.accountForm = this.fb.group({
      accountName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  changeInformation() {
    if (this.accountForm.valid) {
      console.log('Form submitted:', this.accountForm.value);
    } else {
      this.displayValidationErrors();
    }
  }

  displayValidationErrors() {
    this.validationErrors = [];

    // Check for specific control errors and add to validationErrors array
    if (this.accountForm.get('accountName')?.invalid) {
      this.validationErrors.push('Account Name is required.');
    }

    if (this.accountForm.get('email')?.hasError('required')) {
      this.validationErrors.push('Email is required.');
    }

    if (this.accountForm.get('email')?.hasError('email')) {
      this.validationErrors.push('Email format is invalid.');
    }
  }

  handleNavigation(){
    this.route.navigate(['member/password'])
  }
}
