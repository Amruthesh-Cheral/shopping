import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { login, signUp } from '../data-types';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggenIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)
  constructor(public http: HttpClient, private router: Router) { }

  // USER SIGN IN FORM
  userSignup(data: signUp) {
    this.http.post('http://localhost:3000/seller', data)
      .subscribe((res: any) => {
        this.isSellerLoggenIn.next(true);
        localStorage.setItem('seller', JSON.stringify(res));
        this.router.navigate(['seller-home'])
      })
  }
  // USER SIGN IN FORM
  // USER LOGIN IN FORM
  userLogin(data: login) {
    this.http.get(`http://localhost:3000/seller?name=${data.name}&password=${data.password}`)
      .subscribe((res: any) => {
        console.log(res);
        
        if (res[0]) {
          localStorage.setItem('seller', JSON.stringify(res))
          this.router.navigate(['seller-home'])
        } else {
          this.isLoginError.emit(true)
        }
        
      })
  }
  // USER LOGIN IN FORM

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggenIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }
}
