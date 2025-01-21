import { ApiService } from '../../services/api.service';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { LOCAL_STORAGE_KEYS, API_PATH } from '../../providers/constants';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: ApiService, private ls: LocalStorageService) {}

  async getAllUsers() {
    return await this.http.get(API_PATH.USERS, true, false);
  }

  async getProfile() {
    return await this.http.get(API_PATH.PROFILE, true, false);
  }

  async updateProfile(data: any) {
    return await this.http.postFormDataReqWithToken(
      API_PATH.UPDATE_PROFILE,
      data
    );
  }

  async logout() {
    return await this.http.logout();
  }
}
