import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo:'/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', loadChildren: () => import('./components/register/register.module').then( (m) => m.RegisterModule )  },
  { path: 'home', loadChildren: () => import('./components/home/home.module').then( (m) => m.HomeModule )  },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo:'notfound', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
