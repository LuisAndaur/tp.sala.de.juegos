import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CazaSlimeRoutingModule } from './caza-slime-routing.module';
import { CazaSlimeComponent } from './components/caza-slime.component';



@NgModule({
  declarations: [
    CazaSlimeComponent
  ],
  imports: [
    CommonModule,
    CazaSlimeRoutingModule
  ],
  exports: [ CazaSlimeComponent ]
})
export class CazaSlimeModule { }
