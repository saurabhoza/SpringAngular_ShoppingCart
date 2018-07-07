import { Action } from '@ngrx/store';
import { HeaderMenu } from '../models/header-menu';

export const HEADER_MENU_LOAD = '[HeaderMenu] Load';
export const HEADER_MENU_LOAD_SUCCESS = '[HeaderMenu] Load Success';
export const HEADER_MENU_LOAD_FAILED = '[HeaderMenu] Load Failed';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class HeaderMenuLoadAction implements Action {
    readonly type = HEADER_MENU_LOAD;
    constructor() { }
}

export class HeaderMenuLoadSuccessAction implements Action {
    readonly type = HEADER_MENU_LOAD_SUCCESS;
    constructor(public payload: HeaderMenu[]) { }
}

export class HeaderMenuLoadFailedAction implements Action {
    readonly type = HEADER_MENU_LOAD_FAILED;
    constructor(public payload: any) { }
}

export type Actions
  = HeaderMenuLoadAction
  | HeaderMenuLoadSuccessAction
  | HeaderMenuLoadFailedAction;