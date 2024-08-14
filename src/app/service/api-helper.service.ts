import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiHelperService {
 
  constructor(
    private http: HttpClient
  ) {

  }
   baseUrl = `http://localhost:3000/`;

  create() {

  }

  post() { }


  get(jsonKey: any ,criteria: any) {
    console.log(this.baseUrl +jsonKey+criteria);
    
    // return this.http.get<test>(this.baseUrl +jsonKey+criteria  )
  }

  delete(jsonKey: string , criteria: string){
    return this.http.delete<any>(this.baseUrl +jsonKey+criteria  )

  }
}



/*
popularProducts() {
return this.http.get<product[]>('http://localhost:3000/products?_limit=3')
}
TrendyProducts() {
return this.http.get<product[]>('http://localhost:3000/products?_limit=7')
}
searchProducts(query: string) {
return this.http.get<product[]>(`http://localhost:3000/products?q=${{ query }}`)
}

*/
