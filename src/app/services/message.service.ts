import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new BehaviorSubject<{} | null>(null);
  message$ = this.messageSubject.asObservable();

  add(m: {}) {
    let message: {} | null;
    message = m;
    this.messageSubject.next(message);
  }

  clear() {
    this.messageSubject.next(null);
  }
}
