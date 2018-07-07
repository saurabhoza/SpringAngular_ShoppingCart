import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';
import * as fromRootState from './../../application/shared/reducers';
import { Store, select } from '@ngrx/store';
import * as refData from './../../application/purchase/cart/actions/cart.actions';
import { CartProduct } from '../../application/purchase/cart/models/cart-product';
import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { LoggerService } from '../logger-service/logger-service';

@Component({
  selector: 'quantity-validation',
  templateUrl: './quantity-validation.component.html',
  styleUrls: ['./quantity-validation.component.scss'],
  animations: [
    trigger('hideShowAnimator', [
        state('true' , style({ opacity: 1 })),
        state('false', style({ opacity: 0 })),
        transition('0 => 1', animate('.5s')),
        transition('1 => 0', animate('.9s'))
    ])
  ]
})
export class QuantityValidationComponent {

  @Input()
  cartProduct: CartProduct;

  @Output()
  invalidQuantity: EventEmitter<string> = new EventEmitter<string>();

  hideShowAnimator = false;

  errorMessage = '';

  constructor(private store: Store<fromRootState.State>, private logger: LoggerService) {

  }

  validateQuantity() {
    if (this.cartProduct.quantity >= this.cartProduct.product.availableQuantity) {
      const errMsg = `We\'re sorry! We have only
                              ${this.cartProduct.product.availableQuantity} units of
                              ${this.cartProduct.product.name}`;
      this.showErrorMessage(errMsg);
      this.logger.error(errMsg);
      this.cartProduct.quantity = this.cartProduct.product.availableQuantity;
    }
    if (this.cartProduct.quantity === null ) {
      this.cartProduct.quantity = 1;
    }
  }

  incrementQuantity() {
    if (this.cartProduct.quantity >= this.cartProduct.product.availableQuantity) {
      const errMsg = `We\'re sorry! We have only
                              ${this.cartProduct.product.availableQuantity} units of
                              ${this.cartProduct.product.name}`;
      this.showErrorMessage(errMsg);
      this.logger.error(errMsg);
      this.cartProduct.quantity = this.cartProduct.product.availableQuantity;
    } else {
      this.cartProduct.quantity++;
    }
    this.store.dispatch(new refData.CartProductUpdateQuantitySuccessAction(this.cartProduct));
  }

  decrementQuantity() {
    if (this.cartProduct.quantity > 1) {
      this.cartProduct.quantity--;
      this.store.dispatch(new refData.CartProductUpdateQuantitySuccessAction(this.cartProduct));
    }
 }

 showErrorMessage(msg: string) {
   this.errorMessage = msg;
  let flag = true;
  this.hideShowAnimator = this.hideShowAnimator === true ? false : true;
       Observable.interval(10000)
           .takeWhile(() => flag)
           .subscribe(i => {
                    this.hideShowAnimator = this.hideShowAnimator === true ? false : true;
                    flag = false;
                    this.errorMessage = '';
       });
 }
}
