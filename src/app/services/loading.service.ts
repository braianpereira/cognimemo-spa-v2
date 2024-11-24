import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false)
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor() { }

  status() {
    return this.isLoadingSubject.value
  }

  show() {
    this.isLoadingSubject.next(true);
  }

  async hide() {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.isLoadingSubject.next(false);
  }
}
