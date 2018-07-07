import { TranslateService } from "@ngx-translate/core";
import { CommonValidation } from "../../../framework/common-validation/common-validation";
import { FormGroup, ValidationErrors, FormControl } from "@angular/forms";

export class RegistrationValidation extends CommonValidation {
  constructor(readonly translateObj: TranslateService) {
    super(translateObj);
  }

  firstNameMessages = {
    'required': () => this.translateMessage("REQUIRED_FIRST_NAME", []),
    'maxlength': (params) => this.translateMessage("MAXLENGTH_FIRST_NAME", [params.requiredLength])
  };
  lastNameMessages = {
    'required': () => this.translateMessage("REQUIRED_LAST_NAME", []),
    'maxlength': (params) => this.translateMessage("MAXLENGTH_LAST_NAME", [params.requiredLength])
  };
  emailIdMessages = {
    'required': () => this.translateMessage("REQUIRED_EMAIL_ID", []),
    'pattern': (params) => this.translateMessage("PATTERN_EMAIL_ID", []),
    'emailDomain': (params) => this.translateMessage("DOMAIN_EMAIL_ID", [params.domain])
  };
  requiredOptionMessages = {
    'required': () => this.translateMessage("REQUIRED_OPTION", [])
  };
  addressMessages = {
    'required': () => this.translateMessage("REQUIRED_ADDRESS", []),
    'maxlength': (params) => this.translateMessage("MAXLENGTH_ADDRESS", [params.requiredLength])
  };
  contactNumberMessages = {
    'required': () => this.translateMessage("REQUIRED_CONTACT_NUMBER", []),
    'pattern': (params) => this.translateMessage("PATTERN_CONTACT_NUMBER", [])
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
