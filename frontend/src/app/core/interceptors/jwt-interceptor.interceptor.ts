import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
      ) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.authService.getToken();

/*         For any request that is not a login request, you need to provide a token from local storage.
        If a token exists put a token on the current request,
        else this is a login request and you do not need a token. */
        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'jwt ' + token)
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }

}
