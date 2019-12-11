import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post('users/register', user);
  }

  authenticateUser(user) {
    return this.http.post('users/authenticate', user);
  }

  getProfile() {
    this.loadToken();
    const headers = new  HttpHeaders({
      Authorization: this.authToken,
      'Content-Type': 'application/json'
    });
    return this.http.get('users/profile', {headers});
  }

  // getProfile() {
  //   this.loadToken();
  //   return this.http.get('users/profile');
  // }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  isTokenExpired() {
    const isExpired = helper.isTokenExpired(localStorage.id_token);
    return isExpired;
  }

  public logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
