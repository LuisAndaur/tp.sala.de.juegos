import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MayorMenorRoutingModule } from './mayor-menor-routing.module';
import { MayorMenorComponent } from './components/mayor-menor.component';



@NgModule({
  declarations: [
    MayorMenorComponent
  ],
  imports: [
    CommonModule,
    MayorMenorRoutingModule
  ],
  exports: [ MayorMenorComponent ]
})
export class MayorMenorModule { }
