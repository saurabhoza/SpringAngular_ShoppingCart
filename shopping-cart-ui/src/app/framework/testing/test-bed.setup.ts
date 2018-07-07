// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { Action, ReducerManager, ReducerManagerDispatcher } from '@ngrx/store';
// import { HttpModule } from '@angular/http';
// import { EffectsModule } from '@ngrx/effects';
// import { StoreModule, Store } from '@ngrx/store';
// import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { reducers as paymentReducers } from './../../../../reducers';
// import { CommonModule } from '@angular/common';
// import { AppCommonModule } from './../../../../../../common/app-common.module';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
// import * as fromRoot from './../../shared/reducers';
// import { PaymentComponent } from '../../application/payment/components/payment.component';
// import { PaymentEffects } from '../../application/payment/effects/payment.effects';
// import { PaymentService } from '../../application/payment/services/payment.service';
// import { AddressComponent } from '../../application/payment/components/address/components/address.component';
// import { AddressEffects } from '../../application/payment/components/address/effects/address.effects';
// import { AddressService } from '../../application/payment/components/address/services/address.service';
// import { UrlConstants } from '../../application/shared/models/UrlConstants';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//  import {reducers, metaReducers } from './../../application/shared/reducers';
//  import { routes } from './../../app.routing.module';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { MatInputModule, MatButtonModule, MatCardModule, MatListModule, MatIconModule, MatToolbarModule,
//   MatMenuModule, MatRadioModule, MatProgressBarModule, MatGridListModule, MatSelectModule, MatFormFieldModule, MatAccordion,
//   MatExpansionPanel, MatExpansionModule, MatCheckboxModule } from '@angular/material';
//   import * as AddressActions from '../../application/payment/component/address/actions/address.actions';
// import { TranslateStore } from '@ngx-translate/core/src/translate.store';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { SubAddressComponent } from '../../application/payment/components/address/components/sub-address/sub-address.component';

// function createTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/payment/', '.json');
// }

// export const testBedConfig = {
//     imports: [
//       CommonModule,
//       HttpModule,
//       AppCommonModule,
//       FormsModule,
//       ReactiveFormsModule,
//       FlexLayoutModule,
//       MatInputModule,
//       MatSelectModule,
//       MatButtonModule,
//       MatCardModule,
//       MatListModule,
//       MatIconModule,
//       MatProgressBarModule,
//       MatFormFieldModule,
//       MatExpansionModule,
//       MatCheckboxModule,
//       NoopAnimationsModule,
//       CommonModule,
//       RouterModule.forRoot(routes, { useHash: true }),
//       StoreModule.forRoot(reducers, { metaReducers }),
//       StoreModule.forFeature('payment', paymentReducers),
//       // StoreModule.forRoot(reducers, paymentReducers),
//       // StoreModule.forRoot(reducers, { metaReducers }),
//       EffectsModule.forFeature([
//         PaymentEffects, AddressEffects
//       ]),
//       EffectsModule.forRoot([]),
//       TranslateModule.forChild({
//         loader: {
//           provide: TranslateLoader,
//           useFactory: (createTranslateLoader),
//           deps: [HttpClient]
//         },
//         isolate: true
//       })
//     ],
//     declarations: [SubAddressComponent, ],
//     providers: [PaymentService,
//       AddressService,
//       TranslateService,
//       TranslateStore,
//       HttpClient,
//       HttpHandler
//     ],
//     schemas: [CUSTOM_ELEMENTS_SCHEMA]
//   };
