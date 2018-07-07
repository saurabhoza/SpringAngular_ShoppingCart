import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as AddressActions from '../actions/address.actions';
import * as TransitionActions from '../../../../../application/shared/actions/transition.actions';
import { of } from 'rxjs/observable/of';
import { AddressService } from '../services/address.service';
import { Router } from '@angular/router';
import { UrlConstants } from '../../../../shared/models/UrlConstants';

@Injectable()
export class AddressEffects {

    constructor(private actions$: Actions, private addressService: AddressService, private router: Router) { }

    @Effect()
    addressProcessEffect$: Observable<Action> = this.actions$
        .ofType(AddressActions.BILLING_ADDRESS_SAVE)
        .map((action: AddressActions.BillingAddressSaveAction) => action.payload)
        .switchMap((data) => {
            // alert('bs effect : ' + JSON.stringify(data));
            return this.addressService.saveAddress(data)
                .map(address => new AddressActions.BillingAddressSaveSuccessAction())
                .catch(error => of(new AddressActions.BillingAddressSaveFailedAction(error)));
        });

    @Effect()
    addressProcessSuccessEffect$: Observable<Action> = this.actions$
        .ofType(AddressActions.BILLING_ADDRESS_SAVE_SUCCESS)
        .map(() => new TransitionActions.TransitionCompletedAction())
        .do(_ => {
            this.router.navigate([UrlConstants.ROUTE_PAYMENT]);
        }
        );

    @Effect()
    shippingAddressProcessEffect$: Observable<Action> = this.actions$
        .ofType(AddressActions.SHIPPING_ADDRESS_SAVE)
        .map((action: AddressActions.ShippingAddressSaveAction) => action.payload)
        .map(address => new AddressActions.ShippingAddressSaveSuccessAction())
        .catch(error => of(new AddressActions.BillingAddressSaveFailedAction(error)));

    @Effect()
    shippingAddressSuccessEffect$: Observable<Action> = this.actions$
        .ofType(AddressActions.SHIPPING_ADDRESS_SAVE_SUCCESS)
        .map(() => new TransitionActions.TransitionCompletedAction())
        .do(_ => {
            this.router.navigate(['payment/address', UrlConstants.VALUE_BILLING]);
        }
        );
}
