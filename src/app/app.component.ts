import { ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tp.sala.de.juegos';
  cargando: boolean = false;

  constructor(
    private loaderService: LoaderService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loaderService.getCargando().subscribe((estado) => {
      this.cargando = estado;
      this.cd.detectChanges();
    });
  }
}
