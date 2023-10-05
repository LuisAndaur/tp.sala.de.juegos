import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './components/ahorcado.component';

const routes: Routes = [
  { path: '', component: AhorcadoComponent },
];

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]

})
export class AhorcadoRoutingModule { }
