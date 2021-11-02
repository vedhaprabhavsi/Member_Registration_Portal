import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  submitted = false;
  loading = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  pwdPattern = "^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[$@£!%*#?&]).{8,}$";
  returnUrl: string;
  error = '';
  userIDs: string[];
  creds: string[];
  isLoginMode = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this.pwdPattern)]]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.f.username.value == "test@test.com" && this.f.password.value == "Test@Te1") {
      console.log('Login Successful!');
      this.auth.setToken('abcdefghijklmnop');
      this.router.navigate(['register']);
    }
    else if (this.f.username.value == "test@test.com" && !(this.f.password.value == "Test@Te1")) {
      this.error = "You have entered incorrect Username and Password!"
    }
    else {
      this.error = "You don't have an account. Please signup!"
    }
  }
}
