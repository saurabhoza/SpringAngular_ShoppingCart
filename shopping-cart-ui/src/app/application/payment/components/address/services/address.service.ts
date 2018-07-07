import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import * as fromHome from '../../../../home/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { Address } from '../models/address';
import { of } from 'rxjs/observable/of';
import { environment } from '../../../../../../environments/environment';
import { UrlConstants } from '../../../../shared/models/UrlConstants';
import * as PaymentIndex from './../../../reducers/index';

@Injectable()
export class AddressService {
    private API_PATH = environment.serviceContext + UrlConstants.REST_ADDRESS;
    token: string;
    shippingAddress: Address;

    constructor(private http: Http, private store: Store<fromHome.HomeState>) {
        store.select(fromHome.getToken).subscribe(token => this.token = token);
    }

    saveAddress(address: Address): Observable<Address> {
        const addressList: Address[] = [];
        let options                  = null;
        const headers                = new Headers({ 'Content-Type': 'application/json' });
        address.isShippingAddress    = false;

        this.store.select(PaymentIndex.getShippingAddress).subscribe(shippingAddress => this.shippingAddress = shippingAddress);
        this.shippingAddress.isShippingAddress = true;

        addressList.push(address);
        addressList.push(this.shippingAddress);

        headers.append('Authorization', this.token);
        const options = new RequestOptions({ headers: headers });

        return this.http.post(this.API_PATH, addressList, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}
