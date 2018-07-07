import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReferenceData } from '../../../application/shared/models/reference-data';

@Component({
    selector: 'app-language-bar-detail',
    templateUrl: './language-bar-detail.component.html',
    styleUrls: ['./language-bar-detail.component.scss']
})
export class LanguageBarDetailComponent {
    langOptions: string[];
    lang: string;
    @Output() languageChanged:EventEmitter<string> = new EventEmitter<string>();
    @Input()
    set referenceData(referenceData: ReferenceData) {
        this.langOptions = referenceData.languageOptions;
    }
    @Input()
    set selectedLang(selectedLang: string){
        this.lang = selectedLang;
    }
    constructor() {
    }
    changeLanguage(lang: string) {
        this.languageChanged.next(lang);
    }
}
