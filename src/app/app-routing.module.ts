import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { DivisasComponent } from './components/divisas/divisas.component';
import { ZodiacoComponent } from './components/zodiaco/zodiaco.component';
import { CovidComponent } from './components/covid/covid.component';
import { HomeComponent } from './components/home/home.component';
import { TraductorComponent } from './components/traductor/traductor.component';

const routes: Routes = [
  { path: 'noticias', component: NoticiasComponent },
  { path: 'divisas', component: DivisasComponent },
  { path: 'zodiaco', component: ZodiacoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'estadisticas', component: CovidComponent },
  { path: 'traductor', component: TraductorComponent },
  { path: '**', pathMatch:'full',redirectTo:'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
