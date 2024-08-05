import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = ''
  userName: string = '';
  cartCount: number = 0;
  constructor(private route: Router, private product: ProductsService) { }
  ngOnInit() {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        // if (val.url?.includes('seller') && localStorage.getItem('seller')) {
        if (localStorage.getItem('seller')) {
          this.menuType = 'seller'
          let sellStore = localStorage.getItem('seller')
          let selJsonVal = sellStore && JSON.parse(sellStore)
          this.sellerName = selJsonVal[0].name;
        } else if (localStorage.getItem('user')) {
          this.menuType = 'user'
          let userStore = localStorage.getItem('user')
          let userJsonVal = userStore && JSON.parse(userStore)
          this.userName = userJsonVal[0].name;
          this.product.getAllCartItems(userJsonVal[0].id);
        } else {
          this.menuType = 'default';
          // console.log(this.cartCount);

        }
      }
    })

    let localCart = localStorage.getItem(`localCart`);

    if (localCart) {
      this.cartCount = JSON.parse(localCart).length;
    }

    this.product.cartData.subscribe((items) => {
      this.cartCount = items.length;

    })


  }
  logOut() {
    localStorage.removeItem('seller');
    this.route.navigate(['./seller-auth'])
    this.product.cartData.emit([])
  }
  UserlogOut() {
    localStorage.removeItem('user');
    this.route.navigate(['./user-auth']);
    this.product.cartData.emit([])
  }
}
