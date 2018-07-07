import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as ca from '../../../shared/reducers';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
import { AppTransition } from '../../../../framework/app-transition/app-transition';
import { CartProduct } from '../models/cart-product';
import * as SharedReducer from './../../../shared/reducers';
import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { CartService } from '../services/cart.service';
import * as CartActions from './../../../purchase/cart/actions/cart.actions';
import * as CartSelector from '../../../purchase/reducers';

@Component({
  selector: 'app-cart',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss'],
  animations: [
    trigger('hideShowAnimator', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('0 => 1', animate('.5s')),
      transition('1 => 0', animate('.9s'))
    ])
  ]
})
export class CartComponent {

  private hideShowAnimator = false;

  errorMessage = '';

  cartProductList: CartProduct[];

  constructor(private store: Store<SharedReducer.State>, private appTransition: AppTransition, private router: Router) {
    appTransition.appDispatch(store, new CartActions.CartProductLoadAction());
    this.store.select(CartSelector.getProductList).subscribe(cartProduct => this.cartProductList = cartProduct);
  }

  routeToUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  removeProductFromCart(product: CartProduct) {
    this.appTransition.appDispatch(this.store, new CartActions.CartProductDeleteAction(product));
  }

  showErrorMessage(msg: string) {
    this.errorMessage = msg;
    this.hideShowAnimator = this.hideShowAnimator === true ? false : true;
    let flag = true;

    Observable.interval(10000)
      .takeWhile(()  => flag)
      .subscribe(i  =>  {
        this.hideShowAnimator = this.hideShowAnimator === true ? false : true;
        flag = false;
        this.errorMessage = '';
      });
  }

  saveCartProducts(isSaveCart: boolean) {
    if (isSaveCart) {
      this.appTransition.appDispatch(this.store, new CartActions.CartProductSaveAction(this.cartProductList));
    } else {
      this.appTransition.appDispatch(this.store, new CartActions.CartProductContinueAction(this.cartProductList));
    }
  }
}
