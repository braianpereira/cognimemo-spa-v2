import {inject, Injectable} from '@angular/core';
import { tap } from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../common/global-constants";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpClient = inject(HttpClient);
  routerService = inject(Router);
  baseUrl = GlobalConstants.appURL;

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

  // Função para obter um cookie pelo nome
  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    console.log(document.cookie)
    return match ? decodeURIComponent(match[2]) : null;
  }

// Função para verificar se o cookie já expirou
  isCookieExpired(cookieName: string): boolean {
    const cookieValue = this.getCookie(cookieName);
    console.log(cookieValue)
    if (cookieValue) {
      // Supondo que a data de expiração do cookie esteja em um formato utilizável
      const cookieData = JSON.parse(cookieValue); // Supondo que o valor do cookie seja um JSON com uma data de expiração
      const expirationDate = new Date(cookieData.expiration); // Converta para um objeto Date
      const now = new Date();
      return now > expirationDate; // Verifica se a data atual já passou da data de expiração
    }
    return true; // Se o cookie não existe, consideramos que está expirado
  }
}
