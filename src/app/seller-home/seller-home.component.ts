import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { product } from '../data-types';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {
  public allProducts: undefined | product[];
  constructor(private product: ProductsService) {
  }

  ngOnInit(): void {
    this.allProductsList()
  }
  allProductsList(){
    this.product.getProductList().subscribe((list) => {
      this.allProducts = list
    })
  }
  deleteBtn(e: number) {
    this.product.deleteProduct(e).subscribe(res => {
      console.log('Data deleted successfully:', res);
      this.allProductsList()
    },
      error => {
        console.error('Error deleting data:', error);
      })
  }
}
