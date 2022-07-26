import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopComponent } from './shop.component';
import { ShopStore } from './store/shop.store';
import { ProductsService } from './api/services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { LetModule, PushModule } from '@ngrx/component';

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopComponent],
      imports: [
        HttpClientModule,
        PushModule,
        LetModule
      ],
      providers: [ShopStore, ProductsService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
