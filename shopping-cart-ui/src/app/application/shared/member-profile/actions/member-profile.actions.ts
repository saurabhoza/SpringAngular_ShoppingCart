import { Action } from '@ngrx/store';
import { MemberProfile } from '../models/member-profile';

export const MEMBER_PROFILE_LOAD = '[MemberProfile] Load';
export const MEMBER_PROFILE_LOAD_SUCCESS = '[MemberProfile] Load Success';
export const MEMBER_PROFILE_LOAD_FAILED = '[MemberProfile] Load Failed';
export const MEMBER_PROFILE_SAVE = '[MemberProfile] Save';
export const MEMBER_PROFILE_SAVE_SUCCESS = '[MemberProfile] Save Success';
export const MEMBER_PROFILE_SAVE_FAILED = '[MemberProfile] Save Failed';
export const MEMBER_PROFILE_NAVIGATION = '[MemberProfile] Navigation';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class MemberProfileLoadAction implements Action {
    readonly type = MEMBER_PROFILE_LOAD;
    constructor() { }
}

export class MemberProfileLoadSuccessAction implements Action {
    readonly type = MEMBER_PROFILE_LOAD_SUCCESS;
    constructor(public payload: MemberProfile) { }
}

export class MemberProfileLoadFailedAction implements Action {
    readonly type = MEMBER_PROFILE_LOAD_FAILED;
    constructor(public payload: any) { }
}

export class MemberProfileSaveAction implements Action {
    readonly type = MEMBER_PROFILE_SAVE;
    constructor(public payload: MemberProfile) { }
}

export class MemberProfileSaveSuccessAction implements Action {
    readonly type = MEMBER_PROFILE_SAVE_SUCCESS;
    constructor(public payload: MemberProfile) { }
}

export class MemberProfileSaveFailedAction implements Action {
    readonly type = MEMBER_PROFILE_SAVE_FAILED;
    constructor(public payload: any) { }
}

export class MemberProfileNavigationAction implements Action {
    readonly type = MEMBER_PROFILE_NAVIGATION;
    constructor() { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = MemberProfileLoadAction
  | MemberProfileLoadSuccessAction
  | MemberProfileLoadFailedAction
  | MemberProfileSaveAction
  | MemberProfileSaveSuccessAction
  | MemberProfileSaveFailedAction
  | MemberProfileNavigationAction;