import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Product } from './product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsUrl = 'products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProduct(id: Number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`
    return this.http.get<Product>(url);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, httpOptions);
  }

  updateProduct(product: Product, id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`
    return this.http.put<Product>(url, product, httpOptions);
  }
}
