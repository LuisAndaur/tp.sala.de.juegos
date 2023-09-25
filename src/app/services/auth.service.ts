import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {
   }

  login(correo: string, clave: string) {
    return signInWithEmailAndPassword(this.auth,correo, clave);
  }

  logout() {
    localStorage.clear();
    return signOut(this.auth);
  }

  crearUsuario(correo: string, clave: string) {
    return createUserWithEmailAndPassword(this.auth, correo, clave);
  }

  usuarioLogeado() {
    return this.auth.currentUser;
  }
}
