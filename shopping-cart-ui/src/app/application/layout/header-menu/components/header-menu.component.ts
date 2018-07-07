import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AppTransition } from '../../../../framework/app-transition/app-transition';
import * as fromRoot from './../../../shared/reducers';
import * as headerMenuActions from './../actions/header-menu.actions';
import * as cartActions from './../../../purchase/cart/actions/cart.actions';
import * as refDataActions from './../../../shared/actions/reference-data.actions';
import { Store } from '@ngrx/store';
import { HeaderMenu } from '../models/header-menu';
import { Observable } from 'rxjs/Observable';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
    selector: 'app-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.scss'],
    animations: [
        trigger('notificationCountState', [
          state('start', style({            
            borderRadius:'50%',
            backgroundColor:'rgba(255, 4, 4, 0.5)',
            height:'50px',
            minWidth:'50px',
            position:'absolute',
            top:'-20px',
            left:'0px',
            color:'white',
            fontSize:'30px',
            lineHeight:'50px',
            textAlign: 'center',                        
          })),
          state('end', style({
            borderRadius:'50%',
            backgroundColor:'rgba(255, 4, 4)',
            height:'15px',
            minWidth:'15px',
            position:'absolute',
            top:'2px',
            left:'40px',
            color:'white',
            fontSize:'10px',
            lineHeight:'15px',
            textAlign: 'center',            
          })),
          transition('start => end', animate('100ms ease-in')),
          transition('end => start', animate('100ms ease-out'))
        ])
      ]
})
export class HeaderMenuComponent {
    rootMenuList: HeaderMenu[];
    headerMenuList:  Observable<{ [id: string]: HeaderMenu }>;
    stateVal:string;    
     
    _itemCount:number=0;
    @Input()
    set itemCount(itemCount:number[]) {
        if(itemCount.length !== this._itemCount){
        this.toggle(itemCount);
        }
        //this._itemCount = itemCount;        
    }
    constructor(private store: Store<fromRoot.State>,private appTransition: AppTransition, private router: Router) {
        //appTransition.appDispatch(store,new headerMenuActions.HeaderMenuLoadAction());
        this.store.select(fromRoot.getHeaderMenuList).subscribe(headerMenuList => this.rootMenuList = headerMenuList.filter(headerMenu => headerMenu.isRoot === 'Y'));
        this.headerMenuList = this.store.select(fromRoot.getHeaderMenuEntities);
        appTransition.appDispatch(store,new cartActions.CartProductLoadAction());
        this.stateVal = 'end';       
    }
    routeToUrl(url: string) {
        this.router.navigateByUrl(url);
    }
    toggle(itemCount:number[]){
        let flag = true;
        this.stateVal = this.stateVal=='start' ?'end' :'start';
        this._itemCount = itemCount.length;          
        Observable.interval(400)
            .takeWhile(() =>flag)
            .subscribe(i => { 
                     this.stateVal = this.stateVal=='start' ?'end' :'start';
                     flag = false;
        }) 
    }
    
}
