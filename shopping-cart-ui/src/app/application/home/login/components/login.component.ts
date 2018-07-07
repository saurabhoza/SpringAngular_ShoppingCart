import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as login from './../actions/login.actions';
import * as fromHome from './../../reducers';
import { Login } from './../models/login';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  template: `<app-login-detail [model]="login$ | async" ></app-login-detail>`
})
export class LoginComponent implements OnInit{
    loginForm:FormGroup;
    login$: Observable<Login>;
    constructor(private store: Store<fromHome.HomeState>){
        this.login$=this.store.select(fromHome.getLogin);
    }

    ngOnInit(){
    }

    onSubmit(){
        this.store.dispatch(new login.LoginSubmitAction(this.loginForm.value as Login));    
    }

}
