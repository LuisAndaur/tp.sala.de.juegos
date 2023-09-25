import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PreguntadosComponent } from './components/preguntados.component';

const routes: Routes = [
  { path: '', component: PreguntadosComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PreguntadosRoutingModule { }
