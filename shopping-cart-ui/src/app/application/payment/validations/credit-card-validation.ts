import { TranslateService } from "@ngx-translate/core";
import { CommonValidation } from "../../../framework/common-validation/common-validation";
import { FormGroup, ValidationErrors, FormControl } from "@angular/forms";

export class CreditCardValidation extends CommonValidation {
  constructor(readonly translateObj: TranslateService) {
    super(translateObj);
  }

  nameOnCardMessages = {
    'required': () => this.translateMessage("REQUIRED_NAME_ON_CARD", []),
    'maxlength': (params) => this.translateMessage("MAXLENGTH_NAME_ON_CARD", [params.requiredLength]),
    'pattern': (params) => this.translateMessage("PATTERN_NAME_ON_CARD", [])
  };
  cardNumberMessages = {
    'required': () => this.translateMessage("REQUIRED_CARD_NUMBER", []),
    'maxlength': (params) => this.translateMessage("MAXLENGTH_CARD_NUMBER", [params.requiredLength]),
    'minlength': (params) => this.translateMessage("MINLENGTH_CARD_NUMBER", [params.requiredLength]),
    'pattern': (params) => this.translateMessage("PATTERN_CARD_NUMBER", [])
  };
  expMonthMessages = {
    'required': () => this.translateMessage("REQUIRED_EXP_MONTH", [])
  };
  expYearMessages = {
    'required': () => this.translateMessage("REQUIRED_EXP_YEAR", [])
  };
  cvvNoMessages = {
    'required': () => this.translateMessage("REQUIRED_CVV_NUMBER", []),
    'maxlength': (params) => this.translateMessage("MAXLENGTH_CVV_NUMBER", [params.requiredLength]),
    'minlength': (params) => this.translateMessage("MINLENGTH_CVV_NUMBER", [params.requiredLength]),
    'pattern': (params) => this.translateMessage("PATTERN_CVV_NUMBER", [])
  };

  static emailDomain(control: FormControl): any {
    let emailId: string = control.value ? control.value.trim() : '';
    let domain= '@epam.com';
    let message = {
      'emailDomain': {
        'domain': domain
      }
    }
    return emailId.toLowerCase().endsWith(domain) ? null : message;
  }
}
