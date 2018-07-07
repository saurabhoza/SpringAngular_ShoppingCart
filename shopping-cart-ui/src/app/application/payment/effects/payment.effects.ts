import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from "@ngrx/store";
import * as paymentActions from '../actions/payment.actions';
import * as transitionActions from './../../../application/shared/actions/transition.actions';
import * as fromPurchase from './../../purchase/reducers';
import * as cartActions from './../../purchase/cart/actions/cart.actions';

import { of } from 'rxjs/observable/of';
import { PaymentService } from "../services/payment.service";
import { Router } from "@angular/router";

@Injectable()
export class PaymentEffects {

    constructor(private actions$: Actions, private paymentService: PaymentService, private router: Router, private store: Store<fromPurchase.State>) { }

    @Effect()
    paymentProcessEffect$: Observable<Action> = this.actions$
        .ofType(paymentActions.PAYMENT_PROCESS)
        .map((action: paymentActions.PaymentProcessAction) => action.payload)
        .switchMap((data) => {
            return this.paymentService.processPayment(data)
                .map(payment => new paymentActions.PaymentProcessSuccessAction(payment))
                .catch(error => of(new paymentActions.PaymentProcessFailedAction(error)));
        });
    @Effect()
    paymentProcessSuccessEffect$: Observable<Action> = this.actions$
        .ofType(paymentActions.PAYMENT_PROCESS_SUCCESS)
        .map(() => new transitionActions.TransitionCompletedAction())
        .do(_ => {
            this.store.dispatch(new cartActions.CartProductRemoveAllAction())
            this.router.navigate(['payment/response']);
        });
}
