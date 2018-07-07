import { Action } from '@ngrx/store';
import { Login } from '../models/login';

export const LOGIN_SUBMIT = '[Login] Submit';
export const LOGIN_SUBMIT_SUCCESS = '[Login] Submit Success';
export const LOGIN_SUBMIT_FAILED = '[Login] Submit Failed';
export const LOGIN_NAVIGATION = '[Login] Navigation';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoginSubmitAction implements Action {
    readonly type = LOGIN_SUBMIT;
    constructor(public payload: Login) { }
}

export class LoginSubmitSuccessAction implements Action {
    readonly type = LOGIN_SUBMIT_SUCCESS;
    constructor(public payload: Login) { }
}

export class LoginSubmitFailedAction implements Action {
    readonly type = LOGIN_SUBMIT_FAILED;
    constructor(public payload: any) { }
}

export class LoginNavigationAction implements Action {
    readonly type = LOGIN_NAVIGATION;
    constructor() { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoginSubmitAction
  | LoginSubmitSuccessAction
  | LoginSubmitFailedAction;