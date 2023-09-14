import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private observable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {}

  setCargando(cargando: boolean) {
    this.observable.next(cargando);
  }

  getCargando(): BehaviorSubject<boolean> {
    return this.observable;
  }
}
