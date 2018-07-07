import { Component,OnInit } from "@angular/core";
import { Product } from "../models/product.model";
import { Store } from "@ngrx/store";
import { AppTransition } from '../../../../framework/app-transition/app-transition';
import * as fromProductList from './../../reducers';
import * as fromRoot from '../../../shared/reducers';
import { Observable } from "rxjs/Observable";
import * as productListActions from '../actions/product-list.actions';
import * as cartActions from '../../../purchase/cart/actions/cart.actions';
import { CartProduct } from "../../../purchase/cart/models/cart-product";
import * as productDetailActions from '../../product-detail/actions/product-detail.actions';

@Component({
    selector : 'app-product-list',
    template : `<app-product-list-detail [model] = "productList$ | async"  [itemCount] = "itemCount$ | async" (itemAdded)="addItem($event)" 
                (productClicked) = "viewProductDetail($event)"></app-product-list-detail>`,
    styleUrls : ['./product-list.component.scss']
})

export class ProductListSmartComponent implements OnInit{

    productList$: Observable<Product[]>;
    itemCount$ : Observable<number>;
    constructor(private store: Store<fromProductList.DashboardState>,private rootStore: Store<fromRoot.State>, private appTransition: AppTransition){
      appTransition.appDispatch(store,new productListActions.ProductListLoadAction());     
      this.productList$ = this.store.select(fromProductList.getProductList);
      this.itemCount$ = this.rootStore.select(fromRoot.getCartItemCount);
    }
    ngOnInit(){}  

    addItem(cartProduct:CartProduct){ 
       this.appTransition.appDispatch(this.rootStore, new cartActions.CartProductAddAction(cartProduct));
    }

    viewProductDetail(productId:number){
        this.appTransition.appDispatch(this.store,new productDetailActions.ProductDetailLoadAction(productId,'dashboard'));    
     }
    
}