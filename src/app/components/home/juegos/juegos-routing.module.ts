import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos.component';
import { HomeJuegosComponent } from './home-juegos/home-juegos.component';

const routes: Routes = [
  { path: '', component: JuegosComponent,
    children: [
      { path: '', component: HomeJuegosComponent},
      { path: 'ahorcado', loadChildren: () => import('./ahorcado/ahorcado.module').then( (m) => m.AhorcadoModule ) },
      { path: 'mayorMenor', loadChildren: () => import('./mayor-menor/mayor-menor.module').then( (m) => m.MayorMenorModule ) },
      { path: 'preguntados', loadChildren: () => import('./preguntados/preguntados.module').then( (m) => m.PreguntadosModule ) },
      { path: '**', component: HomeJuegosComponent},
    ] },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
