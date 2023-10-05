import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorcadoRoutingModule } from './ahorcado-routing.module';
import { AhorcadoComponent } from './components/ahorcado.component';



@NgModule({
  declarations: [
    AhorcadoComponent
  ],
  imports: [
    CommonModule,
    AhorcadoRoutingModule
  ],
  exports: [ AhorcadoComponent ]
})
export class AhorcadoModule { }
