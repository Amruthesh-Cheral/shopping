import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { cart, priceSummary } from '../data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  };
  constructor(private product: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((res) => {
      this.cartData = res;
      let price = 0;
      res.forEach((item) => {
        if (item?.quantinty) {
          price += (++item.productPrice * item?.quantinty);
        } else {
          price += (++item.productPrice);
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);
    })
  }

  checkOut() {
    console.log('clicked');
    
    this.router.navigate(['./check-out'])
  }
}
