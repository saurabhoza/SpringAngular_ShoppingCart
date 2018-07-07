import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './application/home/components/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule,MatButtonModule,MatCardModule,MatListModule,MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from './application/home/login/services/login.services';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers, metaReducers } from './application/shared/reducers';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './application/home/login/effects/login.effects';
import { Http, HttpModule } from '@angular/http';
import { HomeModule } from './application/home/home.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing.module';
import { DashboardModule } from './application/dashboard/dashboard.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppCommonModule } from './common/app-common.module';
import { HeaderComponent } from './application/layout/header/components/header.component';
import { HeaderDetailComponent } from './application/layout/header/components/header-detail.component';
import { FooterComponent } from './application/layout/footer/components/footer.component';
import { HeaderMenuComponent } from './application/layout/header-menu/components/header-menu.component';
import { MiddleComponent } from './application/layout/middle/components/middle.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LanguageBarComponent } from './framework/language-bar/components/language-bar.component';
import { LanguageBarDetailComponent } from './framework/language-bar/components/language-bar-detail.component';
import { AppTransition } from './framework/app-transition/app-transition';
import { HeaderMenuService } from './application/layout/header-menu/services/header-menu.service';
import { HeaderMenuEffects } from './application/layout/header-menu/effects/header-menu.effects';
import { HeaderMenuDropdownComponent } from './application/layout/header-menu/components/header-menu-dropdown.component';
import { MemberProfileComponent } from './application/shared/member-profile/components/member-profile.component';
import { MemberProfileDetailComponent } from './application/shared/member-profile/components/member-profile-detail.component';
import { MemberProfileEffects } from './application/shared/member-profile/effects/member-profile.effects';
import { MemberProfileService } from './application/shared/member-profile/services/member-profile.services';
import { PurchaseModule } from './application/purchase/purchase.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/app/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderDetailComponent,
    FooterComponent,
    HeaderMenuComponent,
    HeaderMenuDropdownComponent,
    MiddleComponent,
    MemberProfileComponent,
    MemberProfileDetailComponent
  ],
  imports: [
    AppCommonModule,
    PurchaseModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: true }),
    StoreModule.forRoot(reducers, { metaReducers }),    
    EffectsModule.forRoot([HeaderMenuEffects,MemberProfileEffects]),    
    StoreRouterConnectingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      },
      isolate: true
  })
  ],
  providers: [HeaderMenuService,MemberProfileService],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
