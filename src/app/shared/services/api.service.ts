import { constants } from '../../global/constant';
import { LOCAL_STORAGE_KEYS } from '../../global/constant';
import { LocalStorageService } from './local-storage.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorHandler } from './error-handler/http-error-handler.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { API_PATH } from '../providers/constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  URL = environment.APP_URL; // endpoint URL
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private httpErrorHandler: HttpErrorHandler,
    private ngxLoader: NgxUiLoaderService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  async getHeaders(tokenRequired: any, formData?: any) {
    const token: any = await this.localStorageService.getDataFromIndexedDB(
      LOCAL_STORAGE_KEYS.TOKEN
    );
    if (tokenRequired) {
      const headers = new HttpHeaders()
        .set('authorization', token)
        .set('Content-Type', 'application/json');
      return headers;
    } else if (formData) {
      const headers = new HttpHeaders().set('authorization', token);
      return headers;
    } else {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return headers;
    }
  }

  // this function should be used for fetch details without header token
  async get(path: any, authorize: boolean, loaderContinue?: boolean) {
    return new Promise(async (resolve, _) => {
      const success = (res: any) => {
        // toaster success message
        if (res && res.message) {
          this.toastr.success(res.message);
        }
        if (!loaderContinue) {
          this.ngxLoader.stop();
        }
        resolve(res);
      };
      const error = (err: any) => {
        return this.httpErrorHandler.handleError(path, err);
      };
      const netowrkIsConnected = await this.getNetworkConnection();
      if (netowrkIsConnected) {
        const headers = await this.getHeaders(authorize, false);
        return this.http
          .get(`${this.URL}${path}`, { headers })
          .subscribe(success, error);
      } else {
        this.ngxLoader.stop();
        this.toastr.error(constants.NO_INTERNET_CONNECTION_MSG);
        return;
      }
    });
  }

  // this function should be used for post details without header token
  async post(path: any, obj: any, authorize: boolean) {
    return new Promise(async (resolve, _) => {
      const success = (res: any) => {
        if (res && res.message) {
          this.toastr.success(res.message);
        }
        this.ngxLoader.stop();
        resolve(res);
      };
      const error = (err: any) => {
        return this.httpErrorHandler.handleError(path, err);
      };
      const netowrkIsConnected = await this.getNetworkConnection();
      if (netowrkIsConnected) {
        const headers = await this.getHeaders(authorize, false);
        return this.http
          .post<any>(`${this.URL}${path}`, obj, { headers })
          .subscribe(success, error);
      } else {
        this.ngxLoader.stop();
        this.toastr.error(constants.NO_INTERNET_CONNECTION_MSG);
        return;
      }
    });
  }

  async delete(path: any, authorize: boolean) {
    return new Promise(async (resolve, _) => {
      const success = (res: any) => {
        // toaster success message
        if (res && res.message) {
          this.toastr.success(res.message);
        }
        this.ngxLoader.stop();
        resolve(res);
      };
      const error = (err: any) => {
        return this.httpErrorHandler.handleError(path, err);
      };
      const netowrkIsConnected = await this.getNetworkConnection();
      if (netowrkIsConnected) {
        const headers = await this.getHeaders(authorize, false);
        return this.http
          .delete(`${this.URL}${path}`, { headers })
          .subscribe(success, error);
      } else {
        this.ngxLoader.stop();
        this.toastr.error(constants.NO_INTERNET_CONNECTION_MSG);
        return;
      }
    });
  }

  async uploadFileWithProgress(path: any, obj: any) {
    try {
      const netowrkIsConnected = await this.getNetworkConnection();
      if (netowrkIsConnected) {
        const headers = await this.getHeaders(false, true);
        return this.http.post<any>(`${this.URL}${path}`, obj, {
          headers,
          reportProgress: true,
          observe: 'events',
        });
      } else {
        this.ngxLoader.stop();
        this.toastr.error(constants.NO_INTERNET_CONNECTION_MSG);
        return;
      }
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async postFormDataReqWithToken(path: any, obj: any) {
    return new Promise(async (resolve, _) => {
      const success = (res: any) => {
        if (res && res.message) {
          this.toastr.success(res.message);
        }
        this.ngxLoader.stop();
        resolve(res);
      };
      const error = (err: any) => {
        return this.httpErrorHandler.handleError(path, err);
      };
      const netowrkIsConnected = await this.getNetworkConnection();
      if (netowrkIsConnected) {
        const headers = await this.getHeaders(false, true);
        return this.http
          .post<any>(`${this.URL}${path}`, obj, {
            headers,
          })
          .subscribe(success, error);
      } else {
        this.ngxLoader.stop();
        this.toastr.error(constants.NO_INTERNET_CONNECTION_MSG);
        return;
      }
    });
  }

  refreshAccessToken(refreshToken: string): Promise<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { refreshToken };
  
    return this.http.post<any>(`${this.URL}/auth/refresh-token`, body, { headers }).toPromise()
      .then((response: any) => {
        const newToken = response.accessToken;
  
        // Save the new token
        return this.localStorageService.setDataInIndexedDB(LOCAL_STORAGE_KEYS.TOKEN, newToken)
          .then(() => newToken);
      })
      .catch((error) => {
        console.error('Token refresh failed', error);
        this.logout();
        throw error;
      });
  }
  

  logout() {
    this.localStorageService.clearStorageFor(LOCAL_STORAGE_KEYS.TOKEN);
    this.localStorageService.removeDataFromIndexedDB(LOCAL_STORAGE_KEYS.TOKEN);
    this.localStorageService.removeDataFromIndexedDB(LOCAL_STORAGE_KEYS.NAME);
    this.localStorageService.removeDataFromIndexedDB(
      LOCAL_STORAGE_KEYS.REFERESH_TOKEN
    );
    this.router.navigate(['/']);
  }

  getNetworkConnection() {
    const isOnline: boolean = navigator.onLine;
    if (isOnline) {
      return true;
    }
    return false;
  }
}
