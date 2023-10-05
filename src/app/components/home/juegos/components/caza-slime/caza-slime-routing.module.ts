import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CazaSlimeComponent } from './components/caza-slime.component';

const routes: Routes = [
  { path: '', component: CazaSlimeComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CazaSlimeRoutingModule { }
