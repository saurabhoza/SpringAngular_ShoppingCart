import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../shared/reducers/';
import * as fromPurchase from './../../../purchase/reducers';
import { AppTransition } from '../../../../framework/app-transition/app-transition';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-header-detail',
    templateUrl: './header-detail.component.html',
    styleUrls: ['./header-detail.component.scss']
})
export class HeaderDetailComponent {

    _routUrl: string;
    showHeader: boolean;
    itemsCount$: Observable<number[]>;
    @Input()
    set routUrl(routUrl: string) {
        console.log('prev value: ', this._routUrl);
        console.log('got routUrl: ', routUrl);
        this._routUrl = routUrl;
        this.showHeader = !(this._routUrl === '/home' || this._routUrl === null);
    }
    constructor(private store: Store<fromPurchase.State>, private appTransition: AppTransition) {
        this.itemsCount$ = this.store.select(fromPurchase.getCartProductIds);
    }
}
