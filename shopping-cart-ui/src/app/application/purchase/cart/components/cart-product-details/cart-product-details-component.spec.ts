import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductDetailsComponent } from './cart-product-details-component';
import { QuantityValidationComponent } from '../../../../../framework/quantity-validation/quantity-validation.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../../../../shared/reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppTransition } from '../../../../../framework/app-transition/app-transition';
import { RouterTestingModule } from '@angular/router/testing';

describe('CartProductDetailsComponentComponent', () => {
  let component: CartProductDetailsComponent;
  let fixture: ComponentFixture<CartProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartProductDetailsComponent,
        QuantityValidationComponent ],
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
    fixture = TestBed.createComponent(CartProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
