import { Action } from '@ngrx/store';
import { Member } from '../models/Member';

export const MEMBER_LOAD = '[Member] Load';
export const MEMBER_LOAD_SUCCESS = '[Member] Load Success';
export const MEMBER_LOAD_FAILED = '[Member] Load Failed';
export const MEMBER_SAVE = '[Member] Save';
export const MEMBER_SAVE_SUCCESS = '[Member] Save Success';
export const MEMBER_SAVE_FAILED = '[Member] Save Failed';
export const MEMBER_NAVIGATION = '[Member] Navigation';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class MemberLoadAction implements Action {
    readonly type = MEMBER_LOAD;
    constructor(public payload: Member) { }
}

export class MemberLoadSuccessAction implements Action {
    readonly type = MEMBER_LOAD_SUCCESS;
    constructor(public payload: Member) { }
}

export class MemberLoadFailedAction implements Action {
    readonly type = MEMBER_LOAD_FAILED;
    constructor(public payload: any) { }
}

export class MemberSaveAction implements Action {
    readonly type = MEMBER_SAVE;
    constructor(public payload: Member) { }
}

export class MemberSaveSuccessAction implements Action {
    readonly type = MEMBER_SAVE_SUCCESS;
    constructor(public payload: Member) { }
}

export class MemberSaveFailedAction implements Action {
    readonly type = MEMBER_SAVE_FAILED;
    constructor(public payload: any) { }
}

export class MemberNavigationAction implements Action {
    readonly type = MEMBER_NAVIGATION;
    constructor() { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = MemberLoadAction
  | MemberLoadSuccessAction
  | MemberLoadFailedAction
  | MemberSaveAction
  | MemberSaveSuccessAction
  | MemberSaveFailedAction
  | MemberNavigationAction;