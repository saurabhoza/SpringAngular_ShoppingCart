import { Action } from '@ngrx/store';
import { Product } from '../models/product.model';

export const PRODUCT_SELECT = '[PRODUCT_SELECT]';
export const PRODUCT_SELECT_SUCCESS = '[PRODUCT_SELECT] Success';
export const PRODUCT_SELECT_FAILED = '[PRODUCT_SELECT] Failed';

export const PRODUCT_LIST_LOAD = '[PRODUCT_LIST] Load';
export const PRODUCT_LIST_LOAD_SUCCESS = '[PRODUCT_LIST] Load Success';
export const PRODUCT_LIST_LOAD_FAILED = '[PRODUCT_LIST] Load Failed';

// Product load related Actions
export class ProductSelectAction implements Action{
    readonly type = PRODUCT_SELECT;
    constructor(public productId:number){}
}

export class ProductSelectSuccessAction implements Action{
    readonly type = PRODUCT_SELECT_SUCCESS
    constructor(){}
}

export class ProductSelectFailedAction implements Action{
    readonly type = PRODUCT_SELECT_FAILED;
    constructor(public error:any){}
}

// Product List load related Actions
export class ProductListLoadAction implements Action{
    readonly type = PRODUCT_LIST_LOAD;
    constructor(){}
}

export class ProductListLoadSuccessAction implements Action{
    readonly type = PRODUCT_LIST_LOAD_SUCCESS;
    constructor(public productList:Product[]){}
}

export class ProductListLoadFailedAction implements Action{
    readonly type = PRODUCT_LIST_LOAD_FAILED;
    constructor(public error:any){}
}

export type Actions = 
ProductSelectAction | ProductSelectSuccessAction | ProductSelectFailedAction |
ProductListLoadAction | ProductListLoadSuccessAction | ProductListLoadFailedAction 