import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../application/shared/reducers';
import * as refData from './../../../application/shared/actions/reference-data.actions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ReferenceData } from '../../../application/shared/models/reference-data';

@Component({
    selector: 'app-language-bar',
    template: `<app-language-bar-detail [referenceData]= "referenceData$ | async" [selectedLang]= "selectedLang$ | async" (languageChanged) ="changeLanguage($event)"></app-language-bar-detail>`
})
export class LanguageBarComponent implements OnInit {
    referenceData$: Observable<ReferenceData>;
    selectedLang$: Observable<string>;
    langOptions: string[];
    lang: string;
    constructor(private readonly store: Store<fromRoot.State>, private router: Router) {
        this.referenceData$ = this.store.select(fromRoot.getReferenceData);
        this.selectedLang$ = this.store.select(fromRoot.getCurrentLanguage);
    }
    ngOnInit(): void {
    }
    changeLanguage(lang: string) {
        this.store.dispatch(new refData.LanguageSetAction(lang));
        this.referenceData$ = this.store.select(fromRoot.getReferenceData);
    }
}
