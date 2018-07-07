import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import * as productListActions from '../actions/product-list.actions';
import * as transitionActions from './../../../../application/shared/actions/transition.actions';
import { ProductListService } from "../services/product-list.services";
import { of } from 'rxjs/observable/of';
import * as productDetailsActions from '../../product-detail/actions/product-detail.actions';

@Injectable()
export class ProductListEffects {

    constructor(private actions$: Actions, private productListService: ProductListService) { }

    @Effect()
    productListLoadEffect$: Observable<Action> = this.actions$
        .ofType(productListActions.PRODUCT_LIST_LOAD)
        .switchMap(() => {
            return this.productListService.getProductList()
                .map(productList => new productListActions.ProductListLoadSuccessAction(productList))
                .catch(error => of(new productListActions.ProductListLoadFailedAction(error)));
        });
    @Effect()
    productListSuccessEffect$: Observable<Action> = this.actions$
        .ofType(productListActions.PRODUCT_LIST_LOAD_SUCCESS)
        .map(() => new transitionActions.TransitionCompletedAction());

    @Effect()
    productSelectLoadEffect$: Observable<Action> = this.actions$
        .ofType(productListActions.PRODUCT_SELECT)
        .map((action: productListActions.ProductSelectAction) => action.productId)
        .map(productId => new productDetailsActions.ProductDetailLoadAction(productId,'dashboard'));
}