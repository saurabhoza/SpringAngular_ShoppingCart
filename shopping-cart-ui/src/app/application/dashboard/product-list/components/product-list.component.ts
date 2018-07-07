import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Product } from "../models/product.model";
import { Store } from "@ngrx/store";
import { AppTransition } from '../../../../framework/app-transition/app-transition';
import * as productList from './../../reducers';
import { CartProduct } from "../../../purchase/cart/models/cart-product";


@Component({
    selector: 'app-product-list-detail',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent {
    productList: Product[];
    _itemCount: number;
    @Output()
    itemAdded: EventEmitter<CartProduct> = new EventEmitter<CartProduct>();
    @Output()
    productClicked: EventEmitter<number> = new EventEmitter<number>();    
    @Input()
    set model(model: Product[]) {
        this.productList = model
    }
    @Input()
    set itemCount(itemCount: number) {
        this._itemCount = itemCount;
    }
    constructor() { }

    addToCart(product: Product, itemCount: number) {

        let cartProduct = new CartProduct();
        cartProduct.id = product.id;
        cartProduct.quantity = itemCount;
        cartProduct.product = product;
        this.itemAdded.next(cartProduct);
    }
    viewDetails(product: Product) {
        this.productClicked.next(product.id);
    }
}
