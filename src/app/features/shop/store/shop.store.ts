import { Product } from '../api/models/product';
import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { ProductsService } from '../api/services/products.service';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

export interface ShopState {
  searchQuery: string | null,
  products: Product[] | null,
  loading: boolean
}

@Injectable()
export class ShopStore extends ComponentStore<ShopState> {

  constructor(private readonly productsService: ProductsService) {
    super({ products: null, loading: false, searchQuery: null });
  }

  readonly setProducts = this.updater((state, products: Product[]) => ({ ...state, products }));

  readonly setLoading = this.updater((state, loading: boolean) => ({ ...state, loading }));

  readonly setSearchQuery = this.updater((state, searchQuery: string | null) => ({ ...state, searchQuery }));

  readonly getProducts = this.effect(
    () => {
      this.setLoading(true);
      return this.productsService.get()
        .pipe(
          tap({
            next: (products) => {
              this.setProducts(products);
              this.setLoading(false);
            },
            error: (e) => {
              console.log(e);
              this.setLoading(false);
            },
          }),
          catchError(() => {
            this.setLoading(false);
            return EMPTY;
          }),
        );
    }
  );

  selectLoading(): Observable<boolean> {
    return this.select(({ loading }) => loading);
  }

  selectProducts(): Observable<Product[] | null> {
    return this.select(({
                          products,
                          searchQuery
                        }) => searchQuery && products?.filter(({ user: { fullName }, description }) => {
      return fullName.includes(searchQuery) || description.includes(searchQuery);
    }) || products);
  }
}
