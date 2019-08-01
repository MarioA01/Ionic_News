import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { NoticiasLectorComponent } from './componentes/noticias-lector/noticias-lector.component';
import { DetailsNoticiasComponent } from './componentes/details-noticias/details-noticias.component';
import { FormularioNoticiaComponent } from './formulario-noticia/formulario-noticia.component';
import { MisNoticiasComponent } from './mis-noticias/mis-noticias.component';

@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent, 
    RegisterComponent, 
    NoticiasLectorComponent, 
    DetailsNoticiasComponent,
    FormularioNoticiaComponent,
    MisNoticiasComponent
  ],
  entryComponents: [
    LoginComponent, 
    RegisterComponent, 
    NoticiasLectorComponent,
    DetailsNoticiasComponent,
    FormularioNoticiaComponent,
    MisNoticiasComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule, AppRoutingModule, FormsModule,
    ReactiveFormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
