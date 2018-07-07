import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { reducers } from './reducers';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../../common/app-common.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import * as fromRoot from './../shared/reducers';
import { CartComponent } from './cart/components/cart.component';
import { CartService } from './cart/services/cart.service';
import { CartProductsEffects } from './cart/effects/cart.effects';
import { CartProductDetailsComponent } from './cart/components/cart-product-details/cart-product-details-component';
import { CartPriceDetailsComponent } from './cart/components/cart-price-details/cart-price-details.component';
import { UrlConstants } from '../shared/models/UrlConstants';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/purchase/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild([
      { path: UrlConstants.ROUTE_CART, component: CartComponent }
    ]),
    StoreModule.forFeature('purchase', reducers),
    EffectsModule.forFeature([CartProductsEffects
    ]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  declarations: [
    CartComponent,
    CartProductDetailsComponent,
    CartPriceDetailsComponent
  ],
  providers: [CartService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PurchaseModule {
  constructor(private readonly translate: TranslateService,
    private readonly store: Store<fromRoot.State>) {
    this.translate.setDefaultLang('en');
    this.store.select(fromRoot.getCurrentLanguage).subscribe(lang => this.translate.use(lang));
  }
}
