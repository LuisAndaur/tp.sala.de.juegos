import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos.component';
import { HomeJuegosComponent } from './components/home-juegos/home-juegos.component';

const routes: Routes = [
  { path: '', component: JuegosComponent,
    children: [
      { path: '', component: HomeJuegosComponent},
      { path: 'ahorcado', loadChildren: () => import('./components/ahorcado/ahorcado.module').then( (m) => m.AhorcadoModule ) },
      { path: 'mayorMenor', loadChildren: () => import('./components/mayor-menor/mayor-menor.module').then( (m) => m.MayorMenorModule ) },
      { path: 'preguntados', loadChildren: () => import('./components/preguntados/preguntados.module').then( (m) => m.PreguntadosModule ) },
      { path: 'caza-slime', loadChildren: () => import('./components/caza-slime/caza-slime.module').then( (m) => m.CazaSlimeModule ) },
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
