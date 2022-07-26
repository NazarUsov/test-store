import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) { }

  get(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/mockData/products.json').pipe(delay(1000));
  }
}
