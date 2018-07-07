import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as login from './../actions/login.actions';
import * as fromRoot from './../../../shared/reducers';
import { Login } from './../models/login';

@Component({
  selector: 'app-login-detail',
  templateUrl: './login-detail.component.html',
  styleUrls: ['./login-detail.component.scss']
})
export class LoginDetailComponent implements OnInit{
    @Input()
    _model:Login;
    @Input()
    set model(model: Login) {
        this._model = model;
    }

    loginForm:FormGroup;    
    constructor(private _formbuilder:FormBuilder, private store: Store<fromRoot.State>){
        this.loginForm = _formbuilder.group({
            userName:[null,[Validators.required]],
            password:[null,[Validators.required]]
            })
    }

    ngOnInit(){
    }

    onSubmit(){
        this.store.dispatch(new login.LoginSubmitAction(this.loginForm.value as Login));    
    }

}
