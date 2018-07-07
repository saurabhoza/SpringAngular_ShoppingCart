import { Injectable, OnInit } from "@angular/core";
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import { Action } from "@ngrx/store";
import * as memberProfile from '../actions/member-profile.actions';
import * as transition from './../../../../application/shared/actions/transition.actions';
import { of } from 'rxjs/observable/of';
import { MemberProfileLoadAction, MemberProfileLoadSuccessAction } from "../actions/member-profile.actions";
import { MemberProfileService } from "../services/member-profile.services";
import { Router } from "@angular/router";

@Injectable()
export class MemberProfileEffects {
    @Effect()
    memberProfileLoadEffect$: Observable<Action> = this.actions$
        .ofType(memberProfile.MEMBER_PROFILE_LOAD)
        .switchMap(() => {
            return this.memberProfileService.getMemberProfile()
                .map(memberProfileModel => new memberProfile.MemberProfileLoadSuccessAction(memberProfileModel))
                .catch(error => of(new memberProfile.MemberProfileLoadFailedAction(error)));
        });
        @Effect()
        memberProfileLoadSuccessEffect$: Observable<Action> = this.actions$
            .ofType(memberProfile.MEMBER_PROFILE_LOAD_SUCCESS)
                    .map(() => new transition.TransitionCompletedAction());
    constructor(private actions$: Actions, private memberProfileService: MemberProfileService, private router: Router) { }
}
