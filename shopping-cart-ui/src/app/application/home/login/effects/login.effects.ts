import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import { Action } from '@ngrx/store';
import * as login from '../actions/login.actions';
import { of } from 'rxjs/observable/of';
import { LoginSubmitAction, LoginSubmitSuccessAction } from '../actions/login.actions';
import { LoginService } from '../services/login.services';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects {

    @Effect()
    loginEffect$: Observable<Action> = this.actions$
        .ofType(login.LOGIN_SUBMIT)
        .map((action: LoginSubmitAction) => action.payload)
        .switchMap(data => {
            return this.loginService.performLogin(data)
                .map(loginModel => new login.LoginSubmitSuccessAction(loginModel))
                .catch(error => of(new login.LoginSubmitFailedAction(error)));
        });
        @Effect({ dispatch: false })
        loginSuccessEffect$: Observable<Action> = this.actions$
            .ofType(login.LOGIN_SUBMIT_SUCCESS)
            .do(_ => {
                this.router.navigate(['./dashboard']);
            }
            );
    constructor(private actions$: Actions, private loginService: LoginService, private router: Router) { }
}
