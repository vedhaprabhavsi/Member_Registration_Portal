import { Component, OnInit } from '@angular/core';
import { Validators,FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted= false;
  loading = false;
  todate: Date;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  pwdPattern = "^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[$@£!%*#?&]).{8,}$";
  error='';
  returnUrl: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit() {
    this.todate = new Date();
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required], //,Validators.max(new Date().getTime())
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],  
      password: ['', [Validators.required, Validators.pattern(this.pwdPattern)]]
    });
  }

  get f() { return this.signupForm.controls; }

  onSubmit(){
    this.submitted = true;

    if (this.signupForm.valid) {
      this.router.navigate(['']);
    }        
  }
}