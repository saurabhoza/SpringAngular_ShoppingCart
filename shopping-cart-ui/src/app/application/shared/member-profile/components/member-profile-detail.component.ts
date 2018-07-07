import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as user from './../actions/member-profile.actions';
import * as fromRoot from './../../../shared/reducers';
import { MemberProfile } from './../models/member-profile';

@Component({
  selector: 'app-member-profile-detail',
  templateUrl: './member-profile-detail.component.html',
  styleUrls: ['./member-profile-detail.component.scss']
})
export class MemberProfileDetailComponent{
     _model: MemberProfile= new MemberProfile();

    @Input()
    set model(model: MemberProfile) {
      this._model =  model ? model : new MemberProfile();
    }

    constructor(){
    }

}
