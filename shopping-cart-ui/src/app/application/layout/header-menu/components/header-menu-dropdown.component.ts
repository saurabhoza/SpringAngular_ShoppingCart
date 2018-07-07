import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMenu } from '../models/header-menu';

@Component({
    selector: 'app-header-menu-dropdown',
    templateUrl: './header-menu-dropdown.component.html',
    styleUrls: ['./header-menu-dropdown.component.scss']
})
export class HeaderMenuDropdownComponent implements AfterViewChecked{
    @Input() headerMenu: HeaderMenu;
    @Input() headerMenuList: { [id: string]: HeaderMenu };
    @Output() menuClicked: EventEmitter<string> = new EventEmitter<string>();
    constructor(private cdRef:ChangeDetectorRef) {
    }
    goToUrl(url: string) {
        this.menuClicked.next(url);
    }
    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }
}
