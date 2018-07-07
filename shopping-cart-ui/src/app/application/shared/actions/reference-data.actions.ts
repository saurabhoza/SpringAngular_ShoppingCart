import { Action } from '@ngrx/store';
import { ReferenceData } from '../models/reference-data';

export const REFERENCE_DATA_LOAD = '[ReferenceData] Load';
export const REFERENCE_DATA_LOAD_SUCCESS = '[ReferenceData] Load Success';
export const REFERENCE_DATA_LOAD_FAILED = '[ReferenceData] Load Failed';
export const REFERENCE_DATA_SAVE = '[ReferenceData] Save';
export const REFERENCE_DATA_SAVE_SUCCESS = '[ReferenceData] Save Success';
export const REFERENCE_DATA_SAVE_FAILED = '[ReferenceData] Save Failed';
export const LANGUAGE_SET = '[Language] Set';

export const CART_COUNT_SET = '[CartCount] Set';
export const CART_COUNT_LOAD = '[CatCount] Load';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class ReferenceDataLoadAction implements Action {
    readonly type = REFERENCE_DATA_LOAD;
    constructor(public payload: ReferenceData) { }
}

export class ReferenceDataLoadSuccessAction implements Action {
    readonly type = REFERENCE_DATA_LOAD_SUCCESS;
    constructor(public payload: ReferenceData) { }
}

export class ReferenceDataLoadFailedAction implements Action {
    readonly type = REFERENCE_DATA_LOAD_FAILED;
    constructor(public payload: any) { }
}

export class ReferenceDataSaveAction implements Action {
    readonly type = REFERENCE_DATA_SAVE;
    constructor(public payload: ReferenceData) { }
}

export class ReferenceDataSaveSuccessAction implements Action {
    readonly type = REFERENCE_DATA_SAVE_SUCCESS;
    constructor(public payload: ReferenceData) { }
}

export class ReferenceDataSaveFailedAction implements Action {
    readonly type = REFERENCE_DATA_SAVE_FAILED;
    constructor(public payload: any) { }
}
export class LanguageSetAction implements Action {
    readonly type = LANGUAGE_SET;
    constructor(public payload: string) { }
}

export class CartCountSetAction implements Action{
    readonly type = CART_COUNT_SET;
    constructor(public payload:number){}
}

export class CartCountLoadAction implements Action{
    readonly type = CART_COUNT_LOAD;
    constructor(public pyaload:number){}
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = ReferenceDataLoadAction
  | ReferenceDataLoadSuccessAction
  | ReferenceDataLoadFailedAction
  | ReferenceDataSaveAction
  | ReferenceDataSaveSuccessAction
  | ReferenceDataSaveFailedAction
  | LanguageSetAction
  | CartCountSetAction
  | CartCountLoadAction;