import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoggerService {

  info(msg: any) {
    if (environment.isDebugMode) {
      console.log(`INFO : ${msg}`);
    }
  }

  warn(msg: any) {
    if (environment.isDebugMode) {
      console.log(`WARN : ${msg}`);
    }
  }

  error(msg: any) {
    if (environment.isDebugMode) {
      console.error(`ERROR : ${msg}`);
    }
  }
}
