import { Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from '../../environments/environment';
import {IReminder} from "../views/pages/reminders/reminders.component";

@Injectable({
    providedIn: 'root'
})
export class RemindersService {
    baseUrl = environment.baseUrl + '/api';

    constructor(private httpClient: HttpClient) { }

    post(reminder: {}): Observable<any> {
        return this.httpClient
            .post(`${this.baseUrl}/reminders`, reminder, { withCredentials: true })
    }

    put(reminder: IReminder, action?: string): Observable<any> {
        let act = action ?? '';
        return this.httpClient
            .put(`${this.baseUrl}/reminders/${reminder.id}${action ? '/to/' + action : ''}`, reminder, { withCredentials: true })
    }

    toggleStatus(reminder: IReminder, action?: string): Observable<any> {
        let act = action ?? '';
        return this.httpClient
            .put(`${this.baseUrl}/reminders/${reminder.id}/toggle-status`, reminder, { withCredentials: true })
    }

    get(index: number, section: string): Observable<any> {
        const params = new HttpParams().set('index', index).set('section', section);
        return this.httpClient.get(`${this.baseUrl}/reminders`, { params });
    }

    delete(reminder: any, action: string) {
        return this.httpClient
            .delete(`${this.baseUrl}/reminders/${reminder.id}/group/${action}`, reminder)
    }

    postAdvisee(reminder: {}, advisee: number): Observable<any> {
        return this.httpClient
            .post(`${this.baseUrl}/advisor/user/${advisee}/reminders`, reminder, { withCredentials: true })
    }

    putAdvisee(reminder: IReminder, advisee: number, action?: string): Observable<any> {
        let act = action ?? '';
        return this.httpClient
            .put(`${this.baseUrl}/advisor/user/${advisee}/reminders/${reminder.id}${action ? '/to/' + action : ''}`, reminder, { withCredentials: true })
    }

    toggleStatusAdvisee(reminder: IReminder, advisee: number, action?: string): Observable<any> {
        let act = action ?? '';
        return this.httpClient
            .put(`${this.baseUrl}/advisor/user/${advisee}/reminders/${reminder.id}/toggle-status`, reminder, { withCredentials: true })
    }

    getAdvisee(remindersIndex: number, section: string, advisee: number): Observable<any> {
        const params = new HttpParams()
            .set('index', remindersIndex)
            .set('section', section)
            .set('advisee', advisee);
        return this.httpClient.get(`${this.baseUrl}/advisor/user/${advisee}/reminders`, { params });
    }

    deleteAdvisee(reminder: any, action: string, advisee: number): Observable<any> {
        return this.httpClient
            .delete(`${this.baseUrl}/advisor/user/${advisee}/reminders/${reminder.id}/group/${action}`, reminder)
    }
}
