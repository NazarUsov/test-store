import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from './api/models/product';
import { ProductsService } from './api/services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    search: new FormControl(null, Validators.compose([]))
  });

  products$: Observable<Product[]>;

  constructor(private productsService:ProductsService) {
    this.products$ = this.productsService.get();
  }

  ngOnInit(): void {
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
    const { search } = this.formGroup.value;

  }
}
