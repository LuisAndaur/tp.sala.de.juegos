import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { LoaderService } from '../../services/loader.service';
import { RegistroIngresoService } from '../../services/registro-ingreso.service';

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
    this.loaderService.setCargando(true);
    this.auth
      .login(this.correo?.value, this.clave?.value)
      .then(() => {

        this.registroIngreso.setIngreso(this.correo?.value)
          .then(() => {
            this.toast.success('Ingreso registrado', 'Exito');
          })
          .catch((error: Error) => {
            debugger;
            this.toast.warning(
              'No se registro el ingreso',
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
        this.loaderService.setCargando(false);
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
