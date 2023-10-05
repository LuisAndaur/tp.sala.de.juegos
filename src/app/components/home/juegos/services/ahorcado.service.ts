import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { AuthService } from '../../../../services/auth.service';
import { COLECCION } from '../../../../models/constants/coleccion.constants'
import { Observable, of } from 'rxjs';
import { IAhorcado } from '../interfaces/iahorcado';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {

  private correoLogeado!: any;
  private coleccion: any;
  private palabrasAhorcado: Array<IAhorcado> = [
    { palabra: 'oso', pista: 'Animal grande y peludo' },
    { palabra: 'lapiz', pista: 'Instrumento de escritura' },
    { palabra: 'casa', pista: 'Lugar donde vives' },
    { palabra: 'manzana', pista: 'Fruta roja y deliciosa' },
    { palabra: 'arbol', pista: 'Planta con tronco y ramas' },
    { palabra: 'libro', pista: 'Conjunto de hojas escritas' },
    { palabra: 'gato', pista: 'Mascota felina' },
    { palabra: 'sol', pista: 'Astro luminoso del día' },
    { palabra: 'perro', pista: 'Amigo fiel del hombre' },
    { palabra: 'raton', pista: 'Roedor pequeño' },
    { palabra: 'agua', pista: 'Líquido transparente e inodoro' },
    { palabra: 'cielo', pista: 'Espacio sobre nuestras cabezas' },
    { palabra: 'pajaro', pista: 'Animal volador con plumas' },
    { palabra: 'mesa', pista: 'Mueble para comer o trabajar' },
    { palabra: 'flor', pista: 'Elemento decorativo de jardines' },
    { palabra: 'puerta', pista: 'Entrada a una habitación o edificio' },
    { palabra: 'coche', pista: 'Vehículo con ruedas' },
    { palabra: 'nube', pista: 'Masa blanca en el cielo' },
    { palabra: 'pan', pista: 'Alimento básico' },
    { palabra: 'luna', pista: 'Satélite natural de la Tierra' },
    { palabra: 'moto', pista: 'Vehículo de dos ruedas' },
    { palabra: 'huevo', pista: 'Producto de gallina' },
    { palabra: 'amarillo', pista: 'Color entre el verde y el naranja' },
    { palabra: 'fuego', pista: 'Combustión de materiales' },
    { palabra: 'llave', pista: 'Objeto para abrir cerraduras' },
    { palabra: 'hoja', pista: 'Parte verde de una planta' },
    { palabra: 'plato', pista: 'Utensilio para servir comida' },
    { palabra: 'naranja', pista: 'Fruta cítrica' },
    { palabra: 'ventana', pista: 'Abertura en una pared' },
    { palabra: 'azul', pista: 'Color del cielo despejado' },
    { palabra: 'cama', pista: 'Mueble para dormir' },
    { palabra: 'carro', pista: 'Vehículo de transporte' },
    { palabra: 'frio', pista: 'Temperatura baja' },
    { palabra: 'piscina', pista: 'Lugar para nadar' },
    { palabra: 'flauta', pista: 'Instrumento musical de viento' },
  ];
  private imagenes: Array<string> = [
    './../../../../../assets/juegos/ahorcado/0.png',
    './../../../../../assets/juegos/ahorcado/1.png',
    './../../../../../assets/juegos/ahorcado/2.png',
    './../../../../../assets/juegos/ahorcado/3.png',
    './../../../../../assets/juegos/ahorcado/4.png',
    './../../../../../assets/juegos/ahorcado/5.png',
    './../../../../../assets/juegos/ahorcado/6.png',
  ];

  constructor(private firestore: Firestore, private auth: AuthService) {
    this.coleccion = collection(
      this.firestore,
      COLECCION.AHORCADO
    );

    let user = this.auth.usuarioLogeado();
    if(user != null){
      this.correoLogeado = user.email;
    }
  }

  getPalabrasParaAdivinar(): Observable<Array<IAhorcado>> {
    return of(this.palabrasAhorcado);
  }

  getImagenes(): Observable<Array<string>> {
    return of(this.imagenes);
  }

  setPuntuacion(
    intentos: number,
    aciertos: number,
    reseteos: number,
    ayudas: number
  ) {
    const correo = this.correoLogeado;
    const fecha = new Date();
    return addDoc(this.coleccion, {
      fecha,
      correo,
      intentos,
      aciertos,
      reseteos,
      ayudas,
    });
  }
}
