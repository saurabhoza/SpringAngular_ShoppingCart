import { EffectsModule } from "@ngrx/effects";
import { StoreModule, Store } from "@ngrx/store";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./components/dashboard.component";
import { reducers } from "./reducers";
import { CommonModule } from "@angular/common";
import { AppCommonModule } from "../../common/app-common.module";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import * as fromRoot from './../shared/reducers';
import { ProductListComponent } from "./product-list/components/product-list.component";
import { ProductListService } from "./product-list/services/product-list.services";
import { ProductListSmartComponent } from "./product-list/components/product-list-smart.component";
import { ProductDetailsComponent } from "./product-detail/components/product-detail.component";
import { ProductListEffects } from "./product-list/effects/product-list.effects";
import { ProductDetailEffects } from "./product-detail/effects/product-detail.effects";
import { ProductDetailsDetailComponent } from "./product-detail/components/product-detail-detail.component";
import { ProductDetailService } from "./product-detail/services/product-detail.services";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/dashboard/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild([
        { path: '', component: DashboardComponent },
        { path: 'productDetail', component: ProductDetailsComponent },
      ]),
    StoreModule.forFeature("dashboard", reducers),
    EffectsModule.forFeature([      
      ProductListEffects,ProductDetailEffects
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
    DashboardComponent,    
    ProductListComponent,
    ProductListSmartComponent,
    ProductDetailsComponent,
    ProductDetailsDetailComponent
  ],
  providers: [    
    ProductListService,ProductDetailService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {
  constructor(private readonly translate: TranslateService,
    private readonly store: Store<fromRoot.State>) {
    this.translate.setDefaultLang('en');
   this.store.select(fromRoot.getCurrentLanguage).subscribe(lang => this.translate.use(lang));
  }   
 }