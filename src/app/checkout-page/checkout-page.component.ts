import { Component } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { cart, order } from '../data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent {
  totalPrice: number | undefined;
  productURL!: string;
  cartData: cart[] | undefined
  constructor(private product: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.product.cartItems().subscribe((res) => {
      
      let price = 0;
      this.cartData = res,
       res.forEach((e)=>{
        this.productURL = e.productURL 
       })

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

  orderNow(data: order) {
    let user = localStorage.getItem('user');
   
    
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        productURL: this.productURL,
        id: undefined
      }
      console.log(orderData,'orderDataaa');
      
      this.product.orderNow(orderData).subscribe((res) => {
        if (res) {
          this.router.navigate(['./my-orders'])
        }
      })
    }
  }
}
