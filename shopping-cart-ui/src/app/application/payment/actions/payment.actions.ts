import { Action } from '@ngrx/store';
import { Payment } from '../models/payment';

export const PAYMENT_PROCESS = '[PAYMENT] Process';
export const PAYMENT_PROCESS_SUCCESS = '[PAYMENT] Process Success';
export const PAYMENT_PROCESS_FAILED = '[PAYMENT] Process Failed';

// Product load related Actions
export class PaymentProcessAction implements Action{
    readonly type = PAYMENT_PROCESS;
    constructor(public payload:Payment){}
}

export class PaymentProcessSuccessAction implements Action{
    readonly type = PAYMENT_PROCESS_SUCCESS
    constructor(public payload:Payment){}
}

export class PaymentProcessFailedAction implements Action{
    readonly type = PAYMENT_PROCESS_FAILED;
    constructor(public error:any){}
}

export type Actions = 
PaymentProcessAction
| PaymentProcessSuccessAction
| PaymentProcessFailedAction