import { Component } from '@angular/core';
import { SellerService } from '../service/seller.service';
import { login, signUp } from '../data-types';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent {
  signLogin: boolean = true;
  authError: string = '';
  constructor(private seller: SellerService) { }
  ngOnInit(): void {
    this.seller.reloadSeller()
  }
  signUp(data: signUp): void {
    this.seller.userSignup(data)
  }
  login(data: login) {
    this.authError = '';
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError: any) => {
      if (isError) {
        this.authError = " Email password is not correct"
      }
    })
  }
  alreadyAcc() {
    this.signLogin = !this.signLogin
  }
}
