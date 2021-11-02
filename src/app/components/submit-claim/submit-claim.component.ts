import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-submit-claim',
  templateUrl: './submit-claim.component.html',
  styleUrls: ['./submit-claim.component.css']
})
export class SubmitClaimComponent implements OnInit {
  submitForm: FormGroup;
  submitted = false;
  loading = false;
  todate: Date;
  firstNamePattern = "^[a-zA-Z ]*$";
  lastNamePattern = "^[a-zA-Z ]*$";
  billAmtPattern = "^[0-9]+(\.[0-9][0-9]?)?$";
  returnUrl: string;
  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.todate = new Date();
    this.submitForm = this.formBuilder.group({
      memberId: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.pattern(this.firstNamePattern)]],
      lastName: ['', [Validators.required, Validators.pattern(this.lastNamePattern)]],
      dob: ['', Validators.required],
      doa: ['', Validators.required],
      dod: ['', Validators.required],
      provider: ['', Validators.required],
      billAmt: ['', [Validators.required, Validators.pattern(this.billAmtPattern)]]
    });
  }

  get f() { return this.submitForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.submitForm.valid) {
      this.message = "Claim # " + Math.floor(1000000000 + Math.random() * 9000000000) + " generated successfully!!";
    }
  }

  logout() {
    //this.router.navigate(['login']);
    this.auth.logout();
  }
}