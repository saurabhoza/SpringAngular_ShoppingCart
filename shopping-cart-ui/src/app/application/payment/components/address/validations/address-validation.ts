import { TranslateService } from '@ngx-translate/core';
import { CommonValidation } from '../../../../../framework/common-validation/common-validation';
import { FormGroup, ValidationErrors, FormControl } from '@angular/forms';

export class AddressValidation extends CommonValidation {
  constructor(readonly translateObj: TranslateService) {
    super(translateObj);
  }

  fullNameMessages = {
    'required': () => this.translateMessage('REQUIRED_FULL_NAME', []),
    'maxlength': (params) => this.translateMessage('MAXLENGTH_FULL_NAME', [params.requiredLength]),
    'pattern': (params) => this.translateMessage('PATTERN_ALPHABET', [params.requiredPattern])
  };
  mobileNumberMessages = {
    'required': () => this.translateMessage('REQUIRED_MOBILE_NUMBER', []),
    'maxlength': (params) => this.translateMessage('MAXLENGTH_MOBILE_NUMBER', [params.requiredLength]),
    'pattern': (params) => this.translateMessage('PATTERN_DIGIT', [params.requiredPattern])
  };
  pinCodeMessages = {
    'required': () => this.translateMessage('REQUIRED_PINCODE', []),
    'maxlength': (params) => this.translateMessage('MAXLENGTH_PINCODE', [params.requiredLength]),
    'minlength': (params) => this.translateMessage('MAXLENGTH_PINCODE', [params.requiredLength]),
    'pattern': (params) => this.translateMessage('PATTERN_DIGIT', [params.requiredPattern])
  };
  addressLine1Messages = {
    'required': () => this.translateMessage('REQUIRED_ADD_LINE1', []),
    'maxlength': (params) => this.translateMessage('MAXLENGTH_ADD_LINE1', [params.requiredLength])
  };
  addressLine2Messages = {
    'required': () => this.translateMessage('REQUIRED_ADD_LINE2', []),
    'maxlength': (params) => this.translateMessage('MAXLENGTH_ADD_LINE2', [params.requiredLength])
  };
  landMarkMessages = {
    'required': () => this.translateMessage('REQUIRED_LANDMARK', []),
    'maxlength': (params) => this.translateMessage('MAXLENGTH_LANDMARK', [params.requiredLength])
  };
  townCityMessages = {
    'required': () => this.translateMessage('REQUIRED_TOWN_CITY', []),
    'maxlength': (params) => this.translateMessage('MAXLENGTH_TOWN_CITY', [params.requiredLength]),
    'pattern': (params) => this.translateMessage('PATTERN_ALPHABET', [params.requiredPattern])
  };
  stateMessages = {
    'required': () => this.translateMessage('REQUIRED_STATE', []),
    'maxlength': (params) => this.translateMessage('MAXLENGTH_STATE', [params.requiredLength]),
    'pattern': (params) => this.translateMessage('PATTERN_ALPHABET', [params.requiredPattern])
  };

}
