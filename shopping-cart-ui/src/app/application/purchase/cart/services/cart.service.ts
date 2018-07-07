import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import * as fromHome from './../../../home/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { CartProduct } from '../models/cart-product';
import { of } from 'rxjs/observable/of';
import * as fromCartProductList from './../../reducers';
import * as fromRoot from '../../../shared/reducers';
import { environment } from '../../../../../environments/environment';
import { UrlConstants } from '../../../shared/models/UrlConstants';

@Injectable()
export class CartService {
    private API_PATH = environment.serviceContext + UrlConstants.REST_CART;
    private API_PATH_CART_PRODUCT = environment.serviceContext + 'cartproduct';
    token: string;
    userId: number;

    constructor(private http: Http, private store: Store<fromHome.HomeState>) {
        store.select(fromHome.getToken).subscribe(token => this.token = token);
        store.select(fromHome.getLoginId).subscribe(userId => this.userId = userId);
    }

    addCartProducts(cartProduct: CartProduct): Observable<CartProduct> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.token);
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.API_PATH_CART_PRODUCT, cartProduct, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    saveCartProducts(cartProducts: CartProduct[]): Observable<number> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.token);
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.API_PATH, cartProducts, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getCartProducts(): Observable<CartProduct[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.token);
        const options = new RequestOptions({ headers: headers});
        return this.http.get(this.API_PATH, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}