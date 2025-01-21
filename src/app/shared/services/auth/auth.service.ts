import { ApiService } from '../../services/api.service';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { LOCAL_STORAGE_KEYS, API_PATH } from '../../providers/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: ApiService, private ls: LocalStorageService) {}

  async getUserAuthenticate() {
    const userFound = await this.ls.getDataFromIndexedDB(
      LOCAL_STORAGE_KEYS.TOKEN
    );
    return userFound;
  }

  async login(data: any) {
    return await this.http.post(API_PATH.LOGIN, data, false);
  }

  async register(data: any) {
    return await this.http.post(API_PATH.REGISTER, data, false);
  }

  async refreshAccessToken(data: any) {
    return await this.http.post(API_PATH.REFRESH_TOKEN, data, false);
  }

  async logout() {
    return await this.http.get(API_PATH.LOGOUT, false);
  }
}
