import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { EdicaoComponent } from './pages/edicao/edicao.component';
import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'cadastro', component: CadastroComponent},
  {path:'edicao/:id', component: EdicaoComponent}
];
