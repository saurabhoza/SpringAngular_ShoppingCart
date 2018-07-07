import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import * as fromHome from '../../../home/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ProductDetail } from '../models/productDetail';
import { of } from 'rxjs/observable/of';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class ProductDetailService {
    private API_PATH = environment.serviceContext + 'products';
    token: string;

    constructor(private http: Http, private store: Store<fromHome.HomeState>) {
        store.select(fromHome.getToken).subscribe(token => this.token = token);
    }

    getProductDetail(productId: number): Observable<ProductDetail> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.token);
        const options = new RequestOptions({ headers: headers });
        const url = this.API_PATH + '/' + productId;
        return this.http.get(url, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
