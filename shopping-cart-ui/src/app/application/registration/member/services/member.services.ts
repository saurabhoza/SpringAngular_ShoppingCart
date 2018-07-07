import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Member } from '../models/member';
import * as fromHome from './../../../home/reducers';
import { Store } from '@ngrx/store';
import { environment } from '../../../../../environments/environment';


@Injectable()
export class MemberService {
    private API_PATH = environment.serviceContext +'members';
    token: string;

    constructor(private http: Http, private store: Store<fromHome.HomeState>) { 
        store.select(fromHome.getToken).subscribe(token => this.token = token);
    }

    getMember(member: Member): Observable<Member> {
        let bodyString = JSON.stringify(member); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        headers.append('Authorization', this.token);
        let options = new RequestOptions({ headers: headers }); // Create a request option

        //return this.http.get(this.API_PATH +'/${member.id}', options) // ...using get request
        return this.http.get(this.API_PATH + '/1', options) // ...using get request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
    saveMember(member: Member): Observable<Member> {
        let bodyString = JSON.stringify(member); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        headers.append('Authorization', this.token);
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.API_PATH, member, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
}