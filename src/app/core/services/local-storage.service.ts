import { Injectable } from '@angular/core';

const APP_PREFIX = 'APP-';

@Injectable()
export class LocalStorageService {
  constructor() {
  }

  setItem(key: string, value: any) {
    localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  getItem(key: string) {
    return JSON.parse(localStorage.getItem(`${APP_PREFIX}${key}`));
  }

  destroyItem(key: string) {
    localStorage.removeItem(`${APP_PREFIX}${key}`);
  }


  getToken(): String {
    // return window.localStorage['jwtToken'];
    return this.getItem('jwtToken');
  }

  saveToken(token: String) {
    // window.localStorage['jwtToken'] = token;
    this.setItem('jwtToken', token);
  }

  destroyToken() {
    // window.localStorage.removeItem('jwtToken');
    this.destroyItem('jwtToken');
  }

  static loadInitialState() {
    return Object.keys(localStorage).reduce((state: any, storageKey) => {
      if (storageKey.includes(APP_PREFIX)) {
        state = state || {};
        const stateKey = storageKey
          .replace(APP_PREFIX, '')
          .toLowerCase()
          .split('.');
        let currentStateRef = state;
        stateKey.forEach((key, index) => {
          if (index === stateKey.length - 1) {
            currentStateRef[key] = JSON.parse(localStorage.getItem(storageKey));
            return;
          }
          currentStateRef[key] = currentStateRef[key] || {};
          currentStateRef = currentStateRef[key];
        });
      }
      return state;
    }, undefined);
  }
}
