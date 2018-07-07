import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as memberProfile from './../actions/member-profile.actions';
import * as fromRootState from '../../reducers';
import { MemberProfile } from './../models/member-profile';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
import { AppTransition } from '../../../../framework/app-transition/app-transition';

@Component({
  selector: 'app-member-profile',
  template: `<app-member-profile-detail [model]= "memberProfile$ | async" ></app-member-profile-detail>`,
  styleUrls: ['./member-profile-detail.component.scss']
})
export class MemberProfileComponent implements OnInit{
    memberProfileid$: Observable<string>;
    memberProfile$: Observable<MemberProfile>;
    constructor(private store: Store<fromRootState.State>, appTransition: AppTransition){
        //this.store.dispatch(new memberProfile.MemberProfileLoadAction());
        appTransition.appDispatch(store,new memberProfile.MemberProfileLoadAction());
        //this.user$=this.store.select('dashboard');
        //this.userid$=this.store.select<string>(state=>state.dashboard.users.selectedId);
        this.memberProfile$=this.store.select(fromRootState.getSelectedMemberProfile);
        //this.memberProfile$=appTransition.appSelect(store,fromDashboard.getSelectedMemberProfile);
    }

    ngOnInit(){
    }

}
