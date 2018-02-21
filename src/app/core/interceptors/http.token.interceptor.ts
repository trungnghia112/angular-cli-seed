import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LocalStorageService } from '@app/core/services/local-storage.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json'
    };

    const token = this.localStorageService.getToken();

    if (token) {
      headersConfig['Authorization'] = `Token ${token}`;
      const authReq = req.clone({ setHeaders: headersConfig });
      return next.handle(authReq);
    }
    return next.handle(req.clone({ setHeaders: headersConfig }));
  }
}
