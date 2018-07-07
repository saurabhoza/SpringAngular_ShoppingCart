import { Injectable } from "@angular/core";
import { ProductDetailService } from "../services/product-detail.services";
import { ProductDetailLoadAction} from '../actions/product-detail.actions';
import { Effect,Actions } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { Action } from "@ngrx/store";
import { of } from 'rxjs/observable/of';
import * as productDetails from '../actions/product-detail.actions';
import * as transition from '../../../shared/actions/transition.actions';
import { Router } from "@angular/router";
@Injectable()
export class ProductDetailEffects{
    constructor(private actions$: Actions, private productDetailService: ProductDetailService, private router: Router) { }

   @Effect()
    productDetailLoadEffect$: Observable<Action> = this.actions$
        .ofType(productDetails.PRODUCT_DETAIL_LOAD)
        .map((action: productDetails.ProductDetailLoadAction) => action.payload)
        .switchMap((productId) => {
            return this.productDetailService.getProductDetail(productId)
                .map(productDetailModel => new productDetails.ProductDetailLoadSuccessAction(productDetailModel))
                .catch(error => of(new productDetails.ProductDetailLoadFaliedAction(error)));
        }); 
    @Effect()
    productDetailSuccessEffect$ : Observable<Action> = this.actions$
        .ofType(productDetails.PRODUCT_DETAIL_LOAD_SUCCESS)
        .map(() => new transition.TransitionCompletedAction())
        .do(_ => {
            this.router.navigate(['dashboard/productDetail']);
        });
}