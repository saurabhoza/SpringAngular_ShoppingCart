import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { Action } from "@ngrx/store";
import { of } from 'rxjs/observable/of';
import * as links from '../actions/header-menu.actions';
import * as transition from './../../../../application/shared/actions/transition.actions';
import { HeaderMenuService } from "../services/header-menu.service";
import { Router } from "@angular/router";

@Injectable()
export class HeaderMenuEffects {
    @Effect()
    linksLoadEffect$: Observable<Action> = this.actions$
        .ofType(links.HEADER_MENU_LOAD)
        .switchMap(() => {
            return this.linksService.getHeaderMenu()
                .map(linksModel => new links.HeaderMenuLoadSuccessAction(linksModel))
                .catch(error => of(new links.HeaderMenuLoadFailedAction(error)));
        });
        @Effect()
        linksLoadSuccessEffect$: Observable<Action> = this.actions$
            .ofType(links.HEADER_MENU_LOAD_SUCCESS)
                    .map(() => new transition.TransitionCompletedAction());
    constructor(private actions$: Actions, private linksService: HeaderMenuService, private router: Router) { }
}
