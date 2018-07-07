import { Component,OnInit } from "@angular/core";
import { ProductDetail } from "../models/productDetail";
import { Observable } from "rxjs/Observable";
import { AppTransition } from '../../../../framework/app-transition/app-transition';
import { Store } from "@ngrx/store";
import * as fromProductDetails from './../../reducers';
import { Router,ActivatedRoute } from "@angular/router";
import { CartProduct } from "../../../purchase/cart/models/cart-product";
import * as fromRoot from '../../../shared/reducers';
import * as cartActions from '../../../purchase/cart/actions/cart.actions';

@Component({
    selector : 'app-product-detail',
    template : `<app-product-detail-detail [model] = "product$ | async"  (backEvent)="navigateToProductList()" 
                   (itemAdded)="addItem($event)"></app-product-detail-detail>`    
})
export class ProductDetailsComponent{

    product$:Observable<ProductDetail>;
    itemCount$ : Observable<number>;
    backURL:string;
    constructor(private store: Store<fromProductDetails.DashboardState>,private rootStore: Store<fromRoot.State>,private appTransition: AppTransition, private router: Router,private route:ActivatedRoute){        
        this.product$ = this.store.select(fromProductDetails.getSelectedProduct);   
        this.itemCount$ = this.rootStore.select(fromRoot.getCartItemCount);       
        this.store.select(fromProductDetails.getBackURL).subscribe(backURL => this.backURL = backURL);   
        
    }

    navigateToProductList(){              
        this.router.navigate([this.backURL]);
    }

    addItem(cartProduct:CartProduct){ 
        this.appTransition.appDispatch(this.rootStore, new cartActions.CartProductAddAction(cartProduct));
     }
}