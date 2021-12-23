import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { take, exhaustMap, retry, never } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authS: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authS.user.pipe(
            take(1), exhaustMap(user => {

                if(!user){ // do not try to take token from null
                    return next.handle(req);
                }
                const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifiedReq);
            })
        );
    }
}