import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioIngreso } from 'src/app/models/usuario-ingreso.models';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RegistroIngresoService } from 'src/app/services/registro-ingreso.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(public auth: AuthService,
              private toast: ToastrService,
              private router: Router,
              private registroIngreso: RegistroIngresoService,
              private loaderService: LoaderService ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      correo: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur',
      }),
      clave: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        updateOn: 'blur',
      }),
    });
  }

  enviarForm(): void {
    // this.loaderServicio.setCargando(true);
    this.auth
      .login(this.correo?.value, this.clave?.value)
      .then(() => {
        const usuarioIngreso = new UsuarioIngreso();
        usuarioIngreso.correo = this.correo?.value;
        usuarioIngreso.fecha = new Date();

        this.registroIngreso
          .setIngreso(usuarioIngreso)
          .then(() => {
            this.toast.success('Se guardo la fecha del ingreso', 'Exito');
          })
          .catch((error: Error) => {
            debugger;
            this.toast.warning(
              'No se pudo guardar la fecha del ingreso',
              'Información'
            );
          });
        this.toast.success('Acceso concedido', 'Bienvenido');
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/network-request-failed':
            this.toast.warning('No tiene conexión a internet', 'Advertencia');
            break;
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            this.toast.error(
              'Correo electrónico y/o contraseña incorrecta',
              'Error'
            );
            break;
          default:
            this.toast.error('Error desconocido', 'Error');
            break;
        }
      })
      .finally(() => {
        this.form.reset();
        // this.loaderService.setCargando(false);
      });
  }
  get correo() {
    return this.form.get('correo');
  }

  get clave() {
    return this.form.get('clave');
  }

  completarDatos() {
    this.form.controls['correo'].setValue('landaur@gmail.com');
    this.form.controls['clave'].setValue('123456');
  }
}
