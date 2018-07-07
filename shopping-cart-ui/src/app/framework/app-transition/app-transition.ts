import { Store } from '@ngrx/store';
import * as fromRoot from './../../application/shared/reducers';
import * as transition from './../../application/shared/actions/transition.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class AppTransition {
    constructor(private store: Store<fromRoot.State>) {}
    appDispatch( store: Store<any>, action: any) {
        this.store.dispatch(new transition.TransitionStartedAction());
        store.dispatch(action);
    }
}