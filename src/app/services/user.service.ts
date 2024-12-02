import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { environment } from '../../environments/environment';
import {BehaviorSubject, Observable} from "rxjs";
import {en} from "@fullcalendar/core/internal-common";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    baseUrl = environment.baseUrl + '/api';

    private userSubject = new BehaviorSubject<IUser|null>(null)
    user$ = this.userSubject.asObservable();

    constructor(private httpClient: HttpClient) { }

    get(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/users`, { withCredentials: true });
    }

    getReminders(index: number, section: string): Observable<any> {
        const params = new HttpParams().set('index', index).set('section', section);
        return this.httpClient.get(`${this.baseUrl}/advisor/user/1/reminders`, { params });
    }

    getUser(user: number): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/advisor/user/${user}`, {});
    }

    getAdvisees() {
        return this.httpClient.get(`${this.baseUrl}/advisor/user`, {});
    }

    setLocalUser(user: IUser) {
        this.userSubject.next(user);
    }

    getLocalUser() {
        return this.userSubject.asObservable();
    }
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    user_type: string;
    created_at: string;
    updated_at: string;
    email_verified_at: string;
}
