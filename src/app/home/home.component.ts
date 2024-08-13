import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { cart, product } from '../data-types';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // popular!: product[];
  trendyData!: product;
  trendy!: product[];
  addRemoveBtn: boolean = true;
  productData: product | undefined;
  cartData2!: product | undefined;
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
  poster: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
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
        items: 2
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  feedBack: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 100,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  constructor(private products: ProductsService) {
  }

  ngOnInit(): void {
    this.products.TrendyProducts().subscribe((data) => {
      // console.log(data);

      this.trendy = data;
    })

  }

  // ADD TO CART ITEMS
  addToCart(val: string | undefined) {
    if (this.trendy) {
      if (!localStorage.getItem('user')) {
        
        this.products.addTocartSer({
          ...this.trendyData,
          productId: val
        })
        this.addRemoveBtn = false;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user)[0].id;

        let dataUser: cart = {
          ...this.trendyData,
          userId,
          productId: this.trendyData.id
        }

        delete dataUser.id;

        this.products.addtoCart(dataUser).subscribe((data) => {
          if (data) {
            this.products.getAllCartItems(userId);
            this.addRemoveBtn = false;
          }
        })
        // console.warn(dataUser);
      }
    }
  }
  // ADD TO CART ITEMS

  // REMOVE CART ITEMS
  removeCart(productId: any) {
    if (!localStorage.getItem('user')) {
      this.products.removeCart(productId);
      this.addRemoveBtn = true;
    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user)[0].id;
      this.cartData2 && this.products.removeToCart(this.cartData2?.id).subscribe((res) => {
        if (res) {
          this.products.getAllCartItems(userId);
        }
      })
      this.addRemoveBtn = true;
    }
  }
  // REMOVE CART ITEMS

}
