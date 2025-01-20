import { Injectable } from '@angular/core';
import * as localforage from 'localforage';

@Injectable()
export class LocalStorageService {
  constructor() {
    localforage.config({
      driver: [localforage.INDEXEDDB],
      storeName: 'chat-application',
      name: 'chat-application',
    });
  }

  setLocalStore(key: string, data: any) {
    return localStorage.setItem(key, data);
  }

  getLocalStore(key: string) {
    return localStorage.getItem(key);
  }

  clearStorageFor(key: string) {
    return localStorage.removeItem(key);
  }

  clearStorage() {
    return localStorage.clear();
  }

  // store particular key details
  setDataInIndexedDB(key: string, value: any) {
    return localforage
      .setItem(key, JSON.stringify(value))
      .then(() => {})
      .catch(() => {});
  }

  // fetch particular key details
  async getDataFromIndexedDB(key: string) {
    return new Promise((resolve, reject) => {
      localforage
        .getItem(key)
        .then((result: any) => {
          resolve(JSON.parse(result));
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // For Remove Particular Field/Key
  removeDataFromIndexedDB(key: string) {
    return new Promise((resolve, reject) => {
      localforage
        .removeItem(key)
        .then((result: any) => {
          const remove = 'Key Removed';
          return resolve(remove);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  // Database has been entirely deleted.
  clearDataFromIndexedDB() {
    return localforage.clear();
  }
}
