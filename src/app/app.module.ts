import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';

import { FormsModule } from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import { DivisasComponent } from './components/divisas/divisas.component';
import { ZodiacoComponent } from './components/zodiaco/zodiaco.component';
import { CovidComponent } from './components/covid/covid.component';
import { HomeComponent } from './components/home/home.component';

import { FilterPipe } from './pipes/filter-pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { TraductorComponent } from './components/traductor/traductor.component';


@NgModule({
  declarations: [
    AppComponent,
    NoticiasComponent,
    HeaderComponent,
    FooterComponent,
    DivisasComponent,
    ZodiacoComponent,
    CovidComponent,
    HomeComponent,
    FilterPipe,
    TraductorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
