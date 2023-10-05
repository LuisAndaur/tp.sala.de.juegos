import { Component, OnInit } from '@angular/core';
import { IAhorcado } from '../../../interfaces/iahorcado'
import { AhorcadoService } from '../../../services/ahorcado.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader.service';

const MAXIMO = 6;

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit {

  private palabrasAhorcado: Array<IAhorcado> = [];
  private palabraQueSeEscribeTodo: Array<string> = [];
  private palabraQueSeEscribeCorrectamente: Array<string> = [];
  palabraActual!: IAhorcado;
  abecedario: Array<string> = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'ñ',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  imagenes: Array<string> = [];
  ayuda: boolean = false;
  intentos: number = 0;
  aciertos: number = 0;
  reseteos: number = 0;
  ayudas: number = 0;
  errores: number = 0;
  perdiste: boolean = false;
  intentosRestante: number = MAXIMO;

  constructor(
    private ahorcadoServicio: AhorcadoService,
    private toastServicio: ToastrService,
    private loaderServicio: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderServicio.setCargando(true);
    this.ahorcadoServicio.getPalabrasParaAdivinar().subscribe((palabras) => {
      this.palabrasAhorcado = palabras;
      this.empezar();
      this.loaderServicio.setCargando(false);
    });
    this.ahorcadoServicio.getImagenes().subscribe((imagenes) => {
      this.imagenes = imagenes;
    });
  }

  ngOnDestroy(): void {
    this.guardarPuntuacion();
  }

  elegir(letra: string) {
    if (!this.estaElegida(letra)) {
      this.palabraQueSeEscribeTodo.push(letra);
      if (this.estaContenida(letra)) {
        this.palabraQueSeEscribeCorrectamente.push(letra);

        if (this.verificarSiAcerto()) {
          this.aciertos++;
          this.intentos++;
          this.toastServicio.success(
            `Adivinaste, era ${this.palabraActual.palabra}`,
            'Ganaste'
          );
          this.empezar();
        } else {
        }
      } else {
        this.errores++;
        this.intentosRestante--;
        if (this.errores == MAXIMO) {
          this.perdiste = true;
          this.intentos++;
          this.toastServicio.error(
            `La palabra era ${this.palabraActual.palabra}`,
            'Perdiste'
          );
          // this.empezar();
        }
      }
    }
  }

  verificarSiAcerto(): boolean {
    //? convierto en array
    let palabraActual = this.palabraActual.palabra.split('');
    //? saco duplicados
    palabraActual = [...new Set(palabraActual)];
    //? ordeno , convierto en string y saco las comas
    const actual = palabraActual.sort().join('').replaceAll(',', '');
    return this.palabraQueSeEscribeCorrectamente
      .sort()
      .join('')
      .replaceAll(',', '')
      .includes(actual);
  }

  estaElegida(letra: string): boolean {
    return this.palabraQueSeEscribeTodo.some((_letra) => letra == _letra);
  }

  esCorrecta(letra: string): boolean {
    return this.estaElegida(letra);
  }

  estaContenida(letra: string): boolean {
    return this.palabraActual.palabra
      .split('')
      .some((_letra) => letra == _letra);
  }

  mostrarAyuda(): void {
    if (this.ayuda == false) {
      this.ayudas++;
    }
    this.toastServicio.info(this.palabraActual.pista, 'Ayuda');
    this.ayuda = true;
  }

  resetear(): void {
    this.reseteos++;
    this.empezar();
  }

  guardarPuntuacion(bandera?: boolean): void {
    if (this.intentos > 0) {
      this.loaderServicio.setCargando(true);
      this.ahorcadoServicio
        .setPuntuacion(this.intentos, this.aciertos, this.reseteos, this.ayudas)
        .then(() => {
          this.toastServicio.info('Se guardo la puntuación', 'Información');
        })
        .catch((error: Error) => {
          this.toastServicio.error(error.message, 'Error');
        })
        .finally(() => {
          this.loaderServicio.setCargando(false);
        });
    } else {
      if (bandera) {
        this.toastServicio.info(
          'Tienes que jugar al menos una vez',
          'Información'
        );
      }
    }
  }

  private empezar(): void {
    this.perdiste = false;
    this.palabraQueSeEscribeCorrectamente = [];
    this.palabraQueSeEscribeTodo = [];
    this.errores = 0;
    this.intentosRestante = MAXIMO;
    this.ayuda = false;
    this.palabraActual = this.palabraRandom();
  }

  private numeroRandom(): number {
    return Math.floor(Math.random() * this.palabrasAhorcado.length);
  }

  private palabraRandom(): IAhorcado {
    return this.palabrasAhorcado[this.numeroRandom()];
  }

}
