import { Action } from '@ngrx/store';
import { Address } from '../models/address';

export const SHIPPING_ADDRESS_SAVE = '[SHIPPING ADDRESS] Save';
export const SHIPPING_ADDRESS_SAVE_SUCCESS = '[SHIPPING ADDRESS] Save Success';
export const SHIPPING_ADDRESS_SAVE_FAILED = '[SHIPPING ADDRESS] Save Failed';

export const BILLING_ADDRESS_SAVE = '[BILLING ADDRESS] Save';
export const BILLING_ADDRESS_SAVE_SUCCESS = '[BILLING ADDRESS] Save Success';
export const BILLING_ADDRESS_SAVE_FAILED = '[BILLING ADDRESS] Save Failed';

// Product load related Actions
export class BillingAddressSaveAction implements Action {
    readonly type = BILLING_ADDRESS_SAVE;
    constructor(public payload: Address) { }
}

export class BillingAddressSaveSuccessAction implements Action {
    readonly type = BILLING_ADDRESS_SAVE_SUCCESS;
    constructor() { }
}

export class BillingAddressSaveFailedAction implements Action {
    readonly type = BILLING_ADDRESS_SAVE_FAILED;
    constructor(public error: any) { }
}

export class ShippingAddressSaveAction implements Action {
    readonly type = SHIPPING_ADDRESS_SAVE;
    constructor(public payload: Address) { }
}


export class ShippingAddressSaveSuccessAction implements Action {
    readonly type = SHIPPING_ADDRESS_SAVE_SUCCESS;
    constructor() { }
}

export type Actions =
      BillingAddressSaveAction
    | BillingAddressSaveSuccessAction
    | BillingAddressSaveFailedAction
    | ShippingAddressSaveAction
    | ShippingAddressSaveSuccessAction;
