import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-types';
import { ApiEndPoints } from '../core/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cartData = new EventEmitter<product[]>;
  constructor(private http: HttpClient) { }

  baseUrl = `http://localhost:3000/`;

  addProduct(data: any) {
    return this.http.post(this.baseUrl + ApiEndPoints.products, data)
  }
  getProductList() {
    return this.http.get<product[]>(this.baseUrl + ApiEndPoints.products)
  }
  deleteProduct(id: any) {
    return this.http.delete(this.baseUrl + ApiEndPoints.productsiD + id)
  }
  getProduct(id: any) {
    return this.http.get<product>(this.baseUrl + ApiEndPoints.productsiD + id)
  }
  getProductsUpdate(id: any) {
    return this.http.get<product[]>(this.baseUrl + ApiEndPoints.productsiD + id)
  }
  updateProducts(product: product) {
    return this.http.put<product[]>(this.baseUrl + ApiEndPoints.productsiD + `${product?.id}`, product)
  }
  popularProducts() {
    return this.http.get<product[]>(this.baseUrl + ApiEndPoints.productLimit3)
  }
  TrendyProducts() {
    return this.http.get<product[]>(this.baseUrl + ApiEndPoints.productLimit7)
  }

  // searchProducts(query: string) {
  //   return this.http.get<product[]>(this.baseUrl+`products?q=${{ query }}`)
  // }

  getAllCartItems(userId: any) {
    return this.http.get<product[]>(this.baseUrl + ApiEndPoints.cartUserid + userId, { observe: 'response' }).subscribe((res) => {
      if (res && res.body) {
        this.cartData?.emit(res.body);
        console.log(res, 'all items');
      }
    })
  }

  getAllWCartItems(id: any) {
    return this.http.get<product[]>(this.baseUrl + ApiEndPoints.wCartUserid + id, { observe: 'response' }).subscribe((res) => {
      if (res && res.body) {
        this.cartData.emit(res.body);
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
      return this.http.post(this.baseUrl + ApiEndPoints.wCart, cartData);
    }
    return this.http.post(this.baseUrl + ApiEndPoints.cart, cartData);
  }
  // ADD CART ALERT
  // REMOVE TO CART
  removeToCart(productId: any) {
    if (!localStorage.getItem('user')) {

      return this.http.delete(this.baseUrl + ApiEndPoints.wCartId + productId);
    }
    return this.http.delete(this.baseUrl + ApiEndPoints.cartId + productId);
  }

  // REMOVE TO CART
  // ALL CART ITEMS
  cartItems() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore)[0];
    if (userStore) {
      this.cartData.emit(userData);
      return this.http.get<cart[]>(this.baseUrl + ApiEndPoints.cartUserid + userData.id);
    } else {
      this.cartData?.emit(userData);
      return this.http.get<cart[]>(this.baseUrl + ApiEndPoints.wCart);
    }
  }
  // ALL CART ITEMS

  // ORDER NOW
  orderNow(data: order) {
    return this.http.post(this.baseUrl + ApiEndPoints.orders, data);
  }
  // ORDER NOW
  // GET ALL ORDERS
  getOrders() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore)[0];
    return this.http.get<order[]>(this.baseUrl + ApiEndPoints.ordersUserId + userData.id);
  }
  // GET ALL ORDERS
  // CANCEL ORDER
  cancelOrder(productId: order) {
    return this.http.delete(this.baseUrl + ApiEndPoints.ordersId + productId);
  }
  // CANCEL ORDER
}
