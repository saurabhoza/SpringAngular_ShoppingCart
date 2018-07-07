import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export class CommonValidation{   
    constructor(readonly validationTranslate: TranslateService){
    }
    public translateMessage(message: string, params: string[]) {
        let transMessage= this.validationTranslate.instant(message);
        let splitMessage: string[] = transMessage.split("{{param}}");
        let resultMessage = '';
        if (params.length === (splitMessage.length - 1)) {
            resultMessage=splitMessage[0];
          for (let index = 0; index < params.length; index++) {
            resultMessage = resultMessage + params[index] + splitMessage[index + 1]
          }
        return resultMessage;
        }else{
          new Error("Parameter mismatch for message: " + transMessage);
          return transMessage;
        }
      }
}
