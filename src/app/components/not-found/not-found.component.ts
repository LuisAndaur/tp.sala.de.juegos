import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  usuarioLogeado!: boolean;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {

    let log = this.auth.usuarioLogeado();
    if(log != null){
      this.usuarioLogeado = true;
    }
  }

  volver(){
    if(this.usuarioLogeado){
      this.router.navigateByUrl('/home');
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }

}
