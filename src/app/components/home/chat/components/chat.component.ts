import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { RegistroIngresoService } from '../../../../services/registro-ingreso.service';
import { LoaderService } from '../../../../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { Mensaje } from '../models/mensaje.models';
import { IMensaje } from '../models/imensaje.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  nuevoMensaje: string = '';
  mensajes: Array<IMensaje | any> = [];
  @ViewChild('chat') chat!: ElementRef;

  constructor(private chatServicio: ChatService,
              private registroIngresoService: RegistroIngresoService,
              private loaderServicio: LoaderService,
              private toastServicio: ToastrService
            ) {}

  ngOnInit(): void {
    this.loaderServicio.setCargando(true);
    this.chatServicio.getMensajes().subscribe((mensajes) => {
      this.mensajes = mensajes;
      setTimeout(() => {
        const divChat = this.chat.nativeElement as HTMLDivElement;
        divChat.scrollTop = divChat.scrollHeight;
      }, 100);
      this.loaderServicio.setCargando(false);
    });
  }

  get correoLogeado(): string {
    console.log("CORREO LOG: ", this.registroIngresoService.correoLogeado);
    return this.registroIngresoService.correoLogeado;
  }

  enviarMensaje(): void {
    const mensaje = new Mensaje(
      new Date(),
      this.correoLogeado,
      this.nuevoMensaje
    );
    this.chatServicio
      .setMensaje(mensaje)
      .then(() => {
        this.nuevoMensaje = '';
      })
      .catch((error: Error) => {
        this.toastServicio.error('No se pudo enviar el mensaje', 'Error');
        console.log(error.message);
      });
  }

  parserFecha(segundos: number): string {
    return new Date(segundos * 1000).toLocaleString() + ' hs';
  }

}
