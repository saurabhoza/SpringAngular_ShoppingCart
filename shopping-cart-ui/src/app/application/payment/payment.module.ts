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
import { PaymentComponent } from './components/payment.component';
import { PaymentEffects } from './effects/payment.effects';
import { PaymentService } from './services/payment.service';
import { AddressComponent } from './components/address/components/address.component';
import { AddressEffects } from './components/address/effects/address.effects';
import { AddressService } from './components/address/services/address.service';
import { UrlConstants } from '../shared/models/UrlConstants';

import { PaymentResponseComponent } from './components/payment-response.component';
import { SubAddressComponent } from './components/address/components/sub-address/sub-address.component';
import { TranslateStore } from '@ngx-translate/core/src/translate.store';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/payment/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild([
      { path: '', component: PaymentComponent },
      { path: UrlConstants.ROUTE_MODULE_ADDRESS, component: AddressComponent },
      { path: 'response', component: PaymentResponseComponent }
    ]),
    StoreModule.forFeature('payment', reducers),
    EffectsModule.forFeature([
      PaymentEffects, AddressEffects
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
    PaymentComponent,
    PaymentResponseComponent,
    AddressComponent,
     SubAddressComponent
  ],
  providers: [PaymentService,
    AddressService, TranslateStore
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaymentModule {
  constructor(private readonly translate: TranslateService,
    private readonly store: Store<fromRoot.State>) {
    this.translate.setDefaultLang('en');
    this.store.select(fromRoot.getCurrentLanguage).subscribe(lang => this.translate.use(lang));
  }
}
