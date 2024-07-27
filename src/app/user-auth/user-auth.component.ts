import { Component, EventEmitter } from '@angular/core';
import { login, signUp } from '../data-types';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {
  signLogin: boolean = true;
  authError: string = '';
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.user.userAuthReload()
  }

  userSignUp(data: signUp) {
    this.user.signUp(data)
  }

  loginUser(data: login) {
    this.authError = '';
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((res)=>{
      console.log("apple",res);
      if(res){
        this.authError =" plz enter valid user details"
      }
    })

  }
  alreadyAcc() {
    this.signLogin = !this.signLogin
  }
}
