import * as paymentActions from '../actions/payment.actions';
import { Payment } from '../models/payment';

export interface State {
    payment: Payment;
}

export const initialState: State = {
    payment: null
};

export function reducer(state = initialState, action: paymentActions.Actions): State {
    switch (action.type) {

        case paymentActions.PAYMENT_PROCESS_SUCCESS: {
            return {
                payment: action.payload,
            };
        }
        default: {
            return state;
        }

    }
}
