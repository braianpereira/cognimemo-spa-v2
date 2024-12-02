import {inject, Injectable} from '@angular/core';
import { tap } from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from '../../environments/environment';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpClient = inject(HttpClient);
  baseUrl = environment.baseUrl;

  constructor() { }

  register(data: any) {
    return this.httpClient
      .post(`${this.baseUrl}/register`, data)
      .pipe(tap((result) => {
      localStorage.setItem('authUser', JSON.stringify(result));
    }));
  }

  login(data: any): Observable<any> {

    return this.httpClient
      .post(
        `${this.baseUrl}/login`,
        {...data, remember: true},
        { withCredentials: true }
      )
      .pipe(tap((result) => {
        localStorage.setItem('authUser', JSON.stringify("logued"));
      }));
  }

  getCsrfToken(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/sanctum/csrf-cookie`,
      { withCredentials: true, observe: "response" });
  }

  isLoggedIn() {
    return localStorage.getItem('authUser');
  }

  logout() {
    return this.httpClient.post(`${this.baseUrl}/logout`, '')
      .pipe(tap((result) => {
        localStorage.removeItem('authUser');
      }))
  }
}
