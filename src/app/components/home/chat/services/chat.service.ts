import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { COLECCION } from 'src/app/models/constants/coleccion.constants';
import { IMensaje } from '../models/imensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private coleccion: any;

  constructor(private firestore: Firestore) {
    this.coleccion = collection(this.firestore, COLECCION.CHAT);
  }

  setMensaje(mensaje: IMensaje) {
    return addDoc(this.coleccion, { ...mensaje });
  }

  getMensajes(): Observable<Array<IMensaje | unknown>> {
    const q = query(this.coleccion, orderBy('fecha', 'asc'));
    return collectionData(q);
  }
}
