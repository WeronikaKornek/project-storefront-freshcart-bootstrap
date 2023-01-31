import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsModel } from '../models/products.model';

@Injectable()
export class ProductService {
  constructor(private _httpClient: HttpClient) {
  }

  getAll(): Observable<ProductsModel[]> {
    return this._httpClient.get<ProductsModel[]>('https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-products');
  }
}
