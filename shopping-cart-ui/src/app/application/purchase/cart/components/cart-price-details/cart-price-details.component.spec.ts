import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPriceDetailsComponent } from './cart-price-details.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers, metaReducers } from '../../../../shared/reducers/index';
import { AppTransition } from '../../../../../framework/app-transition/app-transition';

describe('CartPriceDetailsComponent', () => {
  let component: CartPriceDetailsComponent;
  let fixture: ComponentFixture<CartPriceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartPriceDetailsComponent ],
      imports: [FormsModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([]),
        StoreRouterConnectingModule,
      ],
      providers: [AppTransition]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPriceDetailsComponent);
    component = fixture.componentInstance;
    component.cartProductList = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
