import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CartProduct } from '../../models/cart-product';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Observable } from 'rxjs/Observable';

/**
 * This component handles the cart price details section.
 */
@Component({
  selector: 'app-cart-price-details',
  templateUrl: './cart-price-details.component.html',
  styleUrls: ['./../cart-detail.component.scss'],
  animations: [
    trigger('myAwesomeAnimation', [
        state('small', style({
            transform: 'scale(1)',
        })),
        state('large', style({
            transform: 'scale(1)',
        })),
        transition('small <=> large', animate('300ms ease-in', keyframes([
          style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
          style({opacity: 1, transform: 'translateY(35px)',  offset: 0.5}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))),
    ]),
  ]
})
export class CartPriceDetailsComponent {

  @Input()
  cartProductList: CartProduct[];

  state = 'small';

  totalItems = 0;

  constructor() { }

  /*
  This method calculates the total Items price of the cart
  */
  calculateItemsPrice(): number {
    this.totalItems = 0;
    let totalSum = 0;
    this.cartProductList.forEach(cartProduct => {
      totalSum += (cartProduct.product.mrp * cartProduct.quantity);
      this.totalItems += cartProduct.quantity;
    });
    return totalSum;
  }

  /**
   * This method calculates the total amount to be payable.
   */
  calculateAmountPayable(): number {
    return this.calculateItemsPrice() + 1000 ;
  }

  /**
   * This method counts the total number of items available in the cart.
   */
  countTotalItems(): number {
    let totalItems = 0;
    this.cartProductList.forEach(cartProduct => {
      totalItems += Number(cartProduct.quantity);
    });
    return totalItems;
  }
}
