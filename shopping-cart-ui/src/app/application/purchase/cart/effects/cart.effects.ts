import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as cartProductsActions from '../actions/cart.actions';
import * as transitionActions from './../../../../application/shared/actions/transition.actions';
import { of } from 'rxjs/observable/of';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { UrlConstants } from '../../../shared/models/UrlConstants';


@Injectable()
export class CartProductsEffects {

    constructor(private actions$: Actions, private cartService: CartService, private router: Router) { }

    @Effect()
    cartProductAddEffects$: Observable<Action> = this.actions$
        .ofType(cartProductsActions.CART_PRODUCT_ADD)
        .map((action: cartProductsActions.CartProductAddAction) => action.payload)
        .switchMap((data) => {
            return this.cartService.addCartProducts(data)
                .map(cartProductList => new cartProductsActions.CartProductAddSuccessAction(cartProductList))
                .catch(error => of(new cartProductsActions.CartProductAddFailedAction(error)));
        });
    @Effect()
    cartProductAddSuccessEffect$: Observable<Action> = this.actions$
        .ofType(cartProductsActions.CART_PRODUCT_ADD_SUCCESS)
        .map(() => new transitionActions.TransitionCompletedAction());

    @Effect()
    cartProductLoadEffect$: Observable<Action> = this.actions$
        .ofType(cartProductsActions.CART_PRODUCT_LOAD)
        .switchMap(() => {
            return this.cartService.getCartProducts()
                .map(cartProductList => new cartProductsActions.CartProductLoadSuccessAction(cartProductList))
                .catch(error => of(new cartProductsActions.CartProductLoadFailedAction(error)));
        });
    @Effect()
    cartProductLoadSuccessEffect$: Observable<Action> = this.actions$
        .ofType(cartProductsActions.CART_PRODUCT_LOAD_SUCCESS)
        .map(() => new transitionActions.TransitionCompletedAction());

    productListLoadEffect$: Observable<Action> = this.actions$
        .ofType(cartProductsActions.CART_PRODUCT_LOAD)
        .switchMap(() => {
            return this.cartService.getCartProducts()
                .map(productList => new cartProductsActions.CartProductLoadSuccessAction(productList))
                .catch(error => of(new cartProductsActions.CartProductLoadFailedAction(error)));
        });

    @Effect()
    cartProductSaveEffects$: Observable<Action> = this.actions$
        .ofType(cartProductsActions.CART_PRODUCT_SAVE)
        .map((action: cartProductsActions.CartProductSaveAction) => action.payload)
        .switchMap((data) => {
            return this.cartService.saveCartProducts(data)
                .map(totalAmount => new cartProductsActions.CartProductSaveSuccessAction(totalAmount))
                .catch(error => of(new cartProductsActions.CartProductSaveFailedAction(error)));
        });

    @Effect()
    cartProductDeleteEffect$: Observable<Action> = this.actions$
        .ofType(cartProductsActions.CART_PRODUCT_DELETE)
        .map(() => new transitionActions.TransitionCompletedAction());

    @Effect()
    cartProductSaveSuccessEffect$: Observable<Action> = this.actions$
        .ofType(cartProductsActions.CART_PRODUCT_SAVE_SUCCESS)
        .map(() => new transitionActions.TransitionCompletedAction())
        .do(_ => {
            this.router.navigate(['payment/address', UrlConstants.VALUE_SHIPPING]);
        });

    @Effect()
    cartProductContinueEffects$: Observable<Action> = this.actions$
        .ofType(cartProductsActions.CART_PRODUCT_CONTINUE_SAVE)
        .map((action: cartProductsActions.CartProductContinueAction) => action.payload)
        .switchMap((data) => {
            return this.cartService.saveCartProducts(data)
                .map(totalAmount => new cartProductsActions.CartProductContinueSuccessAction(totalAmount))
                .catch(error => of(new cartProductsActions.CartProductSaveFailedAction(error)));
        });

    @Effect()
    cartProductContinueSuccessEffect$: Observable<Action> = this.actions$
        .ofType(cartProductsActions.CART_PRODUCT_CONTINUE_SAVE_SUCCESS)
        .map(() => new transitionActions.TransitionCompletedAction())
        .do(_ => {
            this.router.navigate([UrlConstants.ROUTE_DASHBOARD]);
        });

        @Effect()
        cartProductSaveFailedEffect$: Observable<Action> = this.actions$
            .ofType(cartProductsActions.CART_PRODUCT_SAVE_FAILED)
            .map(() => new transitionActions.TransitionCompletedAction());

            @Effect()
            cartProductLoadFailedEffect$: Observable<Action> = this.actions$
                .ofType(cartProductsActions.CART_PRODUCT_LOAD_FAILED)
                .map(() => new transitionActions.TransitionCompletedAction());
}
