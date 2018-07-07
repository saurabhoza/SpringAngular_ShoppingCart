import { Action } from '@ngrx/store';
import { ProductDetail } from '../models/productDetail';


export const PRODUCT_DETAIL_LOAD = '[PRODUCT_DETAIL] Load';
export const PRODUCT_DETAIL_LOAD_SUCCESS = '[PRODUCT_DETAIL] Load Success';
export const PRODUCT_DETAIL_LOAD_FAILED = '[PRODUCT_DETAIL] Load Failed';

export class ProductDetailLoadAction implements Action{
    readonly type = PRODUCT_DETAIL_LOAD; 
    constructor(public payload:number,public baclUrl:string){}
}

export class ProductDetailLoadSuccessAction implements Action{
    readonly type = PRODUCT_DETAIL_LOAD_SUCCESS
    constructor(public payload:ProductDetail){}
}

export class ProductDetailLoadFaliedAction implements Action{
    readonly type = PRODUCT_DETAIL_LOAD_FAILED
    constructor(error:any){}
}

export type Actions = ProductDetailLoadAction| ProductDetailLoadSuccessAction |ProductDetailLoadFaliedAction