import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalOpenSubject = new BehaviorSubject<boolean>(false);
  modalOpen$ = this.modalOpenSubject.asObservable();

  constructor() {}

  openModal() {
    this.modalOpenSubject.next(true);
  }

  closeModal() {
    this.modalOpenSubject.next(false);
  }
}
