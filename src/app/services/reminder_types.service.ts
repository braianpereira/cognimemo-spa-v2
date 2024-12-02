import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReminderTypesService {
    baseUrl = environment.baseUrl + '/api';

    constructor(private httpClient: HttpClient) { }

    post(type: {}): Observable<any> {
        return this.httpClient
            .post(`${this.baseUrl}/reminders/types`, type, { withCredentials: true })
    }

    get(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/reminders/types`);
    }

    postAdvisee(type: {}, advisee: number): Observable<any> {
        return this.httpClient
            .post(`${this.baseUrl}/advisor/user/${advisee}/reminders/types`, type, { withCredentials: true })
    }

    getAdvisee(advisee: number): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/advisor/user/${advisee}/reminders/types`);
    }
}
