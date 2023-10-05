import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MayorMenorComponent } from './components/mayor-menor.component';

const routes: Routes = [
  { path: '', component: MayorMenorComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MayorMenorRoutingModule { }
