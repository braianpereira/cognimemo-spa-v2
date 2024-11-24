import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../common/global-constants";
import {FormControl, ɵElement, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ReminderTypesService {
  baseUrl = GlobalConstants.appURL + '/api';

  constructor(private httpClient: HttpClient) { }

  post(reminder: {}): Observable<any> {
    return this.httpClient
      .post(`${this.baseUrl}/reminders/types`, reminder, { withCredentials: true })
  }

  get(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/reminders/types`);
  }
}
