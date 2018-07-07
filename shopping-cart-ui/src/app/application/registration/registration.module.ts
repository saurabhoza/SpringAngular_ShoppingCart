import { EffectsModule } from "@ngrx/effects";
import { StoreModule, Store } from "@ngrx/store";
import { reducers } from "./reducers";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, OnInit } from "@angular/core";
import { MemberEffects } from "./member/effects/member.effects";
import { MemberService } from "./member/services/member.services";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AppCommonModule } from "../../common/app-common.module";
import { MemberRegistrationComponent } from "./member/components/member-registration.component";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs/Observable";
import * as fromRoot from './../shared/reducers/';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/registration/', '.json');
}
@NgModule({
  // code omitted

  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild([
      { path: 'member', component: MemberRegistrationComponent },
    ]),
    StoreModule.forFeature("registration", reducers),
    EffectsModule.forFeature([
      MemberEffects
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
    MemberRegistrationComponent
  ],
  providers: [
    MemberService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegistrationModule{
  constructor(private readonly translate: TranslateService,
    private readonly store: Store<fromRoot.State>) {
    this.translate.setDefaultLang('en');
   this.store.select(fromRoot.getCurrentLanguage).subscribe(lang => this.translate.use(lang));
  }   
 }