import { Component,Input,Output,EventEmitter } from "@angular/core";
import { ProductDetail } from "../models/productDetail";
import { CartProduct } from "../../../purchase/cart/models/cart-product";
import { Product } from "../../product-list/models/product.model";

@Component({
    selector : 'app-product-detail-detail',
    templateUrl : './product-detail-detail.component.html',
    styleUrls : ['./product-detail-detail.component.scss']
})
export class ProductDetailsDetailComponent{

    product:ProductDetail;    
    @Output()
    backEvent: EventEmitter<any> = new EventEmitter();
    @Output()
    itemAdded: EventEmitter<CartProduct> = new EventEmitter<CartProduct>();
    @Input()
    set model(model: ProductDetail) {
        this.product = model
    }  

    constructor(){}

    back(){                
        this.backEvent.next();
    }

    addToCart(productDetail: ProductDetail, itemCount: number) {
        let cartProduct = new CartProduct();
        cartProduct.id = productDetail.id;
        cartProduct.quantity = itemCount;                          
        cartProduct.product = this.getProductInfo(productDetail);
        this.itemAdded.next(cartProduct);
   }

   getProductInfo(productDetail:ProductDetail){
        let product = new Product();
        product.id = productDetail.id;
        product.name = productDetail.name;
        product.price = productDetail.sellingPrice;
        product.quantityAvailable = productDetail.availableQuantity
        product.thumbnailURL = productDetail.thumbnailURL;
        return product;
   }
}