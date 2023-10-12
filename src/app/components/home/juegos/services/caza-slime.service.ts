import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { COLECCION } from '../../../../models/constants/coleccion.constants';
import { AuthService } from '../../../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CazaSlimeService {

  private correoLogeado!: any;
  private coleccion: any;
  private docId:string;

  constructor(private firestore: Firestore, private auth: AuthService) {

    this.docId = '';

    this.coleccion = collection(
      this.firestore,
      COLECCION.CAZA_SLIME
    );

  }

  private obternerUser(){
    let correo;
    let user = this.auth.usuarioLogeado();
    if(user != null){
      this.correoLogeado = user.email;
      correo = this.correoLogeado;
    }
  }

  async getHighScore()
  {
    let highscore;

    this.obternerUser();

    const querySnapshot = await getDocs(collection(this.firestore, COLECCION.CAZA_SLIME));
    querySnapshot.forEach((doc) =>
    {
      let datos = doc.data();
      if(datos['correo'] == this.correoLogeado)
      {
        highscore = <number>datos['puntos'];
      }
    });

    return highscore;
  }

  async ModificarHighScore(nuevoHighScore:number)
  {
    this.obternerUser();

    const querySnapshot = await getDocs(collection(this.firestore, COLECCION.CAZA_SLIME));
    querySnapshot.forEach((doc) =>
    {
      let datos = doc.data();
      if(datos['correo'] == this.correoLogeado)
      {
        this.docId = <string>doc.id;
        console.log('DOC ID: ', this.docId);
      }
    });

    if(this.docId == ''){
      this.setPuntuacion(nuevoHighScore);
      return;
    }
    else{

      const usuarioRef = doc(this.firestore, COLECCION.CAZA_SLIME, this.docId);
      updateDoc(usuarioRef,
      {
        puntos: nuevoHighScore,
      });
    }

  }

  setPuntuacion(puntos: number) {
    this.obternerUser();

    let correo;
    let user = this.auth.usuarioLogeado();
    if(user != null){
      this.correoLogeado = user.email;
      correo = this.correoLogeado;
    }
    const fecha = new Date();
    return addDoc(this.coleccion, {
      fecha,
      correo,
      puntos
    });
  }
}
