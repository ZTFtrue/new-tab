import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private messageSu = new Subject<boolean>();  //
  messageObserve = this.messageSu.asObservable();
  constructor() { }
  private setMessage(message: boolean) {
    this.messageSu.next(message);
  }
  public success(message: boolean, callback?: Function) {
    this.setMessage(message);
    if (callback) {
      callback();
    }
  }

}
