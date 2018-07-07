import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MemberProfile } from '../models/member-profile';
import * as fromHome from './../../../home/reducers';
import { Store } from '@ngrx/store';
import { environment } from '../../../../../environments/environment';


@Injectable()
export class MemberProfileService {
  private API_PATH = environment.serviceContext + 'members';
  logInMemberId: number;
  token: string;
  constructor(private http: Http, private store: Store<fromHome.HomeState>) {
    store.select(fromHome.getLoginMemberId).subscribe(memberId => this.logInMemberId = memberId);
    store.select(fromHome.getToken).subscribe(token => this.token = token);
  }

  getMemberProfile(): Observable<MemberProfile> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.API_PATH + '/' + this.logInMemberId, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
