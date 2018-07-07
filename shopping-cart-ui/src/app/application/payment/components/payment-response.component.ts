import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromPayment from './../reducers/index';
import { Observable } from 'rxjs/Observable';
import { Payment } from '../models/payment';

@Component({
  selector: 'payment-response',
  templateUrl: './payment-response.component.html',
  styleUrls: ['./payment-response.component.scss']
})
export class PaymentResponseComponent {
  payment: Payment= new Payment();
  constructor(private store: Store<fromPayment.State>) {
    store.select(fromPayment.getPayment).subscribe(payment => this.payment= payment);
  }
  viewOrders(){
    alert('This functionality is disabled');
  }
}
