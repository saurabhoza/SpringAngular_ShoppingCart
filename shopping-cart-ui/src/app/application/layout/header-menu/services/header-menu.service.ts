import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HeaderMenu } from '../models/header-menu';
import * as fromHome from './../../../home/reducers';
import { Store } from '@ngrx/store';
import { environment } from '../../../../../environments/environment';


@Injectable()
export class HeaderMenuService {
  private API_PATH = environment.serviceContext + 'accesses';
  token: string;
  type: string= 'MENU';
  constructor(private http: Http, private store: Store<fromHome.HomeState>) {
    store.select(fromHome.getToken).subscribe(token => this.token = token);
  }

  getHeaderMenu(): Observable<HeaderMenu[]> {
    //let bodyString = JSON.stringify(memberProfile); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    headers.append('Authorization', this.token);
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.get(this.API_PATH + '/' + this.type, options) // ...using get request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }
}