import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { login, signUp } from '../data-types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoginError: any;
  invalidUserAuth = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }
  signUp(data: signUp): void {
    this.http.post("http://localhost:3000/user", data, { observe: 'response' }).subscribe((res) => {
      console.log(res);
      if (res) {
        localStorage.setItem('user', JSON.stringify(res.body));
        this.router.navigate(['./'])
      }
    })
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['./home']);
    }
  }

  userLogin(data: login) {
    this.http.get<signUp>(`http://localhost:3000/user?name=${data.name}&password=${data.password}`).subscribe((res: any) => {
      console.log(res);
      if (res[0]) {
        this.invalidUserAuth.emit(false);
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['./home'])

      } else {
        this.invalidUserAuth.emit(true);
      }
    })
  }
}
