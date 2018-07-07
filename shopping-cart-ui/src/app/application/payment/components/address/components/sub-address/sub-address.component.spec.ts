import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Action, ReducerManager, ReducerManagerDispatcher } from '@ngrx/store';
import { SubAddressComponent } from './sub-address.component';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { reducers as paymentReducers } from './../../../../reducers';
import * as PaymentIndex from './../../../../reducers/index';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from './../../../../../../common/app-common.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import * as fromRoot from './../../../../../shared/reducers';
import { PaymentComponent } from './../../../../components/payment.component';
import { PaymentEffects } from './../../../../effects/payment.effects';
import { PaymentService } from './../../../../services/payment.service';
import { AddressComponent } from './../../../../components/address/components/address.component';
import { AddressEffects } from './../../../../components/address/effects/address.effects';
import { AddressService } from './../../../../components/address/services/address.service';
import { UrlConstants } from '../../../../../shared/models/UrlConstants';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { reducers, metaReducers } from './../../../../../../application/shared/reducers';
import { routes } from './../../../../../../app.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {Location} from '@angular/common';
import {
  MatInputModule, MatButtonModule, MatCardModule, MatListModule, MatIconModule, MatToolbarModule,
  MatMenuModule, MatRadioModule, MatProgressBarModule, MatGridListModule, MatSelectModule, MatFormFieldModule, MatAccordion,
  MatExpansionPanel, MatExpansionModule, MatCheckboxModule, MatCardTitle
} from '@angular/material';
import * as AddressActions from './../../actions/address.actions';
import { PaymentResponseComponent } from './../../../../components/payment-response.component';
import { TranslateStore } from '@ngx-translate/core/src/translate.store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { testBedConfig } from './test-bed.setup';
import { AppTransition } from '../../../../../../framework/app-transition/app-transition';
import { Address } from '../../models/address';
import { reducer, initialState, State } from './../../reducers/address.reducer';
import { By, by } from 'protractor';

describe('SubAddressComponent', () => {
  let component: SubAddressComponent;
  let addressService: AddressService;
  let translateService: TranslateService;
  let fixture: ComponentFixture<SubAddressComponent>;
  let appTransition: AppTransition;
  let address: Address;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule(testBedConfig)
      .compileComponents();
  }));

  beforeEach(() => {
    fixture          = TestBed.createComponent(SubAddressComponent);
    component        = fixture.componentInstance;
    fixture.detectChanges();
    addressService   = TestBed.get(AddressService);
    translateService = TestBed.get(TranslateService);
    appTransition    = TestBed.get(AppTransition);
    router           = TestBed.get(Router);

    address               = new Address();
    address.fullName      = 'Saurabh Oza';
    address.mobileNumber  = 12344444;
    address.pinCode       = 123456;
    address.addressLine1  = 'Spine Road';
    address.addressLine2  = 'Chikhali';
    address.landMark      = 'Near RTO';
    address.townCity      = 'Pune';
    address.state         = 'Maharashtra';
  });

  it('SubAddressComponent should create', () => {
    expect(component).toBeTruthy();
  });

  it('Invalid form when all fields are empty', () => {
    expect(component.addressForm.valid).toBeFalsy();
  });

  it('Full name validation with empty value', () => {
    let errors = {};
    const fullName = component.addressForm.controls['fullName'];
    expect(fullName.valid).toBeFalsy();
    errors = fullName.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Full name validation with digits', () => {
    let errors = {};
    const fullName = component.addressForm.controls['fullName'];
    fullName.setValue('123123');
    errors = fullName.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });


  it('Mobile Number validation with empty value', () => {
    let errors = {};
    const mobileNumber = component.addressForm.controls['mobileNumber'];
    expect(mobileNumber.valid).toBeFalsy();
    errors = mobileNumber.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Mobile Number validation with alphabets', () => {
    let errors = {};
    const mobileNumber = component.addressForm.controls['mobileNumber'];
    mobileNumber.setValue('skdhfkhsdf');
    errors = mobileNumber.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('Mobile Number validation with digits', () => {
    let errors = {};
    const mobileNumber = component.addressForm.controls['mobileNumber'];
    mobileNumber.setValue('132467980');
    errors = mobileNumber.errors || {};
    expect(errors).toEqual({});
  });

  it('Full name validation', () => {
    let errors = {};
    const fullName = component.addressForm.controls['fullName'];
    expect(fullName.valid).toBeFalsy();
    errors = fullName.errors || {};
    expect(errors['required']).toBeTruthy();
    fullName.setValue('123123');

    errors = fullName.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('Shipping Address Form submit', () => {
    component.addressForm.controls['fullName'].setValue('Saurabh Oza');
    component.addressForm.controls['mobileNumber'].setValue(12344444);
    component.addressForm.controls['pinCode'].setValue(123456);
    component.addressForm.controls['addressLine1'].setValue('Spine Road');
    component.addressForm.controls['addressLine2'].setValue('Chikhali');
    component.addressForm.controls['landMark'].setValue('Near RTO');
    component.addressForm.controls['townCity'].setValue('Pune');
    component.addressForm.controls['state'].setValue('Maharashtra');
    component.addressType = UrlConstants.VALUE_SHIPPING;
    component.submitForm(component.addressForm);
    component.getStore().select(PaymentIndex.getShippingAddress).subscribe((shippingAddress) => {
      expect( JSON.stringify(shippingAddress)).toEqual(JSON.stringify(address));
    });

  });

    it('Billing Address Form submit', () => {
      const hostElement = fixture.nativeElement;
      let location: Location;
      location = TestBed.get(Location);
      component.addressForm.controls['fullName'].setValue('Saurabh Oza');
      component.addressForm.controls['mobileNumber'].setValue(12344444);
      component.addressForm.controls['pinCode'].setValue(123456);
      component.addressForm.controls['addressLine1'].setValue('Spine Road');
      component.addressForm.controls['addressLine2'].setValue('Chikhali');
      component.addressForm.controls['landMark'].setValue('Near RTO');
      component.addressForm.controls['townCity'].setValue('Pune');
      component.addressForm.controls['state'].setValue('Maharashtra');
      component.addressType = UrlConstants.VALUE_BILLING;
      spyOn(addressService, 'saveAddress').and.returnValue('');
      const element = hostElement.querySelector('#submit');
      console.log('*********** submit button : ' + element.textContent);
      // fixture.detectChanges();
      element.click();
      // component.submitForm(component.addressForm);
      expect(addressService.saveAddress).toHaveBeenCalled();
      // console.log('************* Name :  ' + nameDisplay.textContent);
      // fixture.detectChanges();
      // hostElement = fixture.nativeElement;
      // nameDisplay = hostElement.querySelector('mat-card-title');
      // console.log('************* Name :  ' + nameDisplay.textContent);
      // expect(router).toHaveBeenCalledWith(UrlConstants.ROUTE_PAYMENT);
  });
});
