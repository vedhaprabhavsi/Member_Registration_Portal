import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted= false;
  loading = false;
  isButtonVisible = false;
  isRegButtonVisible = true;
  isUpdateLinkVisible=true;
  isRegLinkVisible=false;
  isRegH1Visible=true;
  isUpdateH1Visible=false;
  custNamePattern = "^[a-zA-Z ]*$";
  contactNoPattern = "^[0-9]{10}$";
  panPattern = "^[A-Z0-9]{12}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  agePattern = "^(?:1[8-9]{1}|[2-9][0-9]|100)$";
  returnUrl: string;
  message='';
  todate: Date;
  countryList: any = ['India', 'Canada', 'USA'];
  stateList: any = ['Tamil Nadu', 'Hyderabad', 'Pune', 'Alberta', 'Yukon', 'Kansas City', 'Washington'];
  
  private map = new Map<string, string[]>([
    ['India', ['Tamil Nadu', 'Hyderabad', 'Pune']],
    ['USA', ['New York', 'Austin']],
    ['Canada', ['Alberta', 'Yukon']]
  ])

  country: string;
  state: string;

  get countries(): string[] {
    return Array.from(this.map.keys());
  }

  get states(): string[] | undefined {
    return this.map.get(this.country);
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) { }

  dispUpdateBtn(){    
    this.isButtonVisible=true;
    this.isRegButtonVisible=false;
    this.isRegLinkVisible=true;
    this.isUpdateLinkVisible=false;
    this.isUpdateH1Visible=true;
    this.isRegH1Visible=false;
    // this.registerForm.controls.custName.disable();
    // this.registerForm.controls.country.disable();
    // this.registerForm.controls.email.disable();
  }

  dispRegBtn() {
    this.isButtonVisible=false;
    this.isRegButtonVisible=true;
    this.isUpdateLinkVisible=true;
    this.isRegLinkVisible=false;
    this.isUpdateH1Visible=false;
    this.isRegH1Visible=true;
  }

  ngOnInit(): void {
    this.todate = new Date();
    this.registerForm = this.formBuilder.group({
      memberId: ['',Validators.required],
      custName: ['', [Validators.required, Validators.pattern(this.custNamePattern)]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      pan: ['', [Validators.required, Validators.pattern(this.panPattern)]],
      contactNo: ['', [Validators.required, Validators.pattern(this.contactNoPattern)]],
      dob: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      regDate: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(){
    this.submitted = true;

    if (this.registerForm.valid) {
      this.message="Member ID R-"+Math.floor(Math.random()*(999-100+1)+100)+" got generated!!";
    }
  }
  logout() {
    //this.router.navigate(['/login']);
    this.auth.logout();
}
}
