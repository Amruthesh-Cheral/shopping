import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-types';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent implements OnInit {

  addMsg: string | undefined;
  productData: any;
  constructor(private route: ActivatedRoute, private products: ProductsService) {
  }
  ngOnInit(): void {
    let productsId = this.route.snapshot.paramMap.get('id');
    productsId && this.products.getProductsUpdate(productsId).subscribe((data) => {
      this.productData = data
      console.log(data);
    })

  }
  updateProduct(data: product) {
  
    if(this.productData){
      data.id = this.productData?.id
    }
    this.products.updateProducts(data).subscribe((ans) => {
      if (ans) {
        this.addMsg = 'Product has Updated'
      }
    });
    setTimeout(() => {
      this.addMsg = undefined;
    }, 3000)
  }
}
