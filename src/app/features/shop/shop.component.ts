import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, of, Subject, takeUntil } from 'rxjs';
import { ShopStore } from './store/shop.store';
import { Product } from './api/models/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {
  submitted = false;

  formGroup: FormGroup = new FormGroup({
    searchQuery: new FormControl(null, Validators.compose([]))
  });

  loading$: Observable<boolean>;

  products$: Observable<Product[] | null> = of(null);

  private searchQuery$: Subject<string | null> = new Subject<string | null>()

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly shopStore: ShopStore) {
    this.shopStore.getProducts();

    this.loading$ = this.shopStore.selectLoading();
    this.products$ = this.shopStore.selectProducts();
  }

  ngOnInit(): void {
    this.searchQuery$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((searchQuery) => {
        this.shopStore.setSearchQuery(searchQuery);
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  clear(): void {
    this.formGroup.reset();
  }

  beforeSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.formGroup.updateValueAndValidity();
      return;
    }

    this.submit();
  }

  submit(): void {
    this.submitted = true;
    const { searchQuery } = this.formGroup.value;
    this.searchQuery$.next(searchQuery);
  }
}
