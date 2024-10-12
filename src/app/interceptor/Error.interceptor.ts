import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {catchError, Observable, throwError} from 'rxjs';
import {ToastrService} from "ngx-toastr";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // Client-side or network error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Backend returned an unsuccessful response code
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        // Log error to the console or send it to a logging server
        console.error(errorMessage);

        // Return an observable with a user-facing error message
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
