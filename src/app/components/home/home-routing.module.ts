import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'quien-soy', loadChildren: () => import('./quien-soy/quien-soy.module').then( (m) => m.QuienSoyModule ) },
      { path: 'juegos', loadChildren: () => import('./juegos/juegos.module').then( (m) => m.JuegosModule ) },
      { path: '**', component: InicioComponent }
  ]}

];

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeRoutingModule { }
