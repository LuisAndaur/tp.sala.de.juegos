import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { AuthService } from '../../../../services/auth.service';
import { COLECCION } from './../../../../models/constants/coleccion.constants';
import { Observable, of } from 'rxjs';
import { ICarta } from '../interfaces/icarta';

@Injectable({
  providedIn: 'root'
})
export class MayorMenorService {

  private correoLogeado!: any;
  private coleccion: any;
  private cartas: Array<ICarta> = [
    { numero: 1, src: './../../../../../assets/juegos/cartas/01.png' },
    { numero: 2, src: './../../../../../assets/juegos/cartas/02.png' },
    { numero: 3, src: './../../../../../assets/juegos/cartas/03.png' },
    { numero: 4, src: './../../../../../assets/juegos/cartas/04.png' },
    { numero: 5, src: './../../../../../assets/juegos/cartas/05.png' },
    { numero: 6, src: './../../../../../assets/juegos/cartas/06.png' },
    { numero: 7, src: './../../../../../assets/juegos/cartas/07.png' },
    { numero: 8, src: './../../../../../assets/juegos/cartas/08.png' },
    { numero: 9, src: './../../../../../assets/juegos/cartas/09.png' },
    { numero: 10, src: './../../../../../assets/juegos/cartas/10.png' },
    { numero: 11, src: './../../../../../assets/juegos/cartas/11.png' },
    { numero: 12, src: './../../../../../assets/juegos/cartas/12.png' },
  ];

  constructor(private firestore: Firestore, private auth: AuthService) {
    this.coleccion = collection(
      this.firestore,
      COLECCION.MAYOR_MENOR
    );

  }

  getCartas(): Observable<Array<ICarta>> {
    return of(this.cartas);
  }

  setPuntuacion(rondas: number, aciertos: number, salteadas: number) {

    const fecha = new Date();
    let correo;
    let user = this.auth.usuarioLogeado();

    if(user != null){
      this.correoLogeado = user.email;
      correo = this.correoLogeado;
    }

    return addDoc(this.coleccion, {
      fecha,
      correo,
      rondas,
      aciertos,
      salteadas,
    });
  }
}
