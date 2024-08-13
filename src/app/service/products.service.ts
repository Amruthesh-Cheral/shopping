import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cartData = new EventEmitter<product[]>;
  constructor(private http: HttpClient) { }

  addProduct(data: any) {
    return this.http.post('http://localhost:3000/products', data)
  }
  getProductList() {
    return this.http.get<product[]>('http://localhost:3000/products')
  }
  deleteProduct(id: any) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  getProduct(id: any) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }
  getProductsUpdate(id: any) {
    return this.http.get<product[]>(`http://localhost:3000/products/${id}`)
  }
  updateProducts(product: product) {
    return this.http.put<product[]>(`http://localhost:3000/products/${product?.id}`, product)
  }
  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3')
  }
  TrendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=7')
  }
  searchProducts(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${{ query }}`)
  }
  getAllCartItems(userId: any) {
    return this.http.get<product[]>(`http://localhost:3000/cart?userId=` + userId, { observe: 'response' }).subscribe((res) => {
      if (res && res.body) {
        this.cartData.emit(res.body)
      }
    })
  }

  addTocartSer(data: product) {
    let cartData = [];
    let localData = localStorage.getItem('localCart');
    if (!localData) {
      localStorage.setItem('localCart', JSON.stringify([data]))
      this.cartData.emit([data])
    }
    else {
      cartData = JSON.parse(localData)
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData))
      this.cartData.emit(cartData);
    }
  }

  // REMOVE CART SERVICE
  removeCart(productId: any) {
    console.log(productId);

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id)
      localStorage.setItem('localCart', JSON.stringify(items))
      this.cartData.emit(items)
    }

  }
  // REMOVE CART SERVICE
  // ADD CART ALERT
  addtoCart(cartData: cart) {
    if (!localStorage.getItem('user')) {
      return this.http.post('http://localhost:3000/wCart', cartData);
    }
    return this.http.post('http://localhost:3000/cart', cartData);
  }
  // ADD CART ALERT
  // REMOVE TO CART
  removeToCart(productId: any) {
    console.log(productId,'service remove product id');
    return this.http.delete(`http://localhost:3000/cart/` + productId);
  }
  // REMOVE TO CART
  // ALL CART ITEMS
  cartItems() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore)[0];
    
    if (userData) {
      this.cartData.emit(userData);
      return this.http.get<cart[]>(`http://localhost:3000/cart?userId=` + userData.id);
    } else {
      this.cartData.emit(userData);
      return this.http.get<cart[]>(`http://localhost:3000/wCart`);
    }
  }
  // ALL CART ITEMS
  // CURRENT CART
  // currentCart() {
  //   let userStore = localStorage.getItem('user');
  //   let userData = userStore && JSON.parse(userStore)[0];  
  //   return this.http.get<cart[]>(`http://localhost:3000/cart?userId=` + userData.id);
  // }
  // CURRENT CART 
  // ORDER NOW
  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }
  // ORDER NOW
  // GET ALL ORDERS
  getOrders() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore)[0];
    return this.http.get<order[]>(`http://localhost:3000/orders?userId=` + userData.id);
  }
  // GET ALL ORDERS
  // CANCEL ORDER
  cancelOrder(productId: order) {
    return this.http.delete(`http://localhost:3000/orders/` + productId);
  }
  // CANCEL ORDER
}
