import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RegistroIngresoService } from 'src/app/services/registro-ingreso.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  constructor(private auth: AuthService,
              private toast: ToastrService,
              private router: Router,
              private registroIngreso: RegistroIngresoService,
              private loaderServicio: LoaderService) { }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        correo: new FormControl('', {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur',
        }),
        clave: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
          updateOn: 'blur',
        }),
        repiteClave: new FormControl('', {
          validators: [Validators.required, Validators.required],
          updateOn: 'blur',
        }),
      },
      [this.confirmarClaveValidator(), Validators.required]
    );
  }

  enviarForm(): void {
    this.loaderServicio.setCargando(true);
    this.auth
      .crearUsuario(this.correo?.value, this.clave?.value)
      .then(() => {
        this.registroIngreso.setIngreso(this.correo?.value)
        this.router.navigateByUrl('/home');
        this.toast.success('Se creo la cuenta', 'Exito');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/network-request-failed':
            this.toast.warning('No tiene conexión a internet', 'Advertencia');
            break;
          case 'auth/email-already-in-use':
            this.toast.error(
              'El correo electrónico ya se encuentra registrado',
              'Error'
            );
            break;
          default:
            this.toast.error('No se logró crear la cuenta', 'Error');
            break;
        }
      })
      .finally(() => {
        this.form.reset();
        this.loaderServicio.setCargando(false);
      });
  }

  get correo() {
    return this.form.get('correo');
  }

  get clave() {
    return this.form.get('clave');
  }

  get repiteClave() {
    return this.form.get('repiteClave');
  }

  tieneValores() {
    return this.correo?.value || this.clave?.value || this.repiteClave?.value;
  }

  private confirmarClaveValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const clave = formGroup.get('clave');
      const repiteClave = formGroup.get('repiteClave');
      const respuestaError = { noCoincide: 'La clave no coincide' };

      if (clave?.value !== repiteClave?.value) {
        repiteClave?.setErrors(respuestaError);
        return respuestaError;
      }
      repiteClave?.setErrors(null);
      return null;
    };
  }

}
