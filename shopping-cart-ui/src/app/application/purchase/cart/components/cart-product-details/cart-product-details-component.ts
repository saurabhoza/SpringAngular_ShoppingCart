import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartProduct } from '../../models/cart-product';
import * as fromProductList from './../../../../dashboard/reducers';
import { Store } from '@ngrx/store';
import { AppTransition } from '../../../../../framework/app-transition/app-transition';
import * as productDetailActions from '../../../../dashboard/product-detail/actions/product-detail.actions';

@Component({
  selector: 'app-cart-product-details',
  templateUrl: './cart-product-details-component.html',
  styleUrls: ['./../cart-detail.component.scss']
})
export class CartProductDetailsComponent {

  constructor(private store: Store<fromProductList.DashboardState>, private appTransition: AppTransition) {

  }

  @Input()
  cartProductList: CartProduct[];

  @Output()
  removedProduct: EventEmitter<CartProduct> = new EventEmitter<CartProduct>();

  removeProductFromCart(product: CartProduct) {
    console.log(product.id);
    this.removedProduct.next(product);
  }

  viewProductDetail(productId: number) {
    this.appTransition.appDispatch(this.store, new productDetailActions.ProductDetailLoadAction(productId, 'cart'));
 }
}
