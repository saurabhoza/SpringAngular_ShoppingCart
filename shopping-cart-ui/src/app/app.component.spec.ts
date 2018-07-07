import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatIcon } from '@angular/material/icon';
import { HeaderComponent } from './application/layout/header/components/header.component';
import { FooterComponent } from './application/layout/footer/components/footer.component';
import { HeaderDetailComponent } from './application/layout/header/components/header-detail.component';
import { HeaderMenuComponent } from './application/layout/header-menu/components/header-menu.component';
import { MiddleComponent } from './application/layout/middle/components/middle.component';
import { TranslatePipe, TranslateModule } from '@ngx-translate/core';
import { LanguageBarComponent } from './framework/language-bar/components/language-bar.component';
import { LanguageBarDetailComponent } from './framework/language-bar/components/language-bar-detail.component';
import { MemberProfileDetailComponent } from './application/shared/member-profile/components/member-profile-detail.component';
import { MemberProfileComponent } from './application/shared/member-profile/components/member-profile.component';
import { RouterOutlet } from '@angular/router/src/directives/router_outlet';
import { Router } from '@angular/router/src/router';
import {RouterTestingModule } from '@angular/router/testing';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers, State } from './application/shared/reducers/index';
import { AppTransition } from './framework/app-transition/app-transition';

export const metaReducers: MetaReducer<State>[] = [];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MatProgressBar,
        MatIcon,
        HeaderComponent,
        FooterComponent,
        HeaderDetailComponent,
        HeaderMenuComponent,
        MiddleComponent,
        LanguageBarComponent,
        LanguageBarDetailComponent,
        MemberProfileComponent,
        MemberProfileDetailComponent
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([]),
        StoreRouterConnectingModule,
      ],
      providers: [AppTransition]

    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
