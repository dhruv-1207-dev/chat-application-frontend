import { Component, OnInit } from '@angular/core';
// import { CONFIGURATION_ROUTES, constants, LOCAL_STORAGE_KEYS } from 'src/app/global/constants';
import { ApiService } from '../../services/api.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
// eslint-disable-next-line import/prefer-default-export
export class LeftSidebarComponent implements OnInit {
  // public logoPath = constants.DASHBOARD_LOGO;

  // public defaultUser = constants.DEFAULT_USERS;

  // public headerText = constants.HEADER_TEXT;
  // firstName;
  // lastName;
  // profile;
  // baseUrl;

  // menus = [];

  constructor(
    private localStorage: LocalStorageService,
    private apiService: ApiService,
  ) { }
  // eslint-disable-next-line class-methods-use-this
  async ngOnInit() {
    // this.baseUrl = await this.localStorage.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.API_END_POINT);
    // this.firstName = await this.localStorage.getDataFromIndexedDB('firstname');
    // this.lastName = await this.localStorage.getDataFromIndexedDB('lastname');
    // this.profile = await this.localStorage.getDataFromIndexedDB('profile');
    // await this.getMenuList();
  }

  // async getMenuList() {
  //   const result: any = await this.apiService.getForDealer(`${this.baseUrl}${CONFIGURATION_ROUTES.GET_MENU_LIST}`, true);
  //   this.menus = result && result.data ? result.data : {};
  // }

  // // eslint-disable-next-line class-methods-use-this
  // toggleMenu(idValue: string) {
  //   if (idValue) {
  //     const element = document.getElementById(idValue);
  //     const classesList = element.className.split(' ');
  //     if (classesList.indexOf('menu-open') === -1) {
  //       element.classList.add('menu-open');
  //     } else {
  //       element.classList.remove('menu-open');
  //     }
  //   }
  // }
  // checkDriverTechnicanAccess(menu) {
  //   // if ((menu.name === 'Products' || menu.name === 'Orders'
  //   //   || menu.name === 'Payment requests' || menu.name === 'Cash collection') &&
  //   //   (this.designationId === 3 || this.designationId === 6)) {
  //   //   return false;
  //   // }
  //   // return true;
  // }
}
