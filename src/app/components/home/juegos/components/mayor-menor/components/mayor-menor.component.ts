import { Component, OnInit } from '@angular/core';
import { MayorMenorService } from '../../../services/mayor-menor-service.service';
import { ICarta } from '../../../interfaces/icarta';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../../../../services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.scss']
})
export class MayorMenorComponent implements OnInit {

  private cartas: Array<ICarta> = [];
  cartaParaAdivinar!: ICarta;
  cartaActual!: ICarta;
  cartaReversa: string = '../../../../../../../assets/juegos/cartas/reverso.png';
  rondas: number = 0;
  aciertos: number = 0;
  salteadas: number = 0;
  mostrar:Boolean = false;

  constructor(
    private cartasServicio: MayorMenorService,
    private toastServicio: ToastrService,
    private loaderServicio: LoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loaderServicio.setCargando(true);
    this.cartasServicio.getCartas().subscribe((cartas) => {
      this.cartas = cartas;
      this.empezar();
      this.loaderServicio.setCargando(false);
    });
  }

  adivinar(queES: 'mayor' | 'menor'): void {
    this.mostrar = true;
    this.rondas++;
    if (queES == 'mayor') {
      if (this.cartaActual.numero < this.cartaParaAdivinar.numero) {
        this.toastServicio.success(`Sumaste 1 punto`, 'GENIAL!');
        this.aciertos++;
      } else {
        this.toastServicio.error(`Era MENOR!`, 'ERROR');
      }
    } else {
      if (this.cartaActual.numero > this.cartaParaAdivinar.numero) {
        this.toastServicio.success(`Sumaste 1 punto`, 'GENIAL!');
        this.aciertos++;
      } else {
        this.toastServicio.error(`Era MAYOR`, 'ERROR');
      }
    }
    // this.empezar();
  }

  guardarPuntuacion(): void {
    console.log("ENTRE A GUARDAR");
    if (this.rondas > 0) {
      this.loaderServicio.setCargando(true);
      this.cartasServicio
        .setPuntuacion(this.rondas, this.aciertos, this.salteadas)
        .then(() => {
          console.log("GUARDADO");
          this.toastServicio.info('Se guardo la puntuación', 'INFO');
          this.router.navigateByUrl('/home/juegos/');
        })
        .catch((error: Error) => {
          this.toastServicio.error(error.message, 'ERROR');
        })
        .finally(() => {
          this.loaderServicio.setCargando(false);
        });
    } else {
      this.toastServicio.info('Tienes que jugar al menos una vez','INFO');
    }
  }

  saltear(): void {
    this.salteadas++;
    this.empezar();
  }

  empezar(): void {
    this.mostrar = false;

    this.cartaParaAdivinar = this.cartaRandom();
    do {
      this.cartaActual = this.cartaRandom();
      console.log('ciclos gastados');
    } while (this.cartaParaAdivinar.numero == this.cartaActual.numero);
  }

  private numeroRandom(): number {
    return Math.floor(Math.random() * this.cartas.length);
  }

  private cartaRandom(): ICarta {
    return this.cartas[this.numeroRandom()];
  }

}
