import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'app-caza-slime',
  templateUrl: './caza-slime.component.html',
  styleUrls: ['./caza-slime.component.scss']
})
export class CazaSlimeComponent implements OnInit {

  display: Array<string> = [];
  interval: any;
  perdio: boolean = false;
  tiempoMS: number = 1000;
  puntos: number = 0;
  private email:any;
  public highscore = '';

  constructor(private router:Router) {

  }


  ngOnInit(): void {
    this.display = new Array<string>(16);
    this.display.fill('hidden',0,16);
    this.interval = setInterval(()=>this.juego(), this.tiempoMS);
  }

  juego()
  {
    this.display.map(val=>
      {
        if(val == 'visible')
        {
          this.perdio = true;
          console.log("perdiste");
          return;
        }
      })

    if(this.perdio)
    {
      clearInterval(this.interval);
      // if(this.puntos > JSON.parse(this.highscore))
      // {
      //   this.firestorage.ModificarHighScore(<string>this.email, this.puntos, 'testvelocidad');
      // }
    }
    else
    {
      let botonRandom = Math.floor(Math.random() * this.display.length);
      this.display[botonRandom] = 'visible';
      clearInterval(this.interval);
      this.interval = setInterval(()=>this.juego(), this.tiempoMS);
    }

  }

  clickBoton(idBoton:number)
  {
    this.puntos++;
    this.display[idBoton] = 'hidden';
    this.tiempoMS = this.tiempoMS - 50;
    timeInterval()
  }

  recargarJuego()
  {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => { this.router.navigate(['/home/juegos/caza-slime']); });
  }

}
