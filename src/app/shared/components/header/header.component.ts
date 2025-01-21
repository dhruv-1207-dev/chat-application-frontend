import { LOCAL_STORAGE_KEYS } from '../../../global/constant';
import { HelperService } from 'src/app/shared/services/helper.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  protected adminDetails: any = {
    email: '',
  };
  public users: any = [];

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private userService: UsersService
  ) {}

  async ngOnInit() {
    this.getProfile();
    await this.getUsers();
  }

  getProfile = async () => {
    const admin: any = await this.localStorage.getDataFromIndexedDB(
      LOCAL_STORAGE_KEYS.PROFILE
    );
    if (admin?.email) {
      this.adminDetails.email = admin.email;
    }
  };

  async getUsers() {
    const response: any = await this.userService.getAllUsers();
    if (response) {
      this.users = response.data;
    }
  }

  onRedirectProfile() {
    this.router.navigate(['/home/profile']);
  }

  onRedirectDashboard() {
    this.router.navigate(['/home']);
  }

  onRedirectChat(item: any) {
    this.router.navigate([`/home/chat/${item._id}`]);
  }

  logout = () => {
    this.userService.logout();
  };
}
