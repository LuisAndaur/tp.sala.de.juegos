import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreguntadosComponent } from './components/preguntados.component';
import { PreguntadosRoutingModule } from './preguntados-routing.module';



@NgModule({
  declarations: [
    PreguntadosComponent
  ],
  imports: [
    CommonModule,
    PreguntadosRoutingModule
  ],
  exports: [ PreguntadosComponent ]
})
export class PreguntadosModule { }
