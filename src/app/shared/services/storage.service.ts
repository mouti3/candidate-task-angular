import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  storeInSessionStorage(key: string, value: string) {
    sessionStorage.setItem(key,value);
  }

  getFromSessionStorage(key: string): string | null {
    return sessionStorage.getItem(key) || null;
  }

  clearFromSessionStorage(key: string) {
    sessionStorage.removeItem(key);
  }
}
