import { LOCAL_STORAGE_KEYS } from './../../providers/constants';
import { HelperService } from 'src/app/shared/services/helper.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  adminDetails: any = {
    email: '',
  };

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile = async () => {
    const admin: any = await this.localStorage.getDataFromIndexedDB(
      LOCAL_STORAGE_KEYS.PROFILE
    );
    if (admin?.email) {
      this.adminDetails.email = admin.email;
    }
  };

  logout = () => {
    this.localStorage.removeDataFromIndexedDB(LOCAL_STORAGE_KEYS.TOKEN);
    this.localStorage.removeDataFromIndexedDB(LOCAL_STORAGE_KEYS.PROFILE);
    this.router.navigate(['/']);
  };
}
