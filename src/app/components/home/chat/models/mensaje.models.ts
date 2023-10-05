import { IMensaje } from "./imensaje.interface";

export class Mensaje implements IMensaje {
  fecha: Date;
  correo: string;
  mensaje: string;
  constructor(fecha: Date, correo: string, mensaje: string) {
    this.fecha = fecha;
    this.correo = correo;
    this.mensaje = mensaje;
  }
}
