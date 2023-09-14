import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth) { }

  async login(correo: string, clave: string) {
    try{
      return await this.auth.signInWithEmailAndPassword(correo, clave);
    }
    catch(err){
      console.log("ERROR: Login: ", err);
      return null;
    }
  }

  logout(): Promise<any> {
    return this.auth.signOut();
  }

  async crearUsuario(correo: string, clave: string) {
    return await this.auth.createUserWithEmailAndPassword(correo, clave);
  }

  usuarioLogeado(): Observable<any> {
    return this.auth.authState;
  }
}
