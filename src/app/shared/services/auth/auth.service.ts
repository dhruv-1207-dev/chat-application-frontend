import { ApiService } from '../../services/api.service';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { LOCAL_STORAGE_KEYS, API_PATH } from '../../providers/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: ApiService,
    private ls: LocalStorageService
  ) {}

  async getUserAuthenticate() {
    const userFound = await this.ls.getDataFromIndexedDB(
      LOCAL_STORAGE_KEYS.TOKEN
    );
    return userFound;
  }

  async login(data: any) {
    return await this.http.post(API_PATH.LOGIN, data, false);
  }

  async forgotPassword(data: any) {
    return await this.http.post(API_PATH.FORGOT_PASS, data, false);
  }

  async changePassword(data: any) {
    return await this.http.post(API_PATH.CHANGE_PASS, data, false);
  }

  async resetPassword(data: any) {
    return await this.http.post(API_PATH.RESET_PASS, data, false);
  }

}
