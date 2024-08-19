import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-types';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../core/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cartData = new EventEmitter<product[]>;
  constructor(private http: HttpClient) { }
  
  baseUrl = `http://localhost:3000/`;

  addProduct(data: any) {
    return this.http.post(this.baseUrl+'products', data)
  }
  getProductList() {
    return this.http.get<product[]>(this.baseUrl+'products')
  }
  deleteProduct(id: any) {
    return this.http.delete(this.baseUrl+`products/${id}`)
  }
  getProduct(id: any) {
    return this.http.get<product>(this.baseUrl+`products/${id}`)
  }
  getProductsUpdate(id: any) {
    return this.http.get<product[]>(this.baseUrl+`products/${id}`)
  }
  updateProducts(product: product) {
    return this.http.put<product[]>(this.baseUrl+`products/${product?.id}`, product)
  }
  popularProducts() {
    return this.http.get<product[]>(this.baseUrl+'products?_limit=3')
  }
  TrendyProducts() {
    return this.http.get<product[]>(this.baseUrl+'products?_limit=7')
  }
  searchProducts(query: string) {
    return this.http.get<product[]>(this.baseUrl+`products?q=${{ query }}`)
  }

  getAllCartItems(userId: any) {
    return this.http.get<product[]>(this.baseUrl+`cart?userId=` + userId, { observe: 'response' }).subscribe((res) => {
      if (res && res.body) {
        this.cartData?.emit(res.body);
        console.log(res, 'all items');
      }
    })
  }

  getAllWCartItems(id: any) {    
    return this.http.get<product[]>(this.baseUrl+ApiEndPoints.wCartUserid+ id, { observe: 'response' }).subscribe((res) => {
      console.log(res);
      if (res && res.body) {
        this.cartData.emit(res.body);
        console.log(res, 'all items');
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
    // console.log(productId);
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
      console.log(cartData, 'service w cart data');
      return this.http.post(this.baseUrl+'wCart', cartData);
    }
    return this.http.post(this.baseUrl+'cart', cartData);
  }
  // ADD CART ALERT
  // REMOVE TO CART
  removeToCart(productId: any) {
    if (!localStorage.getItem('user')) {
      console.log("not user" , productId);
      
      return this.http.delete(this.baseUrl+`wCart/` + productId);
    }
    return this.http.delete(this.baseUrl+`cart/` + productId);
  }

  // REMOVE TO CART
  // ALL CART ITEMS
  cartItems() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore)[0];
    if (userStore) {
      this.cartData.emit(userData);
      return this.http.get<cart[]>(this.baseUrl+`cart?userId=` + userData.id);
    } else {
      this.cartData?.emit(userData);
      return this.http.get<cart[]>(this.baseUrl+`wCart`);
    }
  }
  // ALL CART ITEMS

  // ORDER NOW
  orderNow(data: order) {
    return this.http.post(this.baseUrl+'orders', data);
  }
  // ORDER NOW
  // GET ALL ORDERS
  getOrders() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore)[0];
    return this.http.get<order[]>(this.baseUrl+`orders?userId=` + userData.id);
  }
  // GET ALL ORDERS
  // CANCEL ORDER
  cancelOrder(productId: order) {
    return this.http.delete(this.baseUrl+`orders/` + productId);
  }
  // CANCEL ORDER
}
