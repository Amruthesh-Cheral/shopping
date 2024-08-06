import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  userlogin(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true')
      this.router.navigate(['home'])
    }, err => {
      alert("Something went wrong")
      this.router.navigate(['/login'])
    })
  }
  userResgister(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(() => {
      alert("registration success")
      this.router.navigate(['/login'])
    }
      , err => {
        alert("Something went wrong")
        this.router.navigate(['/registration'])
      })
    }
    userLogOut(){
      this.fireAuth.signOut().then(()=>{
        localStorage.removeItem('token');
        this.router.navigate(['/login'])
    }, err => {
      alert("Something went wrong")
      this.router.navigate(['/login'])
    })
  }
}
