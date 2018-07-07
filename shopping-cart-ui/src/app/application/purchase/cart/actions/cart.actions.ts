import { Action } from '@ngrx/store';
import { CartProduct } from '../models/cart-product';

export const CART_PRODUCT_LOAD = '[CartProduct] Load';
export const CART_PRODUCT_LOAD_SUCCESS = '[CartProduct] Load Success';
export const CART_PRODUCT_LOAD_FAILED = '[CartProduct] Load Failed';
export const CART_PRODUCT_SAVE = '[CartProduct] Save';
export const CART_PRODUCT_SAVE_SUCCESS = '[CartProduct] Save Success';
export const CART_PRODUCT_SAVE_FAILED = '[CartProduct] Save Failed';
export const CART_PRODUCT_ADD = '[CartProduct] Add';
export const CART_PRODUCT_ADD_SUCCESS = '[CartProduct] Add Success';
export const CART_PRODUCT_ADD_FAILED = '[CartProduct] Add Failed';
export const CART_PRODUCT_DELETE = '[CartProduct] Delete';
export const CART_PRODUCT_DELETE_SUCCESS = '[CartProduct] Delete Success';
export const CART_PRODUCT_DELETE_FAILED = '[CartProduct] Delete Failed';
export const CART_PRODUCT_UPDATE_QUANTITY_SUCCESS = '[CartProduct] Update Quantity';
export const CART_PRODUCT_REMOVE_ALL = '[CartProduct] Remove All';
export const CART_PRODUCT_CONTINUE_SAVE = '[CartProduct] Continue Save';
export const CART_PRODUCT_CONTINUE_SAVE_SUCCESS = '[CartProduct] Continue Save Sucess';




/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class CartProductLoadAction implements Action {
    readonly type = CART_PRODUCT_LOAD;
    constructor() { }
}

export class CartProductLoadSuccessAction implements Action {
    readonly type = CART_PRODUCT_LOAD_SUCCESS;
    constructor(public payload: CartProduct[]) { }
}

export class CartProductLoadFailedAction implements Action {
    readonly type = CART_PRODUCT_LOAD_FAILED;
    constructor(public payload: any) { }
}

export class CartProductSaveAction implements Action {
    readonly type = CART_PRODUCT_SAVE;
    constructor(public payload: CartProduct[]) { }
}

export class CartProductSaveSuccessAction implements Action {
    readonly type = CART_PRODUCT_SAVE_SUCCESS;
    constructor(public payload: any) { }
}

export class CartProductSaveFailedAction implements Action {
    readonly type = CART_PRODUCT_SAVE_FAILED;
    constructor(public payload: any) { }
}
export class CartProductAddAction implements Action {
    readonly type = CART_PRODUCT_ADD;
    constructor(public payload: CartProduct) { }
}

export class CartProductAddSuccessAction implements Action {
    readonly type = CART_PRODUCT_ADD_SUCCESS;
    constructor(public payload: CartProduct) { }
}

export class CartProductAddFailedAction implements Action {
    readonly type = CART_PRODUCT_ADD_FAILED;
    constructor(public payload: any) { }
}
export class CartProductDeleteAction implements Action {
    readonly type = CART_PRODUCT_DELETE;
    constructor(public payload: CartProduct) { }
}

export class CartProductDeleteSuccessAction implements Action {
    readonly type = CART_PRODUCT_DELETE_SUCCESS;
    constructor(public payload: CartProduct[]) { }
}

export class CartProductDeleteFailedAction implements Action {
    readonly type = CART_PRODUCT_DELETE_FAILED;
    constructor(public payload: any) { }
}

export class CartProductUpdateQuantitySuccessAction implements Action {
    readonly type = CART_PRODUCT_UPDATE_QUANTITY_SUCCESS;
    constructor(public payload: CartProduct) { }
}

export class CartProductRemoveAllAction implements Action {
    readonly type = CART_PRODUCT_REMOVE_ALL;
    constructor() { }
}

export class CartProductContinueAction implements Action {
    readonly type = CART_PRODUCT_CONTINUE_SAVE;
    constructor(public payload: CartProduct[]) { }
}

export class CartProductContinueSuccessAction implements Action {
    readonly type = CART_PRODUCT_CONTINUE_SAVE_SUCCESS;
    constructor(public payload: number) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = CartProductLoadAction
  | CartProductLoadSuccessAction
  | CartProductLoadFailedAction
  | CartProductSaveAction
  | CartProductSaveSuccessAction
  | CartProductSaveFailedAction
  | CartProductAddAction
  | CartProductAddSuccessAction
  | CartProductAddFailedAction
  | CartProductDeleteAction
  | CartProductDeleteSuccessAction
  | CartProductDeleteFailedAction
  | CartProductUpdateQuantitySuccessAction
  | CartProductRemoveAllAction
  | CartProductUpdateQuantitySuccessAction
  | CartProductContinueAction
  | CartProductContinueSuccessAction;
