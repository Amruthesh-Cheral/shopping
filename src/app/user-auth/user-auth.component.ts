import { Component, EventEmitter } from '@angular/core';
import { cart, login, product, signUp } from '../data-types';
import { UserService } from '../service/user.service';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {
  signLogin: boolean = true;
  authError: string = '';
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private user: UserService, private product: ProductsService) { }

  ngOnInit(): void {
    this.user.userAuthReload()
    // this.localCartRemoteCart()
  }

  userSignUp(data: signUp) {
    this.user.signUp(data)
    localStorage.removeItem('seller');
  }

  loginUser(data: login) {
    this.authError = '';
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((res) => {
      if (res) {
        this.authError = " User not found"
      } else {
        localStorage.removeItem('seller');
        this.localCartRemoteCart()
      }
    })

  }

  localCartRemoteCart() {
    let savedItems: product[] = JSON.parse(localStorage.getItem('localCart') || '[]');

    if (!Array.isArray(savedItems)) {
      savedItems = []; // Initialize as an empty array if not
    }

    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;
    if (savedItems.length > 0) {
      savedItems?.forEach((product: product, index) => {
        let cardData: cart = {
          ...product,
          productId: product.id,
          userId
        }

        delete cardData.id;
        setTimeout(() => {
          this.product.addtoCart(cardData).subscribe((res) => {
            if (res) {
              console.log("items stored in dB");
            }
          });
          if (savedItems.length === index + 1) {
            localStorage.removeItem('localCart');
            console.log("removed alllll ");
          }
        }, 500);
        console.log(cardData);
      })
    }
    this.product.getAllCartItems(userId)
  }

  alreadyAcc() {
    this.signLogin = !this.signLogin
  }
}
