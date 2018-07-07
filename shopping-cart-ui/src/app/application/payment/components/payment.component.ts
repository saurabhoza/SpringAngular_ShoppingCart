import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppTransition } from '../../../framework/app-transition/app-transition';
import { TranslateService } from '@ngx-translate/core';
import { CreditCardValidation } from '../validations/credit-card-validation';
import * as paymentActions from '../actions/payment.actions';
import { CreditCard } from '../models/creditCard';
import * as $ from "jquery";
import './../../../../assets/scripts/simplify.js'
import { Payment } from '../models/payment';
import { Store } from '@ngrx/store';
import * as fromPayment from './../reducers';
import * as fromRoot from '../../shared/reducers';
import * as fromPurchase from '../../purchase/reducers';
import * as transitionActions from './../../../application/shared/actions/transition.actions';
declare var SimplifyCommerce: any;
const PAYMENT_KEY = 'sbpb_Y2ZmMGE4NWItNjg3OS00ZWRmLTkwODMtYmYzYzJiNDQwZDMx';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent extends CreditCardValidation{
  creditCardForm: FormGroup;
  cvvTipDisplay = 'none';
  currYear: number = Number(new Date().getFullYear().toString().substring(2));
  yearOptions: number[] = Array(5).fill(this.currYear).map((x, i) => x + i);
  paymentOption: number = 1;
  errorList: any[] = [];
  totalAmount: number = 0;
  monthOptions: Object = [
    { key: 1, value: '01' },
    { key: 2, value: '02' },
    { key: 3, value: '03' },
    { key: 4, value: '04' },
    { key: 5, value: '05' },
    { key: 6, value: '06' },
    { key: 7, value: '07' },
    { key: 8, value: '08' },
    { key: 9, value: '09' },
    { key: 10, value: '10' },
    { key: 11, value: '11' },
    { key: 12, value: '12' }
  ];
  constructor(private _formbuilder: FormBuilder, private appTransition: AppTransition, private readonly translate: TranslateService, private rootStore: Store<fromRoot.State>, private purchaseStore: Store<fromPurchase.State>, private store: Store<fromPayment.PaymentState>) {
    super(translate);
    purchaseStore.select(fromPurchase.getTotalAmountFromCart).subscribe(totalAmount => this.totalAmount = totalAmount);
    this.creditCardForm = _formbuilder.group({
      nameOnCard: [null, [Validators.required, Validators.maxLength(20), Validators.pattern("^[A-z ]*$")]],
      cardNumber: [null, [Validators.required, Validators.maxLength(19), Validators.minLength(13), Validators.pattern("^[0-9]*$")]],
      expMonth: [null, [Validators.required]],
      expYear: [null, [Validators.required]],
      cvvNo: [null, [Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern("^[0-9]*$")]]
    },
      {
        validator: Validators.compose([])
      })
  }
  
  generatePaymentToken(creditCard: CreditCard) {
    this.rootStore.dispatch(new transitionActions.TransitionStartedAction);
    SimplifyCommerce.generateToken({
      key: PAYMENT_KEY,
      card: {
        number: creditCard.cardNumber,
        cvc: creditCard.cvvNo,
        expMonth: creditCard.expMonth,
        expYear: creditCard.expYear
      }
    },(data)=>{
      if (data.error) {
        if (data.error.code == 'validation') {
          let fieldErrors:any[] = data.error.fieldErrors;
          let fieldErrorsLength = fieldErrors.length;
          this.errorList=[];
          fieldErrors.forEach(error => {
            this.errorList.push(error);
          });
        }
        this.rootStore.dispatch(new transitionActions.TransitionCompletedAction);
      } else {
        let payment: Payment= new Payment();
        payment.token= data["id"];
        payment.amount=this.totalAmount;
        payment.saveCard= false;
        this.store.dispatch(new paymentActions.PaymentProcessAction(payment));
      }
    });
  }
  dispalyCvvTip() {
    this.cvvTipDisplay = '';
  }
  hideCvvTip() {
    this.cvvTipDisplay = 'none';
  }
  submitForm(formGroup: FormGroup) {
    if(this.paymentOption>1)
    {
      alert("Selected payment option is not supported.")
      return false;
    }
    if(this.paymentOption===0)
    {
      alert("Please select a payment method.")
      return false;
    }
    this.validateAllFormFields(formGroup);
    if (formGroup.valid) {
      this.generatePaymentToken(this.creditCardForm.value as CreditCard);
    } else {
      return false;
    }
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  setPaymentOption(index: number) {
    this.paymentOption = index;
  }
  paymentOptionClosed(index: number){
if(index === this.paymentOption){
  this.paymentOption=0;
}
  }
}
