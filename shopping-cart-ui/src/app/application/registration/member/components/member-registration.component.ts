import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as fromRoot from './../../../shared/reducers';
import { Store } from '@ngrx/store';
import * as member from './../actions/member.actions';
import { Member } from '../models/Member';
import { RegistrationValidation } from '../../validations/registration-validation';
import { TranslateService } from '@ngx-translate/core';
import { AppTransition } from '../../../../framework/app-transition/app-transition';

@Component({
  selector: 'app-member-registration',
  templateUrl: './member-registration.component.html',
  styleUrls: ['./member-registration.component.scss']
})
export class MemberRegistrationComponent extends RegistrationValidation implements OnInit {

  memberRegistrationForm: FormGroup;
  constructor(private _formbuilder: FormBuilder, private store: Store<fromRoot.State>, private appTransition: AppTransition, private readonly translate: TranslateService) {
    super(translate);
    this.memberRegistrationForm = _formbuilder.group({
      firstName: [null, [Validators.required, Validators.maxLength(10)]],
      lastName: [null, [Validators.required, Validators.maxLength(10)]],
      gender: [null, [Validators.required]],
      address: [null, [Validators.required]],
      emailId: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'), RegistrationValidation.emailDomain]],
      contactNumber: [null, [Validators.required, Validators.pattern('^[0-9]{10}')]]
    },
    {
      validator: Validators.compose([])
    })
  }

  ngOnInit() {
  }

  submitForm(formGroup: FormGroup) {
    this.validateAllFormFields(formGroup);
    if (formGroup.valid) {
      this.appTransition.appDispatch( this.store, new member.MemberSaveAction(this.memberRegistrationForm.value as Member));
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
}
