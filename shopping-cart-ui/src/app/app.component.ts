import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './application/shared/reducers';
import { Router } from '@angular/router';
import * as refData from './application/shared/actions/reference-data.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  lang = new Subject<string>();
  lang$: Observable<string>;
  progress$: Observable<Boolean>;
  progress: Boolean;

  constructor(private readonly translate: TranslateService,
    private readonly store: Store<fromRoot.State>, private router: Router) {
    this.translate.setDefaultLang('en');
    this.lang$ = this.store.select(fromRoot.getCurrentLanguage);
    this.progress$ = this.store.select(fromRoot.isTransitionActive);
    this.lang$.subscribe(lang => this.translate.use(lang));
    this.progress$.subscribe(progress => this.progress = progress);
  }

  ngOnInit() {
  }

}
