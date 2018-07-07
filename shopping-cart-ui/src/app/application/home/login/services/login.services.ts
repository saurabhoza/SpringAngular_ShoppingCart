import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Login } from '../models/login';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class LoginService {
  private API_PATH = environment.serviceContext +'login';

  constructor(private http: Http) { }

  performLogin(login: Login): Observable<Login> {
    const bodyString = JSON.stringify(login); // Stringify payload
    const encodedAuth: string = "Basic " + btoa(login.userName + ":" + login.password);
    const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    headers.append('Authorization', encodedAuth);
    const options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(this.API_PATH, login, options) // ...using post request
      .map((res: Response) => {
        console.log(JSON.stringify(res));
        return res.json();
      }
      ) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json() || 'Server error')); // ...errors if any
  }
}