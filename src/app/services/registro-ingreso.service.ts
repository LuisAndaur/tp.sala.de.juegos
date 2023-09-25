import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection,} from '@angular/fire/firestore';
import { COLECCION } from '../models/constants/coleccion.constants';
import { STATUS_LOG } from '../models/constants/status-log.constants';

@Injectable({
  providedIn: 'root'
})
export class RegistroIngresoService {

  constructor(private db: Firestore) {
  }

  async setIngreso(user:string) {
    localStorage.setItem(STATUS_LOG.OK, user);
    const ingresoRef = collection(this.db, COLECCION.REGISTRO_INGRESO);

    return await addDoc(ingresoRef,
      {
        usuario: user,
        fecha: new Date()
      }
      ).catch(err => {
      console.log(err);
    });
  }

  get correoLogeado(): string {
    return (
      localStorage.getItem(STATUS_LOG.OK) ||
      STATUS_LOG.NOT_FOUND
    );
  }
}
