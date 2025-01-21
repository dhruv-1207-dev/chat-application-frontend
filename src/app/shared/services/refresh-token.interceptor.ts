import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { LOCAL_STORAGE_KEYS } from 'src/app/global/constant';
import { environment } from 'src/environment/environment';
import { API_PATH } from '../providers/constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refresh = false;
  URL = environment.APP_URL;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    console.log('calling interceptor');
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Convert the promise to an observable
    return from(
      this.localStorageService.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.TOKEN)
    ).pipe(
      switchMap((accessToken) => {
        console.log(accessToken, 'accessToken');

        // If an access token exists, add it to the headers
        if (accessToken) {
          request = request.clone({
            setHeaders: {
              authorization: `${accessToken}`,
            },
          });
        }

        return next.handle(request).pipe(
          catchError((err: HttpErrorResponse) => {
            console.log(err, 'err');

            // Handle 403 errors and refresh the token
            if (err.status === 401 && !this.refresh) {
              this.refresh = true;
              return from(
                this.localStorageService.getDataFromIndexedDB(
                  LOCAL_STORAGE_KEYS.REFERESH_TOKEN
                )
              ).pipe(
                switchMap((refreshToken) => {
                  return this.http
                    .post(`${this.URL}${API_PATH.REFRESH_TOKEN}`, {
                      token: refreshToken,
                    })
                    .pipe(
                      switchMap((res: any) => {
                        const newAccessToken = res.data.token;

                        // Store the new access token
                        this.localStorageService.setDataInIndexedDB(
                          LOCAL_STORAGE_KEYS.TOKEN,
                          newAccessToken
                        );

                        // Clone the request with the new token and retry
                        return next.handle(
                          request.clone({
                            setHeaders: {
                              authorization: `${newAccessToken}`,
                            },
                          })
                        );
                      })
                    );
                })
              );
            }

            this.refresh = false;
            return throwError(() => err);
          })
        );
      })
    );
  }
}
