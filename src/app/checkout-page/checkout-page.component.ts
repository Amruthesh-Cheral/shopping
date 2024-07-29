import { Component } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { order } from '../data-types';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent {
  totalPrice: number | undefined;
  constructor(private product: ProductsService) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((res) => {
      let price = 0;
      res.forEach((item) => {
        if (item?.quantinty) {
          price += (++item.productPrice * item?.quantinty);
        } else {
          price += (++item.productPrice);
        }
        this.totalPrice = price + (price / 10) + 100 - (price / 10);
      });
    })
  }

  orderNow(data:order) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData = {
        ...data,
        totalPrice: this.totalPrice,
        userId
      }
      this.product.orderNow(orderData).subscribe((res)=>{
        console.log(res,'push to db');
      })
    }
  }
}
