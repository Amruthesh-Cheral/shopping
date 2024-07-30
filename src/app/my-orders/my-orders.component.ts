import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { cart, order } from '../data-types';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orderData: order[] | undefined
  constructor(private product: ProductsService) { }
  ngOnInit(): void {
    this.getOrderList()
  }

  cancelOrder(id: any | undefined) {
    id && this.product.cancelOrder(id).subscribe((res) => {
      this.getOrderList()
    });
  }

  getOrderList() {
    this.product.getOrders().subscribe((e) => {
      this.orderData = e;
      console.log(this.orderData);
    })
  }
}
