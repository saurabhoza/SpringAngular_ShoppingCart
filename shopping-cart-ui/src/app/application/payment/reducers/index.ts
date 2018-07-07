import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as  PaymentReducer from './payment.reducers';
import * as  AddressReducer from './../components/address/reducers/address.reducer';

// reducers
import { State as RootState } from '../../shared/reducers';

export interface PaymentState {
    payment: PaymentReducer.State;
    address: AddressReducer.State;
}
export interface State extends RootState {
    'payment': PaymentState;
}

export const reducers = {
    payment: PaymentReducer.reducer,
    address: AddressReducer.reducer
};

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
*/
export const getPaymentState = createFeatureSelector<PaymentState>('payment');

export const getPayment = createSelector(
    getPaymentState,
  (state: PaymentState) =>  state ? state.payment.payment : null
);

export const getShippingAddress = createSelector(
    getPaymentState,
  (state: PaymentState) =>  state ? state.address.entities[1] : null
);




