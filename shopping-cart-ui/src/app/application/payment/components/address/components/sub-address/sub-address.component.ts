import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppTransition } from '../../../../../../framework/app-transition/app-transition';
import { TranslateService } from '@ngx-translate/core';
import { AddressValidation } from '../../validations/address-validation';
import { Address } from '../../models/address';
import { Store } from '@ngrx/store';
import * as SharedReducer from '../../../../../shared/reducers';
import * as AddressActions from './../../actions/address.actions';
import { UrlConstants } from '../../../../../shared/models/UrlConstants';
import * as PaymentIndex from './../../../../reducers/index';

@Component({
  selector: 'app-sub-address',
  templateUrl: './sub-address.component.html',
  styleUrls: ['./sub-address.component.css']
})
export class SubAddressComponent extends AddressValidation {

  static readonly YES = 'Yes';
  static readonly NO  = 'No';

  addressType: string;
  shippingAddress: Address;
  addressForm: FormGroup;
  Url_Constants     = UrlConstants;
  sameAddress       = SubAddressComponent.YES;
  checked           = true;
  errorList: any[]  = [];
  isReadOnly        = false;


  @Input()
  set parentAddressType(addressType: string) {
    this.addressType = addressType;
    if ((this.addressType === UrlConstants.VALUE_BILLING) && (this.sameAddress === SubAddressComponent.YES)) {
      this.isReadOnly = true;
    }
  }


  constructor(private _formbuilder: FormBuilder, private appTransition: AppTransition, private readonly translate: TranslateService,
    private store: Store<SharedReducer.State>) {

    super(translate);
    this.addressForm = _formbuilder.group({
      fullName: [null, [Validators.required, Validators.maxLength(150), Validators.pattern('^[a-zA-Z][a-zA-Z ]*$')]],
      mobileNumber: [null, [Validators.required, Validators.maxLength(20), Validators.pattern('^[0-9]*$')]],
      pinCode: [null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(6), Validators.minLength(6)]],
      addressLine1: [null, [Validators.required, Validators.maxLength(300)]],
      addressLine2: [null, [Validators.required, Validators.maxLength(300)]],
      landMark: [null, [Validators.required, Validators.maxLength(300)]],
      townCity: [null, [Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z][a-zA-Z ]*$')]],
      state: [null, [Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z][a-zA-Z ]*$')]]
    },
      {
        validator: Validators.compose([])
      });
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

  submitForm(formGroup: FormGroup) {
    this.validateAllFormFields(formGroup);
    if (formGroup.valid) {
      const address = this.addressForm.value as Address;
      if (UrlConstants.VALUE_SHIPPING === this.addressType) {
        this.appTransition.appDispatch(this.store, new AddressActions.ShippingAddressSaveAction(address));
      } else {
        this.appTransition.appDispatch(this.store, new AddressActions.BillingAddressSaveAction(address));
      }
    } else {
      return false;
    }
  }

  checkLength(event: any) {
    if (event.target.value.length > event.target.maxLength) {
      event.target.value = event.target.value.slice(0, event.target.maxLength);
    }
  }

  onToggle(event: any) {
    if (this.sameAddress === SubAddressComponent.YES) {
      this.isReadOnly  = false;
      this.sameAddress = SubAddressComponent.NO;
      this.addressForm.reset();
    } else {
      this.isReadOnly  = true;
      this.sameAddress = SubAddressComponent.YES;
      this.store.select(PaymentIndex.getShippingAddress).subscribe(shippingAddress => this.shippingAddress = shippingAddress);
      for (const name in this.addressForm.controls) {
        this.addressForm.controls[name].setValue(this.shippingAddress[name]);
      }
    }
  }

  public getStore(): Store<SharedReducer.State> {
    return this.store;
  }
}
