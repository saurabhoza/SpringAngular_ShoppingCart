import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCart from './../cart/reducers/cart.reducers';
// import { createSelector } from 'reselect';

// reducers
import { State as RootState } from '../../shared/reducers';

export interface PurchaseState {
    cart: fromCart.State;
}

export interface State extends RootState {
    'cart': PurchaseState;
}

export const reducers = {
    cart: fromCart.reducer
};

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
*/
export const getPurchaseFeatureState = createFeatureSelector<PurchaseState>('purchase');

export const getCartProductsEntities = createSelector(
    getPurchaseFeatureState,
    (state: PurchaseState) => {
        return state.cart.entities;
    }
);
export const getCartProductIds = createSelector(
    getPurchaseFeatureState,
    (state: PurchaseState) => {
        return state.cart.ids;
    }
);
export const getCartProductCount = createSelector(
    getPurchaseFeatureState,
    (state: PurchaseState) => {
  return state.cart.ids.length;
    }
);
export const getTotalAmountFromCart = createSelector(
    getPurchaseFeatureState,
    (state: PurchaseState) => {
  return state.cart.totalAmount;
    }
);
export const getProductList = createSelector(getCartProductsEntities, getCartProductIds, (cartProduct, ids) => {
    return ids.map(id => {
        return cartProduct[id];
    });
});


