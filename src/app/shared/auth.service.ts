import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }

  setToken(token: string){
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(){
    return this.getToken() !== null;
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
