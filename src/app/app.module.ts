import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ContactoComponent } from './contacto/contacto.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { MapaDelSitioComponent } from './mapa-del-sitio/mapa-del-sitio.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { Pipe, PipeTransform }from '@angular/core';
import { GoogleMapComponent } from './planea-tu-viaje/google-map/google-map.component';
//import { DecoratorFactory } from '@Pipe/@Directive/@Component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'contacto', component: ContactoComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'nosotros', component: NosotrosComponent},
  { path: 'noticias', component: NoticiasComponent},
  { path: 'mapa-del-sitio', component: MapaDelSitioComponent},
  { path: 'google-map', component: GoogleMapComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ContactoComponent,
    InicioComponent,
    RegistroComponent,
    NosotrosComponent,
    NoticiasComponent,
    MapaDelSitioComponent,
    DashboardComponent,
    GoogleMapComponent,
    //Injectable,
    // AppRoutingModule,
    //Pipe, 
    //PipeTranform
  ],
  
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAjoxbkhBjYnN9gkW3BsPjTkvJ3kQsp-oY'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
//export class EstacionesService { }

