import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuienSoyComponent } from './quien-soy.component';

const routes: Routes = [
  { path: '', component: QuienSoyComponent },
  { path: '**', component: QuienSoyComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class QuienSoyRoutingModule { }
