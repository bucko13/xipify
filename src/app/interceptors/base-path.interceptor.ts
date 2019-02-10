import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class BasePathInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>>
  {
    const basePath = 'https://gdm-interview-api.azurewebsites.net/api/v1/';
    req = req.clone({
      url: basePath + req.url,
    });

    return next.handle(req);
  }
}