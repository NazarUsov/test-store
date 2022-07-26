import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ShopRoutingModule } from './shop-routing.module';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ProductsService } from './api/services/products.service';
import { ShopStore } from './store/shop.store';
import { LetModule, PushModule } from '@ngrx/component';


@NgModule({
  declarations: [
    ShopComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    PushModule,
    LetModule
  ],
  providers: [
    ProductsService,
    ShopStore
  ]
})
export class ShopModule {
}
