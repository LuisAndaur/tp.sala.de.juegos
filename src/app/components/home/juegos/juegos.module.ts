import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegosComponent } from './juegos.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeJuegosComponent } from './components/home-juegos/home-juegos.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    JuegosComponent,
    HomeJuegosComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    SharedModule,
    RouterModule
  ],
  exports: [ JuegosComponent ]
})
export class JuegosModule { }
