import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {IUser} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AdvisorService {
    baseUrl = environment.baseUrl + '/api';

    private adviseeSubject = new BehaviorSubject<IUser|null>(null)
    advisee$ = this.adviseeSubject.asObservable();

    constructor(private httpClient: HttpClient) { }

    get(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/advisor`, { withCredentials: true });
    }

    setLocalAdvisee(user: IUser) {
        this.adviseeSubject.next(user);
    }
}
