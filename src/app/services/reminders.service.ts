import { Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../common/global-constants";
import {IReminder} from "../views/pages/reminders/reminders.component";

@Injectable({
  providedIn: 'root'
})
export class RemindersService {
  baseUrl = GlobalConstants.appURL + '/api';

  constructor(private httpClient: HttpClient) { }

  post(reminder: {}): Observable<any> {
    return this.httpClient
      .post(`${this.baseUrl}/reminders`, reminder, { withCredentials: true })
  }

  put(reminder: IReminder): Observable<any> {
    return this.httpClient
      .put(`${this.baseUrl}/reminders/${reminder.id}`, reminder, { withCredentials: true })
  }

  get(index: number, section: string): Observable<any> {
    const params = new HttpParams().set('index', index).set('section', section);
    return this.httpClient.get(`${this.baseUrl}/reminders`, { params });
  }

    delete(reminder: any, action: string) {
        return this.httpClient
            .delete(`${this.baseUrl}/reminders/${reminder.id}/group/${action}`, reminder)
    }
}
