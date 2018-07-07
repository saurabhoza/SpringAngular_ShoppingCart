import { Injectable } from "@angular/core";
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import { Action } from "@ngrx/store";
import * as member from '../actions/member.actions';
import * as transition from './../../../../application/shared/actions/transition.actions';
import { of } from 'rxjs/observable/of';
import { MemberLoadAction, MemberLoadSuccessAction, MemberSaveAction } from "../actions/member.actions";
import { MemberService } from "../services/member.services";
import { Router } from "@angular/router";

@Injectable()
export class MemberEffects {

    @Effect()
    memberLoadEffect$: Observable<Action> = this.actions$
        .ofType(member.MEMBER_LOAD)
        .map((action: MemberLoadAction) => action.payload)
        .switchMap(data => {
            return this.memberService.getMember(data)
                .map(memberModel => new member.MemberLoadSuccessAction(memberModel))
                .catch(error => of(new member.MemberLoadFailedAction(error)));
        });

    @Effect()
    memberSaveEffect$: Observable<Action> = this.actions$
        .ofType(member.MEMBER_SAVE)
        .map((action: MemberSaveAction) => action.payload)
        .switchMap(data => {
            return this.memberService.saveMember(data)
                .map(memberModel => new member.MemberSaveSuccessAction(memberModel))
                .catch(error => of(new member.MemberSaveFailedAction(error)));
        });

    @Effect({ dispatch: false })
    memberSaveSuccessEffect$: Observable<Action> = this.actions$
        .ofType(member.MEMBER_SAVE_SUCCESS)
        .map(() => new transition.TransitionCompletedAction())
        .do(_ => {
            this.router.navigate(['./dashboard']);
        }
        );
    constructor(private actions$: Actions, private memberService: MemberService, private router: Router) { }
}
