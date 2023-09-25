import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuienSoyRoutingModule } from './quien-soy-routing.module';
import { QuienSoyComponent } from './quien-soy.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    QuienSoyComponent
  ],
  imports: [
    CommonModule,
    QuienSoyRoutingModule,
    SharedModule
  ],
  exports: [ QuienSoyComponent ]
})
export class QuienSoyModule { }
