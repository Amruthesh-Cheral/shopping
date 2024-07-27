import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { product } from '../data-types';
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
  addTocartSer(data: product) {
    let cartData = [];
    let localData = localStorage.getItem('localCart');
    if (!localData) {
      localStorage.setItem('localCart', JSON.stringify([data]))
    } else {
      cartData = JSON.parse(localData)
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData))
    }
    this.cartData.emit(cartData)
  }
}
