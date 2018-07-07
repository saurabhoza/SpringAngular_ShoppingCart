import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../shared/reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  template: `<app-header-detail [routUrl]="routUrl | async"></app-header-detail>`
})
export class HeaderComponent {
  routUrl: Observable<string>;
  constructor(private store: Store<fromRoot.State>) {
    this.routUrl = store.select(fromRoot.getRouterUrl);
  }
}
