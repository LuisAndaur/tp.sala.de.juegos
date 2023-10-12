import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, Subscription } from 'rxjs';
import { LoaderService } from '../../../../../../services/loader.service';
import { IPregunta } from '../../../interfaces/ipregunta';
import { PreguntadosService } from '../../../services/preguntados.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent implements OnInit, AfterViewInit, OnDestroy {

  listaPreguntas: IPregunta[] = [];
  preguntas_aleatorias: boolean = true;
  mostrar_pantalla_juego_términado: boolean = true;
  reiniciar_puntos_al_reiniciar_el_juego?: boolean = true;
  suspender_botones: boolean = false;

  pregunta: IPregunta = {
    categoria: "",
    pregunta: "",
    respuesta: "",
    incorrecta1: "",
    incorrecta2: "",
    incorrecta3: "",
    imagen: "",
    objectFit: "",
  };
  posibles_respuestas: string[] = [];
  @ViewChild('btn1') btn1!: ElementRef;
  @ViewChild('btn2') btn2!: ElementRef;
  @ViewChild('btn3') btn3!: ElementRef;
  @ViewChild('btn4') btn4!: ElementRef;

  clickedElement: Subscription = new Subscription();

  btn_correspondiente: ElementRef<any>[] = [];

  npreguntas: number[] = [];

  preguntas_hechas: number = 0;
  preguntas_correctas: number = 0;

  numero?: number;
  puntaje: string = "";
  rondas: number = 0;
  aciertos: number = 0;
  flag: boolean = false;

  r_btn1?: string;
  r_btn2?: string;
  r_btn3?: string;
  r_btn4?: string;

  constructor(private preguntadosService: PreguntadosService,
              private toastService: ToastrService,
              private loaderService: LoaderService,
              private renderer: Renderer2,
              private router: Router) {  }

  ngOnInit(): void {

    this.loaderService.setCargando(true);

    this.preguntadosService
      .getPreguntas()
      .then((p) => {
        this.listaPreguntas = p;
        // console.log("PREGUNTAS: ", this.listaPreguntas);
        this.escogerPreguntaAleatoria();
        this.toastService.success('Preguntasdos OK', 'GO!');

      })
      .catch((error:any) => {
          this.toastService.error('No se cargaron las preguntas!','ERROR');
        }
      )
      .finally(() => {
        this.loaderService.setCargando(false);
      });
  }

  ngAfterViewInit() {

    this.btn_correspondiente = [
      this.btn1,
      this.btn2,
      this.btn3,
      this.btn4
    ];

    this.clickedElement = fromEvent(this.btn1.nativeElement, 'click').subscribe((x) => { this.cambiarEstilo(0) });
    this.clickedElement = fromEvent(this.btn2.nativeElement, 'click').subscribe((x) => { this.cambiarEstilo(1) });
    this.clickedElement = fromEvent(this.btn3.nativeElement, 'click').subscribe((x) => { this.cambiarEstilo(2) });
    this.clickedElement = fromEvent(this.btn4.nativeElement, 'click').subscribe((x) => { this.cambiarEstilo(3) });
  }


  escogerPreguntaAleatoria() {
    let n;
    if (this.preguntas_aleatorias) {
      n = Math.floor(Math.random() * this.listaPreguntas.length);
    } else {
      n = 0;
    }

    while (this.npreguntas.includes(n)) {
      n++;
      if (n >= this.listaPreguntas.length) {
        n = 0;
      }
      if (this.npreguntas.length == this.listaPreguntas.length) {
        //Aquí es donde el juego se reinicia
        if (this.mostrar_pantalla_juego_términado) {
          this.toastService.success("Puntuación: " + this.preguntas_correctas + "/" + (this.preguntas_hechas - 1), 'JUEGO COMPLETO!');
        }
        if (this.reiniciar_puntos_al_reiniciar_el_juego) {
          this.preguntas_correctas = 0
          this.preguntas_hechas = 0
        }
        this.npreguntas = [];
      }
    }
    this.npreguntas.push(n);
    this.preguntas_hechas++;

    this.escogerPregunta(n);
  }

  escogerPregunta(n: number) {
    this.pregunta = this.listaPreguntas[n];

    this.numero = n;
    this.rondas = this.preguntas_hechas -1;
    this.aciertos = this.preguntas_correctas;

    if (this.preguntas_hechas > 1) {
      this.puntaje = this.aciertos + "/" + (this.preguntas_hechas - 1);
    } else {
      this.puntaje = "";
    }

    this.desordenarRespuestas(this.pregunta);

  }

  desordenarRespuestas(pregunta: IPregunta) {
    this.posibles_respuestas = [
      pregunta.respuesta,
      pregunta.incorrecta1,
      pregunta.incorrecta2,
      pregunta.incorrecta3,
    ];
    this.posibles_respuestas.sort(() => Math.random() - 0.5);

    this.r_btn1 = this.posibles_respuestas[0];
    this.r_btn2 = this.posibles_respuestas[1];
    this.r_btn3 = this.posibles_respuestas[2];
    this.r_btn4 = this.posibles_respuestas[3];
  }

  cambiarEstilo(i: number){

    this.flag = true;

    if (this.suspender_botones) {
      return;
    }
    this.suspender_botones = true;

    if(this.posibles_respuestas[i] == this.pregunta.respuesta) {
      this.preguntas_correctas++;

      this.renderer.setStyle(this.btn_correspondiente[i].nativeElement, 'background', 'lightgreen');
    }
    else{
      this.renderer.setStyle(this.btn_correspondiente[i].nativeElement, 'background', 'pink');
    }
    for (let j = 0; j < 4; j++) {
      if (this.posibles_respuestas[j] == this.pregunta.respuesta) {
        this.renderer.setStyle(this.btn_correspondiente[j].nativeElement, 'background', 'lightgreen');
        break;
      }
    }
    setTimeout(() => {
      this.loaderService.setCargando(true);
    }, 2000);

    setTimeout(() => {
      this.reiniciar();
      this.suspender_botones = false;
      this.loaderService.setCargando(false);
    }, 4000);
  }


  reiniciar() {

    this.renderer.setStyle(this.btn1.nativeElement, 'background', 'snow');
    this.renderer.setStyle(this.btn2.nativeElement, 'background', 'snow');
    this.renderer.setStyle(this.btn3.nativeElement, 'background', 'snow');
    this.renderer.setStyle(this.btn4.nativeElement, 'background', 'snow');

    this.escogerPreguntaAleatoria();
  }

  guardarInformacion(): void {
    if (this.rondas > 0) {
      this.loaderService.setCargando(true);
      this.preguntadosService
        .setPuntuacion(this.rondas, this.aciertos)
        .then(() => {
          this.toastService.info('Se guardo la puntuación', 'INFO');
          this.loaderService.setCargando(false);
          this.router.navigateByUrl('/home/juegos/');
        })
        .catch((error: Error) => {
          this.toastService.error(error.message, 'ERROR');
        })
        .finally(() => {
          this.loaderService.setCargando(false);
        });
    }
    else {
      if(!this.flag) {
        this.toastService.info('Jugar al menos una vez', 'INFO');
      }
    }
  }

  ngOnDestroy() {
    // add this for performance reason
    this.clickedElement.unsubscribe();
  }

}
