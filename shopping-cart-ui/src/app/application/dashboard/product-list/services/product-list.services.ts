import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import * as fromHome from './../../../home/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { Product } from "../models/product.model";
import { of } from 'rxjs/observable/of';
import { environment } from "../../../../../environments/environment";
@Injectable()
export class ProductListService{
    private API_PATH = environment.serviceContext +'products';
    token:string;    
    constructor(private http:Http,private store: Store<fromHome.HomeState> ){        
        store.select(fromHome.getToken).subscribe(token => this.token = token);
    }
 
     getProductList() : Observable<Product[]>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.token);
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.API_PATH,options)
        .map((res:Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }   

}
