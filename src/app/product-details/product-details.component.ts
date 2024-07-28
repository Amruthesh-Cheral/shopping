import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { cart, product } from '../data-types';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productData: product | undefined;
  productQuantity: number = 1;
  addRemoveBtn: boolean = true;
  constructor(private activateRoute: ActivatedRoute, private product: ProductsService) {

  }
  ngOnInit(): void {
    // GET ROUTE SLUGN NAME
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    // GET ROUTE SLUGN NAME
    this.product.getProduct(productId).subscribe((product) => {
      this.productData = product;
      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let item = JSON.parse(cartData);
        item = item.filter((item: product) =>
          productId == item.id.toString())
        if (item.length) {
          this.addRemoveBtn = false;
        } else {
          this.addRemoveBtn = true;
        }

      }
    })
  }
  // ADD COUNT
  handleClick(val: string) {
    if (val === 'min') {
      this.productQuantity++
    } else {
      this.productQuantity--
    }
  }
  // ADD COUNT

  // ADD TO CART ITEMS
  addToCart() {
    if (this.productData) {
      this.productData.quantinty = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.addTocartSer(this.productData)
        this.addRemoveBtn = false;
        console.warn('user is there');
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user)[0].id;
        console.log(this.productData.id);
        
        let dataUser: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id
        }
        delete dataUser.id;
        this.product.addtoCart(dataUser).subscribe((data)=>{
          if (data) {
              alert("cart items added")
          }else{
            
          }
        })
        console.warn(dataUser);
      }

    }
  }
  // ADD TO CART ITEMS

  // REMOVE CART ITEMS
  removeCart(product: any) {
    this.product.removeCart(product);
    this.addRemoveBtn = true;
  }
  // REMOVE CART ITEMS
}
