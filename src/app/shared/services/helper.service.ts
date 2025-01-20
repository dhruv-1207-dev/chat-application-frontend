import { Injectable, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from './local-storage.service';
import { Location } from '@angular/common';
import { SubscriptionLike, Subject, Observable } from 'rxjs';
import { LOCAL_STORAGE_KEYS } from '../providers/constants';

declare var require: any;

@Injectable({
  providedIn: 'root',
})
export class HelperService implements OnDestroy {
  locationSubscription: SubscriptionLike | undefined;
  private subject = new Subject<any>();
  translation = require('../../../assets/i18n/en.json');
  constructor(
    private spinner: NgxSpinnerService,
    private localStorage: LocalStorageService,
    private location: Location
  ) {}

  showSpinner = () => {
    this.spinner.show();
  };

  hideSpinner = () => {
    this.spinner.hide();
  };

  translate = (key: string) => {
    return this.translation[key];
  };

  setBackNavigationFlag = () => {
    this.locationSubscription = this.location.subscribe((x) => {
      if (x.pop) {
        this.localStorage.setLocalStore(LOCAL_STORAGE_KEYS.BACK, true);
      }
    });
  };

  getQueryParams = (paramsFor: any) => {
    const isNavigationBack = this.localStorage.getLocalStore(
      LOCAL_STORAGE_KEYS.BACK
    );
    const currentParamsFor = this.localStorage.getLocalStore(
      LOCAL_STORAGE_KEYS.PARAMS_FOR
    );
    if (isNavigationBack) {
      this.localStorage.clearStorageFor(LOCAL_STORAGE_KEYS.BACK);
      if (paramsFor === currentParamsFor) {
        return this.localStorage.getLocalStore(LOCAL_STORAGE_KEYS.QUERY_PARAMS);
      } else {
        return;
      }
    }
    return;
  };

  setQueryParams = (queryParams: any, paramsFor: any) => {
    this.localStorage.setLocalStore(
      LOCAL_STORAGE_KEYS.QUERY_PARAMS,
      queryParams
    );
    this.localStorage.setLocalStore(LOCAL_STORAGE_KEYS.PARAMS_FOR, paramsFor);
  };

  downloadFile(data: any, fileName: string) {
    const urlBlob = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = urlBlob;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  addRemoveFilterOption = (filter: any) => {
    this.subject.next({ filter });
  };

  getRemoveFilterOption = (): Observable<any> => {
    return this.subject.asObservable();
  };

  ngOnDestroy() {
    this.locationSubscription?.unsubscribe();
  }
}

export class Pagination {
  currentPage: number;
  offset: number | undefined;
  perPage: number;
  totalPages: number | undefined;
  viewAll?: boolean;
  constructor() {
    this.currentPage = 1;
    this.perPage = 10;
    this.viewAll = false;
  }
}
