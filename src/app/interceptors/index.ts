import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasePathInterceptor } from './base-path.interceptor';
import { TokenInterceptor } from './token.interceptor';

export default [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: BasePathInterceptor,
    multi: true
  },
];
