import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.post('http://localhost:3000/users/authenticate', user, {headers});
    return this.http.post('http://localhost:3000/users/authenticate', user);
  }
}
