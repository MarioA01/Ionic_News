import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoticiasLectorComponent } from './componentes/noticias-lector/noticias-lector.component';
import { LoginComponent } from './componentes/login/login.component';
import { MisNoticiasComponent } from './mis-noticias/mis-noticias.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'  },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'noticiaslector', component: NoticiasLectorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'misnoticias', component: MisNoticiasComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules },)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
