import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, take} from "rxjs";
import {AccountService} from "../_service/Account/account.service";
import {Injectable} from "@angular/core";

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${user.token}`
            }
          })
        }
      }
    })
    return next.handle(request);
  }
}
