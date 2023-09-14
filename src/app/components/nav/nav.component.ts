import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RegistroIngresoService } from 'src/app/services/registro-ingreso.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  usuarioLogeado!: boolean;
  correoLogeado!: string;

  constructor(private auth: AuthService,
              private toastr: ToastrService,
              private router: Router,
              private loaderServicio: LoaderService,
              private registroIngreso: RegistroIngresoService) { }

  ngOnInit(): void {
    if (this.registroIngreso.correoLogeado) {
      this.usuarioLogeado = true;
      this.correoLogeado = this.registroIngreso.correoLogeado;
      console.log(this.correoLogeado,"if")
    }
    this.auth.usuarioLogeado().subscribe((usuario) => {
      this.usuarioLogeado = !!usuario;
      this.correoLogeado = usuario?.email;

      console.log(this.correoLogeado,"auth")
    });
  }

  cerrarSesion(): void {
    this.loaderServicio.setCargando(true);
    setTimeout(() => {
      this.auth
        .logout()
        .then(() => {
          this.toastr.success('Se cerró la sesión', 'Hasta pronto');
          this.router.navigateByUrl('/login');
        })
        .catch((e) => {
          this.toastr.error(e.message, 'Ocurrio un error');
        })
        .finally(() => {
          this.loaderServicio.setCargando(false);
        });
    }, 750);
  }

}
