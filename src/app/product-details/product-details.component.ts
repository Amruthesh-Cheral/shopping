import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { product } from '../data-types';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productData: product | undefined;
  productQuantity:number = 1;
  constructor(private activateRoute: ActivatedRoute, private product: ProductsService) {

  }
  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
     this.product.getProduct(productId).subscribe((product) => {
     this.productData = product;
    })
  }

  handleClick(val:string){
    if(val === 'min'){
      this.productQuantity++
    }else {
      this.productQuantity--
    }    
  }
  addToCart(){
    if(this.productData){
      this.productData.quantinty = this.productQuantity;
      if(localStorage.getItem('user')){
        this.product.addTocartSer(this.productData)
        console.warn('user is there');
      }else {
        console.warn('no user is there');
      }
      
    }
  }
}
