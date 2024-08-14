import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { cart, product } from '../data-types';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiHelperService } from '../service/api-helper.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productData: product | undefined;
  productQuantity: number = 1;
  addRemoveBtn: boolean = true;
  cartData2!: product | undefined;
  trendy!: product[];
  constructor(private activateRoute: ActivatedRoute, private product: ProductsService,
    private apiHelper: ApiHelperService
  ) { }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 100,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
  ngOnInit(): void {
    // this.apiHelper.get('product', "hy")

    // GET ROUTE SLUGN NAME
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    // GET ROUTE SLUGN NAME
    this.product.getProduct(productId).subscribe((product) => {
      this.productData = product;
      // console.log(product);
      // let cartData = localStorage.getItem('localCart');
      // if (productId && cartData) {
      //   let item = JSON.parse(cartData);
      //   console.log(item);

      //   item = item.filter((item: product) => productId == item.id.toString())
      //   if (item.length) {
      //     this.addRemoveBtn = false;
      //   } else {
      //     this.addRemoveBtn = true;
      //   }
      // }

      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user)[0].id;
        this.product.getAllCartItems(userId);

        this.product.cartData.subscribe((res) => {
          let item = res.filter((item: any) =>
            productId?.toString() === item.productId?.toString())
          if (item.length) {
            this.cartData2 = item[0]
            this.addRemoveBtn = false;
          }
        })
      }
    })
    this.product.TrendyProducts().subscribe((data) => {
      this.trendy = data
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
      if (localStorage.getItem('user')) {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user)[0].id;
        let dataUser: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id
        }

        delete dataUser.id;
        this.product.addtoCart(dataUser).subscribe((data) => {
          // console.log(data);

          if (data) {
            this.product.getAllCartItems(userId);
            this.addRemoveBtn = false;
          }
        })
      }
      else {
        let userId = this.productData.id;
        let dataUser2: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id
        }
        delete dataUser2.id;

        this.product.addtoCart(dataUser2).subscribe((data) => {
          if (data) {
            this.product.getAllCartItems(userId);
            this.addRemoveBtn = false;
          }
        })
      }
    }
  }
  // ADD TO CART ITEMS

  // REMOVE CART ITEMS

  removeCart() {
    this.product.removeToCart(this.cartData2?.id).subscribe((res) => {

      if (res) {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user)[0].id;
        this.product.getAllCartItems(userId);
        this.addRemoveBtn = true;
      }
    })
  }
  // removeCartV2(cartId: any) {
  //   cartId && this.product.removeToCart(cartId).subscribe((res) => {
  //     if (res) {
  //       console.log(res, 'deleted');
  //       let user = localStorage.getItem('user');
  //       let userId = user && JSON.parse(user)[0].id;
  //       let test =this.product.getAllCartItems(userId);
  //       console.log(test);

  //       // this.allItemsload()
  //     }
  //   })
  // }


  // removeCart(productId: any) {

  //   let user = localStorage.getItem('user');
  //   let userId = user && JSON.parse(user)[0].id;
  //   console.log(userId,productId);

  //   productId && this.product.cartItems().subscribe((res) => {
  //     res.forEach((item) => {
  //       console.log(item.productId, productId);
  //       if (item.productId === productId) {
  //         this.product.removeCart(productId);
  //         let user = localStorage.getItem('user');
  //         let userId = user && JSON.parse(user)[0].id;
  //         let test = this.product.getAllCartItems(productId);
  //         console.log(test);
  //         console.log("response", res);
  //         this.addRemoveBtn = true;
  //       }

  //     })

  //   })
  // }

  // removeCart1(productId: any) {

  //   productId && this.product.removeToCart(this.productData?.id).subscribe((res) => {
  //     // console.log(res,'remove cart details page');

  //     if (res) {
  //       this.product.getAllCartItems(productId);
  //       this.addRemoveBtn = true;
  //     }
  //   })

  //   if (!localStorage.getItem('user')) {
  //     this.product.removeCart(productId);
  //     this.addRemoveBtn = true;
  //   }
  //   else {
  //     let user = localStorage.getItem('user');
  //     let userId = user && JSON.parse(user)[0].id;
  //     this.cartData2 && this.product.removeToCart(this.cartData2?.id).subscribe((res) => {
  //       if (res) {
  //         this.product.getAllCartItems(userId);
  //       }
  //     })
  //     this.addRemoveBtn = true;
  //   }

  // }


}

// REMOVE CART ITEMS

