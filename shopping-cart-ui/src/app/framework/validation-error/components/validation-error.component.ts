import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'validation-errors',
  template: `
  <mat-list class="text-left" *ngIf="shouldShowErrors()">
  <mat-list-item *ngFor="let error of listOfErrors()">
  <mat-icon>error_outline</mat-icon>
  <p mat-line>{{error}}</p>
  </mat-list-item>
</mat-list>
  `,
  styleUrls: ['./validation-error.component.scss']
})
export class ValidationErrorsComponent {


  @Input()
  private control: AbstractControlDirective | AbstractControl;
  @Input()
  private errorFormField: any;
  constructor(){
      
  }

  shouldShowErrors(): boolean {
    let result:boolean= this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
      return result;
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return this.errorFormField[type](params);
  }

}
