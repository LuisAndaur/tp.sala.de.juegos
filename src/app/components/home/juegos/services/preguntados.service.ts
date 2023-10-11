import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPregunta } from '../interfaces/ipregunta';
import { lastValueFrom, take } from 'rxjs';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { AuthService } from '../../../../services/auth.service';
import { COLECCION } from '../../../../models/constants/coleccion.constants';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  private url: string = '../../../../../assets/juegos/preguntados/base-preguntas.json';
  private correoLogeado!: any;
  private coleccion: any;

  constructor(private http: HttpClient, private firestore: Firestore, private auth: AuthService) {

    this.coleccion = collection(
      this.firestore,
      COLECCION.PREGUNTADOS
    );

    let user = this.auth.usuarioLogeado();
    if(user != null){
      this.correoLogeado = user.email;
    }
  }

  async getPreguntas(): Promise<IPregunta[]> {

    const request$ = this.http.get<Array<IPregunta>>(this.url).pipe(take(1));

    return await lastValueFrom<IPregunta[]>(request$);
  }

  setPuntuacion(rondas: number, aciertos: number) {
    const correo = this.correoLogeado;
    const fecha = new Date();
    return addDoc(this.coleccion, {
      fecha,
      correo,
      rondas,
      aciertos
    });
  }

}
