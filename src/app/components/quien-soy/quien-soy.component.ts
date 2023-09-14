import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.scss']
})
export class QuienSoyComponent implements OnInit {

  correoLogeado!: string;
  user!: string;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.usuarioLogeado().subscribe((usuario) => {
      this.correoLogeado = usuario?.email;

      let arr = this.correoLogeado.split('@');
      this.user = arr[0].toUpperCase();

      console.log(this.correoLogeado,"auth")
    });
  }

}
