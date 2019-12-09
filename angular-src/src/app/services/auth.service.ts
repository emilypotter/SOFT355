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

  registerUser(user) { // make observable?
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.post('http://localhost:3000/users/register', user, {headers});
    return this.http.post('http://localhost:3000/users/register', user);
  }

  authenticateUser(user) {
    // return this.http.post('http://localhost:3000/users/authenticate', user, {headers});
    return this.http.post('http://localhost:3000/users/authenticate', user);
  }

  getProfile() {
    this.loadToken();
    const headers = new  HttpHeaders({
      Authorization: this.authToken,
      'Content-Type': 'application/json'
    });
    return this.http.get('http://localhost:3000/users/profile', {headers});
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

  loggedIn() {
    const isExpired = helper.isTokenExpired(localStorage.id_token);
    return isExpired;
  }

  public logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
