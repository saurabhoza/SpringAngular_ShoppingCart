import { EffectsModule } from "@ngrx/effects";
import { StoreModule, Store } from "@ngrx/store";
import { reducers } from "./reducers";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { LoginEffects } from "./login/effects/login.effects";
import { LoginService } from "./login/services/login.services";
import { HomeComponent } from "./components/home.component";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/components/login.component";
import { CommonModule } from "@angular/common";
import { AppCommonModule } from "../../common/app-common.module";
import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppModule } from "../../app.module";
import { LanguageBarDetailComponent } from "../../framework/language-bar/components/language-bar-detail.component";
import { LanguageBarComponent } from "../../framework/language-bar/components/language-bar.component";
import * as fromRoot from './../shared/reducers';
import { LoginDetailComponent } from "./login/components/login-detail.component";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/home/', '.json');
}

@NgModule({
  // code omitted

  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild([
        { path: '', component: HomeComponent },
      ]),
    StoreModule.forFeature("home", reducers),
    EffectsModule.forFeature([
      LoginEffects
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
    HomeComponent,
    LoginComponent,
    LoginDetailComponent
  ],
  providers: [
    LoginService,
    TranslateService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {
  constructor(private readonly translate: TranslateService,
    private readonly store: Store<fromRoot.State>) {
    this.translate.setDefaultLang('en');
   this.store.select(fromRoot.getCurrentLanguage).subscribe(lang => this.translate.use(lang));
  } 
}