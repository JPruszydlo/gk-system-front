import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(username: string, password: string): boolean {
    if (username == environment.admin_user_name && password == environment.admin_password) {
      this.setAuthorised(true);
      return true;
    }
    this.setAuthorised(false);
    return false;
  }
  isAuthorised(): boolean {
    if (environment.development) return true;

    let isUserAuthorised = window.sessionStorage.getItem('authorised') ?? '0';
    return isUserAuthorised == '1';
  }
  setAuthorised(isAuthorised: boolean): void {
    window.sessionStorage.setItem('authorised', isAuthorised == true ? '1' : '0');
  }
}
