import { NotificationService } from '../../shared/services/notification.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService:NotificationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if(req.url.includes(environment.apiUrl)) {
            if(error) {
                this.notificationService.showErrorToast(error.error.message || 'service is unavailable')
            }
        }
        return throwError(() => error);
      })
    );
  }
}
