import { Injectable } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection,} from '@angular/fire/firestore';
import { COLECCION } from '../models/constants/coleccion.constants';
import { UsuarioIngreso } from '../models/usuario-ingreso.models';
import { STATUS_LOG } from '../models/constants/status-log.constants';

@Injectable({
  providedIn: 'root'
})
export class RegistroIngresoService {

  private coleccion: any;

  constructor(private firestore: Firestore) {
    this.coleccion = collection(
      this.firestore,
      COLECCION.REGISTRO_INGRESO
    );
  }

  setIngreso(usuarioIngreso: UsuarioIngreso): Promise<DocumentReference<any>> {
    localStorage.setItem(STATUS_LOG.OK, usuarioIngreso.correo);
    return addDoc(this.coleccion, { ...usuarioIngreso });
  }

  get correoLogeado(): string {
    return (
      localStorage.getItem(STATUS_LOG.OK) ||
      STATUS_LOG.NOT_FOUND
    );
  }
}
